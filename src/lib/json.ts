const json = {
  /**
   * A wrapper for JSON.stringify that handles circular reference errors
   * @param obj A JSON object
   * @returns A stringified JSON object
   */
  stringify: (obj: any) => {
    let cache: any[] = []; // Cache array for store values
    const str = JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1 && !['knowledgeArea', 'subject'].includes(key)) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = []; // reset the cache
    return str;
  },
};

export default json;
