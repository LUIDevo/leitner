<script lang="ts">
    import { count, listOfSubjects } from '../../stores.js';
    import { onMount } from 'svelte';
    // Writable store for subjects
    let subjectName = '';
    let isPopup = false;

    onMount(async() => {
         try {
            const response = await fetch('http://localhost:4004/returnSubjects');
            const data = await response.json();
            if (Array.isArray(data)) {
                const subjects = data.map((item) => item.subject);
                listOfSubjects.set(subjects);
            } 
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        }
    });    // Toggle popup visibility

    const popup = () => {
        isPopup = !isPopup;
    };

    // Add a new subject
    const print = async(name: string) => {
        if (name.trim()) {
            listOfSubjects.update((subjects) => {
                return [...subjects, name]; // Add the new subject
            });
            const response = await fetch(`http://localhost:4004/createNewSubject/${name}`)           
            if (!response.ok) {
                    throw new Error('Failed to fetch folder data');
            }
            subjectName = ''; // Clear input field
            popup(); // Close popup
        }
    }; 
</script>

<!-- Subjects Section -->
<div>Subjects</div>
<div class="button" on:click={popup}>Create a new subject</div>
<a href="/">Click me</a>

<!-- Popup Form -->
{#if isPopup}
<div class="new-subject-popup-container">
    <div class="new-subject-popup">
        <form on:submit|preventDefault={() => print(subjectName)}>
            <input bind:value={subjectName} placeholder="New Subject" />
            <button type="submit">Create new subject</button>
        </form>
    </div>
</div>
{/if}
<!-- Display List of Subjects -->
{#each $listOfSubjects as subject}
   <div class="subject-container">{subject}</div> 
{/each}

<style>
    .new-subject-popup-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100vw;
        height: 100vh;
        display: flex; 
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .new-subject-popup {
        background: white;
        padding: 20px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
    }
    .subject-container {
        padding: 20px 32px;
        border: 1px solid black;
        border-radius: 24px;
        display: flex;
        box-sizing: border-box;
    }
</style>
