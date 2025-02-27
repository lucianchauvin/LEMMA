<script>
  import { onMount } from "svelte";

  let editorRef;
  let infoviewRef;

  onMount(async () => {
    const { LeanMonaco, LeanMonacoEditor } = await import("lean4monaco");

    const options = {
      websocket: { url: "ws://localhost:8080/" },
      htmlElement: editorRef,
      vscode: { "editor.wordWrap": true }
    };

    const leanMonaco = new LeanMonaco();
    const leanMonacoEditor = new LeanMonacoEditor();

    leanMonaco.setInfoviewElement(infoviewRef);

    await leanMonaco.start(options);
    await leanMonacoEditor.start(editorRef, "/project/test.lean", "#check Nat");
  });
</script>

<div bind:this={infoviewRef} style="height: 200px;"></div>
<div bind:this={editorRef} style="height: 500px;"></div>
