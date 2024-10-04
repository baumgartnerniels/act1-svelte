import { writable } from "svelte/store";
import { dataStructure } from "./dataStructure.js";

function createSelectedStore() {
  const { subscribe, set, update } = writable(new Set());

  return {
    subscribe,

    toggleSelection: (item) =>
      update((selected) => {
        if (selected.has(item)) {
          selected.delete(item); // Remove item if it's selected
        } else {
          selected.add(item); // Add item if it's not selected
        }
        return new Set(selected); // Return new set to trigger reactivity
      }),

    clearSelection: () => set(new Set()),
  };
}

export const selectedStore = createSelectedStore();

export const hoveredStore = writable("");
