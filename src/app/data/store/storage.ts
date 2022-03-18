export const getThisState = (stateName: string) => {
  try {
    const serializedState = localStorage.getItem(stateName);

    if (
      serializedState == null ||
      Object.keys(JSON.parse(serializedState)).length === 0
    ) {
      return null;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const getItem = (itemName: any) => {
  const items = getThisState(itemName);

  return items;
};

export const saveItem = (key: string, data: any) => {
  const serializedState = JSON.stringify(data);
  localStorage.setItem(key, serializedState);
};

export const getItemByKey = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const deleteItemByKey = (key: string) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      localStorage.removeItem(key);
      return true;
    }, 1000);
  });
};

export const emptyLocalStorage = (reducerkeys: any[] | undefined) => {
  try {
    if (undefined != reducerkeys && reducerkeys.length > 0) {
      reducerkeys.forEach((key) => {
        localStorage.removeItem(key);
      });
    }
  } catch (err) {}
};

export const clearStorage = () => localStorage.clear();
