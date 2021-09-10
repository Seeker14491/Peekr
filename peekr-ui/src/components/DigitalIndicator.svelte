<script lang="ts">
  export let text: string;
  export let state: boolean;

  $: visibility = state ? "visible" : "hidden";
</script>

<div class="grid">
  <div
    class="row-start-1 col-start-1 z-10 border-white border-4"
    style={`visibility:${visibility}`}
  />
  <div class="row-start-1 col-start-1 border-gray-600 border-2 text-center p-1">
    {text}
  </div>
</div>
