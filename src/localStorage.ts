export const loadState = (key: string) => {
    try {
      const serialState = sessionStorage.getItem(key);
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
};

export const saveState = (state: any, key: string) => {
    try {
      const serialState = JSON.stringify(state);
      sessionStorage.setItem(key, serialState);
    } catch(err) {
        console.log(err);
    }
};