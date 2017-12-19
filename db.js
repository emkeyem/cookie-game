const dataBase = {
  db: "",
  store_name: "store",
  dbName: "cookie_clicker",

  createDbObject: function (name, model) {
    var obj = {};
    obj.name = name;
    obj.value = model[name];
    return obj;
  },

  init: function () {
    this.isIndexDbsupported();
    var that = this;
    var openRequest = indexedDB.open(this.dbName, 1);

    openRequest.onupgradeneeded = function (e) {
      var db = e.target.result;
      // console.log('running onupgradeneeded');
      if (!db.objectStoreNames.contains(that.store_name)) {
        var store = db.createObjectStore(that.store_name, {keyPath: "name"});
        store.transaction.oncomplete = function (event) {
          // Store values in the newly created objectStore.
          var store = db
            .transaction(that.store_name, "readwrite")
            .objectStore(that.store_name);
          for (var key in Model) {
            store.add(that.createDbObject(key, Model))
          }
        };
      }
    };

    openRequest.onsuccess = function (e) {
      db = e.target.result;

      if (db.objectStoreNames.contains(that.store_name)) {
        that.getAll();
      } else {
        View
          .init
          .call(View);
      }
    };

    openRequest.onerror = function (e) {
      console.dir(e);
    };
  },

  isIndexDbsupported: function () {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such featur" +
          "e will not be available.");
    }
  },
  getAll: function () {
    var that = this;
    var transaction = db.transaction([that.store_name], 'readwrite');
    var objectStore = transaction.objectStore(that.store_name);
    if ('getAll' in objectStore) {
      objectStore
        .getAll()
        .onsuccess = function (event) {
        Model.cookieCount = event.target.result[0].value;
        Model.upgrades = event.target.result[1].value;
        View
          .init
          .call(View);
      };
    }
  },
  updateDB: function () {
    var objectStore = db.transaction([this.store_name], "readwrite").objectStore(this.store_name);
    for (var key in Model) {
      this.update(key, Model, objectStore);
    }
  },
  update: function (key, model, objectStore) {
    var request = objectStore.get(key)
    
    request.onerror = function (event) {};
    request.onsuccess = function (event) {
      var data = event.target.result;
      data.value = model[key];
      var requestUpdate = objectStore.put(data);
      requestUpdate.onerror = function (event) {
        console.dir(e);
      };
    };
  }
}
