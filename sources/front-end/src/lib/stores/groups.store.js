import {
  browser as inBrowser,
} from '$app/environment';
import {
  writable,
} from 'svelte/store';

const STORE = new Map();

function createGroupStore() {
  const {
    subscribe,
    update,
  } = writable(STORE);

  return {
    subscribe,
    populate: (groups) => update((currentState) => {
      for (const { id, createdTs, name } of groups) {
        currentState.set(id, {
          createdTs,
          name,
        });
      }

      return currentState;
    }),
    addGroup: () => update((currentState) => {
      const id = crypto.randomUUID();

      currentState.set(id, { id, createdTs: Date.now(), name: 'N/A' });

      return currentState;
    }),
    removeGroup: (groupId) => update((currentState) => {
      const isSuccess = currentState.delete(groupId);

      if (isSuccess === false) {
        console.log(`.removeGroup(${groupId}) -- inexistent groupId`)
      }

      return currentState;
    }),
    renameGroup: (groupId, newName) => update((currentState) => {
      if (currentState.has(groupId) === true) {
        const updatedGroupInfo = currentState.get(groupId);
        updatedGroupInfo.name = newName;

        currentState.set(groupId, updatedGroupInfo);
      }

      return currentState;
    }),
  }
}

export const GroupStore = createGroupStore();