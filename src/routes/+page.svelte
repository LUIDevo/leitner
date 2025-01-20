<script lang="ts">
import Popup from '../lib/popup.svelte';
 import { getContext } from 'svelte';
    import { writable, type Writable } from 'svelte/store';

    // Get the context
  const listOfSubjects = getContext<Writable<string[]>>('listOfSubjects');
let isCreate = false; // State to control popup visibility
let lines: Array<string> = []; // Array to receive exported lines from the popup

const user = getContext('listOfSubjects');
console.log(user)
// Function to toggle the popup
const toggleCreate = () => {
  console.log(user)
  isCreate = !isCreate;
};

// Callback to update the lines array from the popup
const updateLines = (newLines: Array<string>) => {
  lines = newLines; // Update the parent component's lines array
  console.log("Updated lines:", lines);
};
</script>

<div class="page-container">
  <button onclick={toggleCreate}>Toggle Popup</button>
  {#if isCreate}
    <Popup isCreate={toggleCreate} onUpdateLines={updateLines} />
  {/if}
  <div class="main-page">
    <div class="main-header">Up next for you</div>
    <ul>
    {#each $listOfSubjects as subject}
        <li>{subject}</li>
    {/each}
  </ul>
    <div class="flex card-container">
      <a href="subjects">subjects</a> 
    </div>
  </div>
</div>

<style>
.page-container {
  position: relative;
  padding: 16px;
}
button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.main-header {
  font-size: 36px;
}
.flex {
  display: flex;
}
.card-container {
  gap: 10px;
}
</style>
