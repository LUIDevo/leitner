<script lang="ts">
let { isCreate, onUpdateLines } = $props(); // Access props via $props()

let text = $state("hello"); // State for the text area
let lines: Array<string> = []; // Array to store formatted lines
let isPrimary = $state(true); // State to toggle between modes

// Function to validate and process the text input
const validate = () => {
  let formattedContent = formatContent(text);
  console.log("formatted Content", formattedContent)

  isPrimary = false;
  // Call the parent's callback function to export the lines array
  if (typeof onUpdateLines === 'function') {
    onUpdateLines(lines);
  }
};

// Function to format content into lines
const formatContent = (text: string): string[] => {
  lines = text
    .split('\n')
    .map(line => (line.startsWith(">") ? line.replace(/^>\?\s(.*)/, '$1') : ""))
    .filter(line => line.trim() !== "");
  return lines;
};

// Handler for individual line input changes
const changeAnswer = (line: string) => (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  console.log(`Line: ${line}, Input Value: ${target.value}`);
};
</script>

<div class="popup-container">
  {#if isPrimary}
    <div class="popup">
      <p>Enter Topic</p>
      <p>Enter Note Here</p>
      <form onsubmit={validate}>
        <textarea bind:value={text}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  {:else}
    <div class="popup">
      <div class="flex col">
        {#each lines as line, num}
          <div class="card">
            <div>{line}</div>
            {#if line !== ""}
              <input oninput={changeAnswer(line)} />
            {/if}
          </div>
        {/each}
        <div class="button" onclick={isCreate}>Close</div>
      </div>
    </div>
  {/if}
</div>

<style>
.popup-container {
  position: absolute;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.popup {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid lightgrey;
}
.flex {
  display: flex;
}
.col {
  flex-direction: column;
}
.card {
  display: flex;
  width: 100%;
  gap: 16px;
}
</style>
