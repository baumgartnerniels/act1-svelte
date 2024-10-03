import { writable } from 'svelte/store';

function createSelectedStore() {
  const { subscribe, set, update } = writable(new Set());

  return {
    subscribe,
    
/*     addSelected: (item) => update((selected) => {
      selected.add(item);
      return new Set(selected);//return new set to trigger reactivity
    }),

    removeSelected: (item) => update((selected) => {
      selected.delete(item);
      return new Set(selected); 
    }), */

    toggleSelection: (item) => update((selected) => {
        if (selected.has(item)) {
          selected.delete(item); // Remove item if it's selected
        } else {
          selected.add(item); // Add item if it's not selected
        }
        return new Set(selected); // Return new set to trigger reactivity
      }),
    
    clearSelection: () => set(new Set())
  };
}

export const selectedStore = createSelectedStore();
