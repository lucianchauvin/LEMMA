<script>
  import { onMount } from "svelte";

  let editorRef;
  let infoviewRef;
  
  const project = "mathlib-demo";
  
  onMount(() => {
    const socketUrl = ((window.location.protocol === "https:") ? "wss://" : "ws://") +
      window.location.host + "/websocket/" + project;

    console.log(`[Lean4web] Socket url is ${socketUrl}`);

    import("lean4monaco").then(({ LeanMonaco, LeanMonacoEditor }) => {
      const options = {
        websocket: { url: socketUrl },
        htmlElement: editorRef,
        vscode: { "editor.wordWrap": true }
      };

      const leanMonaco = new LeanMonaco();
      const leanMonacoEditor = new LeanMonacoEditor();

      leanMonaco.setInfoviewElement(infoviewRef);

      leanMonaco.start(options).then(() => {
        leanMonacoEditor.start(editorRef, `/project/0.lean`, "");
      });
    });
  });
</script>

<div bind:this={infoviewRef} style="height: 200px;"></div>
<div bind:this={editorRef} style="height: 500px;"></div>
