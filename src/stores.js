// src/stores.js
import { writable } from 'svelte/store';
import { onMount } from 'svelte'

export const count = writable(0);
export const listOfSubjects = writable(["hello"])