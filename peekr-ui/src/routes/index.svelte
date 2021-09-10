<script lang="ts">
  import { getTelemetry, Telemetry } from "$lib/telemetry";
  import { onMount } from "svelte";
  import DirectivesDisplay from "../components/DirectivesDisplay.svelte";

  let telemetry: Telemetry;

  onMount(() => {
    let frame;
    const loop = () => {
      frame = requestAnimationFrame(loop);

      getTelemetry().then((response) => {
        if (response != null) {
          telemetry = response;
        }
      });
    };

    requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  });
</script>

{#if telemetry != null}
  <div class="px-3 py-1">
    <DirectivesDisplay {telemetry} />
  </div>
{:else}
  <div class="w-max p-2">No data received yet</div>
{/if}
