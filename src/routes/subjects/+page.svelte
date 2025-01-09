<script lang="ts">
    let listOfSubjects:string[]= $state([])
    let subjectName = $state('')
    let isPopup = $state(false)

    const print = (name: string) => {
        listOfSubjects.push(name)
        subjectName = ''
        popup()
    }
    const popup = () => {
        isPopup = !isPopup
    }
</script>

<div>Subjects</div>
<div class="button" onclick={popup}>Create a new subject</div>

{#if isPopup}
<div class="new-subject-popup-container">
    <div class="new-subject-popup">
        <form onsubmit={() => print(subjectName)}>
            <input bind:value={subjectName} placeholder="New Subject"/>
            <button type="submit">Create new subject</button>
        </form>
    </div>
</div>
{/if}

{#each listOfSubjects as subject}
   <div>{subject}</div> 
{/each}


<style>
    .new-subject-popup-container{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100vw;
        height: 100vh;
        display: flex; 
        align-items: center;
        justify-content: center;
    }
    .new-subject-popup {
        display: flex;
        flex-direction: column;
    }
</style>