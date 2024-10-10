import { readable, writable, derived } from "svelte/store";
import { dataStructure } from "./dataStructure.js";

////////////////////////////
// WELCOME TO STATE HELL //
//////////////////////////

function createCountryStore() {
  const init = new Set(
    dataStructure.children.filter((c) => c.key != "WB6_AVG")
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

export const countryStore = createCountryStore();

function createSelectedStore(otherStore) {
  const init = new Set(
    dataStructure.children.filter((c) => c.key != "WB6_AVG")
  );
  const { subscribe, set, update } = writable(new Set(init));
  let countries = new Set();

  // subscribe to changes in otherStore
  // when other country is selected, we update our own store
  let unsubOther = otherStore.subscribe((otherStore) => {
    countries = otherStore;
    update((selected) => {
      const old = new Set(selected);
      selected.clear();
      for (let country of countries) {
        for (let item of old) {
          if (item.parent == dataStructure) {
            // we need to add the country itself
            selected.add(country);
          } else {
            // look for element under the current country
            let newItem = country.findNodeByKey(item.key);
            if (newItem) selected.add(newItem);
          }
        }
      }
      return new Set(selected); // Return new set to trigger reactivity
    });
  });

  return {
    subscribe(run) {
      // Call the default subscribe behavior
      const unsubscribe = subscribe(run);

      // Return the unsubscribe function with custom logic
      return () => {
        unsubOther(); // Unsubscribe from our other store subscription
        unsubscribe(); // Ensure to call the original unsubscribe
      };
    },

    toggleSelection: (item, toggleParent = true) =>
      update((selected) => {
        if (selected.has(item) && toggleParent) {
          for (let c of countries) {
            const countryItem = c.findNodeByKey(item.key);
            selected.delete(countryItem); // Remove item if it's selected
            if (countryItem.parent) selected.add(countryItem.parent); //but add parent back in
          }
        } else {
          selected.clear();
          for (let c of countries) selected.add(c.findNodeByKey(item.key)); // Add item if it's not selected
        }
        return new Set(selected); // Return new set to trigger reactivity
      }),
    clearSelection: () => set(new Set()),
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

export const selectedStore = createSelectedStore(countryStore);

export const hoveredStore = writable("");

export const relatedStore = derived(selectedStore, ($selectedStore) => {
  let family = [];
  // @ts-ignore
  $selectedStore.forEach((el) => {
    family.push(...el.getRelatedNodes());
  });
  return new Set(family);
});
