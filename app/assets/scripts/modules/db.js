class DB {
  constructor(storeName, dbName, model, view){
    this.db = "";
    this.storeName = storeName;
    this.dbName = dbName;
    this.model = model
    this.view = view;
  }

  createDbObject(name, model) {
    var obj = {};
    obj.name = name;
    obj.value = model[name];
    return obj;
  }

  init() {
    // this.isIndexDbsupported();
    this.saveButton = document.querySelector(".save");
    this.saveButton.addEventListener('click', () => this.updateDB());
    
    var that = this;
    var openRequest = indexedDB.open(this.dbName, 1);

    openRequest.onupgradeneeded = function (e) {
      that.createStore.call(that, e.target.result, that.storeName, that.model)
    };

    openRequest.onsuccess = function (e) {
      that.db = e.target.result;

      if (that.db.objectStoreNames.contains(that.storeName)) {
        that.getAll(that.view);
      } else {
        that.view.init();
      }
    };

    openRequest.onerror = function (e) {
      console.dir(e);
    };
  }

  createStore(database, storename, model) {
    var that = this;
    this.db = database;
      if (!this.db.objectStoreNames.contains(storename)) {
        var store = this.db.createObjectStore(storename, {keyPath: "name"});
        store.transaction.oncomplete = function (event) {
          var store = that.db
            .transaction(storename, "readwrite")
            .objectStore(storename);
          for (var key in model) {
            store.add(that.createDbObject(key, model))
          }
        };
      }
  }
  isIndexDbsupported() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such featur" +
          "e will not be available.");
    }
  }

  getAll() {
    var that = this;
    var transaction = that.db.transaction([that.storeName], 'readwrite');
    var objectStore = transaction.objectStore(that.storeName);
    if ('getAll' in objectStore) {
      objectStore.getAll().onsuccess = function (event) {
        that.updateModel(event, that.model);
        that.view.init();
      };
    }
  }
  updateModel(obj, model) {
    obj.target.result.forEach(element => {
      Object.keys(model).forEach((key) => {
        if (element.name == key) {
          model[key] = element.value;
        };
      });
    });
  }
  updateDB() {
    var that = this;
    var objectStore = that.db.transaction([this.storeName], "readwrite").objectStore(this.storeName);
    for (var key in that.model) {
      this.updateSingleDbItem(key, that.model, objectStore);
    }
  }

  updateSingleDbItem(key, model, objectStore) {
    var request = objectStore.get(key);
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

export default DB;