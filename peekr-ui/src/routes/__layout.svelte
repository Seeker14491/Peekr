<script lang="ts">
  import "../app.postcss";
  import { onMount } from "svelte";
  import { appWindow } from "@tauri-apps/api/window";

  let resizeObserverElement;

  appWindow.setAlwaysOnTop(true);

  onMount(() => {
    const setUpAutoResize = async () => {
      const { appWindow, LogicalSize } = await import("@tauri-apps/api/window");
      const resizeObserver = new ResizeObserver((entries) => {
        const {
          inlineSize,
          blockSize,
        }: {
          inlineSize: number;
          blockSize: number;
        } = entries[0].borderBoxSize[0];
        appWindow.setSize(
          new LogicalSize(
            Math.max(Math.ceil(inlineSize), 200),
            Math.ceil(blockSize)
          )
        );
      });

      if (resizeObserverElement != null) {
        resizeObserver.observe(resizeObserverElement);
      } else {
        throw new Error("resize observer element not found");
      }
    };

    setUpAutoResize();
  });
</script>

<div class="flex h-screen items-center justify-center bg-gray-900 text-white">
  <div bind:this={resizeObserverElement}>
    <slot />
  </div>
</div>
