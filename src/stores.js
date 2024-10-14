import { readable, writable, derived } from "svelte/store";
import { dataStructureDim as dataStructDim} from "./dataStructureDim.js";

export let countries = ["ALB", "BIH", "KOS", "MNE", "MKD", "SRB"];
export let countryLabels = {"ALB": "Albania", "BIH": "Bosnia and Herzegovina", "KOS": "Kosovo", "MNE": "Montenegro", "MKD": "North Macedonia", "SRB": "Serbia"};
export let categories = ["dimensions", "subdimensions", "indicators", "levels"];

////////////////////////////
// WELCOME TO STATE HELL //
//////////////////////////

function createSelectedCountryStore() {
  const init = new Set(
    countries
  );
  const { subscribe, set, update } = writable(new Set(init));

  return {
    subscribe,

    toggleSelection: (item) =>
      update((selected) => {
        if (selected.has(item)) {
          // if the clicked is in the set
          if (selected.size == 6) {
            // when all are selected, the next clicked selects the one
            selected = new Set([item]);
          } else {
            // otherwise delete the one clicked
            selected.delete(item); // Remove item if it's selected
            if (selected.size == 0) {
              // if it was the last one, add all
              selected = new Set(init);
            }
          }
        } else {
          //if the clicked is not in the set
          selected.add(item); // Add item if it's not selected
        }
        return new Set(selected); // Return new set to trigger reactivity
      }),

    resetSelection: () => set(new Set(init)),
  };
}


function createSelectedNodeDimStore() {
  const { subscribe, set, update } = writable(dataStructDim);

  return {
    subscribe,

    toggleSelection: (node, toggleParent = true) =>
      update((selected) => {
        if (selected === node && toggleParent ) {
          return node.parent ? node.parent : node;
        } else {
          return node; // Return new set to trigger reactivity
        }
      }),
    clearSelection: () => set(dataStructDim),
  };
}

// Create a readable store for mouse position
export const mousePosition = readable({ x: 0, y: 0 }, function start(set) {
  // Function to update the mouse position
  const updateMousePosition = (event) => {
    set({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Attach the mousemove event listener
  window.addEventListener("mousemove", updateMousePosition);

  // Return a cleanup function to remove the event listener when no subscribers exist
  return function stop() {
    window.removeEventListener("mousemove", updateMousePosition);
  };
});


export const hoveredStore = writable("");
export const selectedCountryStore = createSelectedCountryStore();
export const selectedNodeDimStore = createSelectedNodeDimStore();


export const relatedNodesDimStore = derived(selectedNodeDimStore, ($selectedNodeDimStore) => {
  let family = [];
  family.push(...$selectedNodeDimStore.getRelatedNodes());
  return new Set(family);
});
