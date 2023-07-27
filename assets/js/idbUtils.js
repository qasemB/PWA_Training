var dbPromise = idb.openDB("postDataDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("postDataStore")) {
        db.createObjectStore("postDataStore", { keyPath: "id" });
      }
    },
  });
  
  const createData = (st, data) => {
    return dbPromise.then((db) => {
      const tx = db.transaction(st, "readwrite");
      const store = tx.objectStore(st);
      store.put(data);
      return tx.complete;
    });
  };
  
  const readAllData = (st) => {
    return dbPromise.then((db) => {
      const tx = db.transaction(st, "readonly");
      const store = tx.objectStore(st);
      return store.getAll();
    });
  };
  
  const deleteAllData = (st) => {
    return dbPromise.then((db) => {
      const tx = db.transaction(st, "readwrite");
      const store = tx.objectStore(st);
       store.clear();
      return tx.complete;
    });
  };
  
  const deleteOneData = (st, id) => {
    return dbPromise.then((db) => {
      const tx = db.transaction(st, "readwrite");
      const store = tx.objectStore(st);
       store.delete(id);
      return tx.complete;
    });
  };