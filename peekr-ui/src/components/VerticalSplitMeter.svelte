<script lang="ts">
  export let value: number;

  $: positivePart = Math.max(value, 0);
  $: negativePart = -Math.min(value, 0);
</script>

<div class="flex flex-col items-center">
  <div class="text-sm">Gas:</div>
  <div
    class="mb-0.5 h-[50%] w-3 rotate-180 rounded-b bg-gray-800 shadow-inner will-change-transform"
  >
    <div
      class="w-full rounded-b bg-green-500"
      style={`height:${positivePart * 100}%`}
    />
  </div>
  <div class="h-[50%] w-3 rounded-b bg-gray-800 shadow-inner">
    <div
      class="w-full rounded-b bg-yellow-500"
      style={`height:${negativePart * 100}%`}
    />
  </div>
</div>
