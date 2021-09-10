<script lang="ts">
  import type { Telemetry } from "$lib/telemetry";
  import ControlStick from "./ControlStick.svelte";
  import DigitalIndicator from "./DigitalIndicator.svelte";
  import HorizontalMeter from "./HorizontalMeter.svelte";
  import VerticalSplitMeter from "./VerticalSplitMeter.svelte";

  export let telemetry: Telemetry;
</script>

<div class="flex gap-2">
  <ControlStick
    x={telemetry.CarDirectives.steer}
    y={telemetry.WingsOpen ? -telemetry.CarDirectives.rotationX : 0}
  />
  <div class="flex flex-col">
    <div class="grid grid-cols-[1fr,1fr] gap-1">
      <DigitalIndicator text="Jump" state={telemetry.JumpTimer < 0.1} />
      <DigitalIndicator text="Boost" state={telemetry.CarDirectives.boost} />
      <DigitalIndicator text="Wings" state={telemetry.WingsOpen} />
      <DigitalIndicator text="Grip" state={telemetry.CarDirectives.grip} />
    </div>
    <HorizontalMeter label="Brake" value={telemetry.CarDirectives.brake} />
  </div>
  <VerticalSplitMeter value={telemetry.CarDirectives.gas} />
  <ControlStick
    x={telemetry.WingsOpen
      ? -telemetry.CarDirectives.rotationZ
      : telemetry.CarDirectives.rotationZ}
    y={telemetry.WingsOpen ? 0 : telemetry.CarDirectives.rotationX}
  />
</div>
