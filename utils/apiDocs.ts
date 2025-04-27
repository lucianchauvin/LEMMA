/*
* File to automatically pull api routes from the routes directory 
* and produce a json file of their docstrings
*/

import { promises as fs } from 'fs';
import path from 'path';

const ROUTES_DIR = path.resolve('src/routes');
const OUTPUT_FILE = path.resolve('docs/API.md');

async function walk(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const paths = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) return walk(fullPath);
      return fullPath;
    })
  );
  return paths.flat();
}

async function generateDocs() {
  const files = await walk(ROUTES_DIR);
  const docs: any[] = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');

    if (file.endsWith('+server.ts')) {
      const docMatch = content.match(/\/\*\*([\s\S]*?)\*\//);

      const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].filter((m) =>
        new RegExp(`export const ${m}:`).test(content)
      );

      const parseDoc = (docMatch) ? parseDocBlock(docMatch[1]) : {};

      docs.push({
        type: 'api',
        path: routePathFromFile(file),
        metho: methods[0],
        ...parseDoc
      });
    }

    if (file.endsWith('+page.server.ts')) {
      if (content.includes('export const actions')) {
        const actionRegex = /\/\*\*([\s\S]*?)\*\/\s*(\w+)\s*:/g;
        let match;
        while ((match = actionRegex.exec(content))) {
          const [, comment, actionName] = match;

          const parseDoc = (comment) ? parseDocBlock(comment) : {};

          docs.push({
            type: 'form-action',
            path: routePathFromFile(file),
            action: actionName,
            method: 'POST',
            ...parseDoc
          });
        }
      }
    }
  }
  const markdownContent = generateMarkdown(docs);

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, markdownContent, 'utf-8');
  console.log(`✅ API docs generated at ${OUTPUT_FILE}`);
}

function routePathFromFile(filePath: string): string {
  let route = path.relative(ROUTES_DIR, path.dirname(filePath));
  route = route.replace(/\(.*?\)\//g, '');
  route = route.replace(/\/\+page$/, '');
  route = route.replace(/\/\+server$/, '');
  if (route === '') route = '/';
  return '/' + route.replace(/\\/g, '/');
}

function parseDocBlock(doc: string) {
  const lines = doc
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())
    .filter(line => line.length > 0);

  const descriptionLines: string[] = [];
  const params: { name: string, description: string }[] = [];
  let returns: { description: string } | null = null;
  const throws: { description: string }[] = [];

  for (const line of lines) {
    if (line.startsWith('@param')) {
      const paramMatch = line.match(/@param\s+(\w+)[\s-]+(.*)/);
      if (paramMatch) {
        const [, name, desc] = paramMatch;
        params.push({ name, description: desc });
      }
    } else if (line.startsWith('@returns') || line.startsWith('@return')) {
      const returnMatch = line.match(/@(returns?|return)[\s-]+(.*)/);
      if (returnMatch) {
        const [, , desc] = returnMatch;
        returns = { description: desc };
      }
    } else if (line.startsWith('@throws')) {
      const throwsMatch = line.match(/@throws\s+(.*)/);
      if (throwsMatch) {
        const [, desc] = throwsMatch;
        throws.push({ description: desc });
      }
    } else {
      descriptionLines.push(line);
    }
  }

  return {
    description: descriptionLines.join('\n'),
    params,
    returns,
    throws
  };
}

function generateMarkdown(apiActions: any[]): string {
  let markdown = '# API Documentation\n\n';

  apiActions.forEach(action => {
    markdown += `## ${action.path}` + ((action.action) ? `/${action.action}\n\n`: `\n\n`);
    markdown += `**Type:** ${action.type}\n\n`;
    markdown += `**Method:** ${action.method}\n\n`;
    markdown += `**Description:**\n${action.description}\n\n`;

    if (action.params && action.params.length > 0) {
      markdown += '### Parameters\n';
      action.params.forEach(param => {
        markdown += `- **${param.name}**: ${param.description}\n`;
      });
      markdown += '\n';
    }

    if (action.returns) {
      markdown += '### Returns\n';
      markdown += `- ${action.returns.description}\n\n`;
    }

    if (action.throws && action.throws.length > 0) {
      markdown += '### Throws\n';
      action.throws.forEach(throwable => {
        markdown += `- ${throwable.description}\n`;
      });
      markdown += '\n';
    }
  });

  return markdown;
}

generateDocs().catch(console.error);
