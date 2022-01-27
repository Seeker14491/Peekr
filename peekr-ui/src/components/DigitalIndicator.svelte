<script lang="ts">
  export let text: string;
  export let state: boolean;

  $: visibility = state ? "visible" : "hidden";
</script>

<div class="grid">
  <div
    class="z-10 col-start-1 row-start-1 border-4 border-white"
    style={`visibility:${visibility}`}
  />
  <div class="col-start-1 row-start-1 border-2 border-gray-600 p-1 text-center">
    {text}
  </div>
</div>
