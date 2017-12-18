
var db;
var store_name = "store";
var dbName = "cookie_clicker";

var createDbObject = function (name, model) {
  var obj = {};
  obj.name = name;
  obj.value = model[name];
  return obj;
};

var begin = function () {

  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such featur" +
        "e will not be available.");
  }

  var openRequest = indexedDB.open(dbName, 1);

  openRequest.onupgradeneeded = function (e) {
    var db = e.target.result;
    if (!db.objectStoreNames.contains(store_name)) {
      var store = db.createObjectStore(store_name, {keyPath: "name"});
      store.transaction.oncomplete = function (event) {
        // Store values in the newly created objectStore.
        var store = db
          .transaction(store_name, "readwrite")
          .objectStore(store_name);
        for (var key in Model) {
          store.add(createDbObject(key, Model))
        }
      };
    }
  };

  openRequest.onsuccess = function (e) {
    // console.log('running onsuccess');
    db = e.target.result;
    if (db.objectStoreNames.contains(store_name)) {
      getAll();
    } else {
      View
        .init
        .call(View);
    }
  };

  openRequest.onerror = function (e) {
    console.dir(e);
  };
}

function getAll() {
  var transaction = db.transaction([store_name], 'readwrite');
  var objectStore = transaction.objectStore(store_name);
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
}

function updateDB() {
  var objectStore = db.transaction([store_name], "readwrite").objectStore(store_name);

  for (var key in Model) {
    update(key, Model, objectStore);
  }

}

function update(key, model, objectStore) {
  var request = objectStore.get(key)

  request.onerror = function (event) {};
  request.onsuccess = function (event) {
    var data = event.target.result;
    data.value = model[key];
    var requestUpdate = objectStore.put(data);

    requestUpdate.onerror = function (event) {
      // Do something with the error
    };

  };
}

begin();
