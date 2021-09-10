<script lang="ts">
  export let label: string;
  export let value: number;
</script>

<div class="flex items-center p-1">
  <div class="text-sm">{label}:</div>
  <div class="w-full h-3 bg-gray-800 rounded shadow-inner ml-2">
    <div class="h-full bg-red-500 rounded" style={`width:${value * 100}%`} />
  </div>
</div>
