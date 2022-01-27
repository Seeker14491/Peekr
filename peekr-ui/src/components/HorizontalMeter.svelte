<script lang="ts">
  export let label: string;
  export let value: number;
</script>

<div class="flex items-center p-1">
  <div class="text-sm">{label}:</div>
  <div class="ml-2 h-3 w-full rounded bg-gray-800 shadow-inner">
    <div class="h-full rounded bg-red-500" style={`width:${value * 100}%`} />
  </div>
</div>
