<script lang="ts">
  import Popup from '$lib/popup.svelte'
  import Button from '$lib/button.svelte';
  let i = $state(false)
  $effect(() => console.log(i))
  let input = $state("")
</script>

<Button bind:isCreate={i} />
{#if i}
  <Popup bind:input={input} />
{/if}

<style>
body {
  height: 100vh;
}
</style>
