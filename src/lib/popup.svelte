<script lang="ts">
let { input = $bindable()} = $props();
$effect(() => console.log(input))

let answer = $state("")
function changeAnswer(line: string) {
    return (event: Event) => {
      const target = event.currentTarget as HTMLInputElement; // Assert type
      const inputValue = target.value; // Safely access value
      console.log(`Line: ${line}, Input Value: ${inputValue}`);
    };
  }

let isPrimary = $state(true);
let value = $state("joadsj")
const validate = () => {
  formatContent(text)
  console.log("validate function")
  console.log("form data", text)
  isPrimary = false;
}
let lines: Array<string>
lines = []
let text = $state("hello")
const isInLine = (testString: string, line: string): boolean => {
  const regex = new RegExp(`^${testString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s.*`); 
  return regex.test(line);
};

const formatContent = (text: string): string => {
  const updatedLines: Array<string> = text.split('\n').map((line) => {
    if (isInLine(">?", line)) {
      console.log("Matched line:", line);
      // Replace matched line and push the formatted line
      return line.replace(/^>\?\s(.*)/, '$1');
    } else {
      return ""; // Keep the line unchanged
    }
  });
  lines = updatedLines; // Update the `lines` array
  return text;
};
$effect(() => console.log(text))
</script>

<div class="popup-container">
  {#if isPrimary == true}
  <div class="popup">
    <p>Enter Topic</p>
    <p>Enter Note Here</p>
    <form onsubmit={validate}>
      <textarea bind:value={text}></textarea>
      <button type="submit">
          Submit
      </button>
    </form>
  </div>
  {:else}
  <div class="popup">
    <div class="flex col">
      {#each lines as line, num }
          <div class="card">
            <div>{line}</div>
            {#if line!=""}
            <input class="HDAIJS" oninput={changeAnswer(line)}>              
            {/if}
          </div>
      {/each}
    </div>
  </div>
  {/if}
  
  
</div>


<style>
.card {
  display: flex;
  width: 100%;
  gap: 16px;
}
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
  border-radius: 4;
  border: 1px solid lightgrey;
}
.flex {
  display: flex;
}
.col {
  flex-direction: column;
}
</style>
