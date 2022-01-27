<script lang="ts">
  export let x: number;
  export let y: number;

  const backdropSize = 80;
  const stickSize = 56;
  const stickMotionFactor = 0.25;

  const stickCenterOffset = (backdropSize - stickSize) / 2;

  $: stickOffsets = [
    stickCenterOffset + x * backdropSize * stickMotionFactor,
    stickCenterOffset + y * backdropSize * stickMotionFactor,
  ];
</script>

<div
  class="m-1 rounded-full bg-gray-700"
  style={`width:${backdropSize}px;height:${backdropSize}px`}
>
  <div
    class="relative rounded-full bg-gray-500 will-change-transform"
    style={`width:${stickSize}px;\
      height:${stickSize}px;\
      transform:translate(${stickOffsets[0]}px,${stickOffsets[1]}px)`}
  />
</div>
