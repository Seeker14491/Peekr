<script lang="ts">
  import { getTelemetry, Telemetry, defaultTelemetry } from "$lib/telemetry";
  import { onMount } from "svelte";
  import DirectivesDisplay from "../components/DirectivesDisplay.svelte";

  let telemetry = defaultTelemetry;

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

<div class="px-3 py-1">
  <DirectivesDisplay {telemetry} />
</div>
