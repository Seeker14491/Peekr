<script lang="ts">
  export let value: number;

  $: positivePart = Math.max(value, 0);
  $: negativePart = -Math.min(value, 0);
</script>

<div class="flex flex-col items-center">
  <div class="text-sm">Gas:</div>
  <div
    class="w-3 h-[50%] bg-gray-800 rounded-b shadow-inner rotate-180 mb-0.5 will-change-transform"
  >
    <div
      class="w-full bg-green-500 rounded-b"
      style={`height:${positivePart * 100}%`}
    />
  </div>
  <div class="w-3 h-[50%] bg-gray-800 rounded-b shadow-inner">
    <div
      class="w-full bg-yellow-500 rounded-b"
      style={`height:${negativePart * 100}%`}
    />
  </div>
</div>
