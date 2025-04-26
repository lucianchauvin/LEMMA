/*
* File to automatically pull api routes from the routes directory 
* and produce a json file of their docstrings
*/

import { promises as fs } from 'fs';
import path from 'path';

const ROUTES_DIR = path.resolve('src/routes');
const OUTPUT_FILE = path.resolve('static/api-docs.json');

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
        methods,
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

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(docs, null, 2), 'utf-8');
  console.log(`✅ API docs generated at ${OUTPUT_FILE}`);
}

function routePathFromFile(filePath: string): string {
  let route = path.relative(ROUTES_DIR, path.dirname(filePath));
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
  const params: { name: string, type: string, description: string }[] = [];
  let returns: { type: string, description: string } | null = null;
  const throws: { type: string, description: string }[] = [];

  for (const line of lines) {
    if (line.startsWith('@param')) {
      const paramMatch = line.match(/@param\s+\{(\w+)\}\s+(\w+)\s+(.*)/);
      if (paramMatch) {
        const [, type, name, desc] = paramMatch;
        params.push({ name, type, description: desc });
      }
    } else if (line.startsWith('@returns') || line.startsWith('@return')) {
      const returnMatch = line.match(/@(returns?|return)\s+\{(\w+)\}\s+(.*)/);
      if (returnMatch) {
        const [, , type, desc] = returnMatch;
        returns = { type, description: desc };
      }
    } else if (line.startsWith('@throws')) {
      const throwsMatch = line.match(/@throws\s+\{(\w+)\}\s+(.*)/);
      if (throwsMatch) {
        const [, type, desc] = throwsMatch;
        throws.push({ type, description: desc });
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

generateDocs().catch(console.error);
