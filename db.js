/* window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such featur" +
            "e will not be available.");
}


var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function(event) {
  alert("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  db = event.target.result;

};
 */
var db;
var store_name = "store"

var begin = function () {
  var openRequest = indexedDB.open('cookie_clicker', 1);

  openRequest.onupgradeneeded = function (e) {
    var db = e.target.result;
    // console.log('running onupgradeneeded');
    if (!db.objectStoreNames.contains(store_name)) {
      var store = db.createObjectStore(store_name, {keyPath: "name"});
      store.transaction.oncomplete = function (event) {
        // Store values in the newly created objectStore.
        var store = db
          .transaction(store_name, "readwrite")
          .objectStore(store_name);
        for (var key in dbElements) {
          store.add({
            name: dbElements[key].name,
            value: model[dbElements[key].value]
          })
          console.log({
            name: dbElements[key].name,
            value: model[dbElements[key].value]
          });
        }
      };
    }
  };

  openRequest.onsuccess = function (e) {
    // console.log('running onsuccess');
    db = e.target.result;
    console.log(db);

    if (db.objectStoreNames.contains(store_name)) {
      // addAll();
      getAll();
    } else {
      upgradesListView
        .init
        .call(upgradesListView);
    }
  };

  openRequest.onerror = function (e) {
    console.dir(e);
  };
}

var dbElements = {
  cookies: {
    name: "cookies",
    value: "cookieCount"
  },
  upgrades: {
    name: "upgrades",
    value: "upgrades"
  }
};

var getDbItem = function (name, value) {
  var obj = {};
  obj[name] = name;
  obj[value] = value;
  return obj;
}

// function addItem(item) {   var transaction = db.transaction([store_name],
// 'readwrite');   var store = transaction.objectStore(store_name);   var item =
// item;   var request = store.add(item);   request.onerror = function (e) {
// console.log('Error', e.target.error.name);   };   request.onsuccess =
// function (e) {     console.log('Woot! Did it');   }; } function getItem(elem,
// elemHandler) {   var transaction = db.transaction([store_name],
// 'readwrite');   var store = transaction.objectStore(store_name);   var
// request = store.get(elem.name);   request.onsuccess = function (event) { var
// result = event.target.result;     elemHandler(result);   };
// transaction.oncomplete = function (event) {     upgradesListView.init();   };
// } function elemHandler(item) {   model[item.name] = item.value;
// console.log("model item ", model[item.name]); } function addAll() {
// addItem({name: "upgrades", value: model.upgrades});   addItem({name:
// "cookies", value: model.cookieCount}); } function getAll(fn) {
// getItem(dbElements.cookies, elemHandler); getItem(dbElements.upgrades,
// elemHandler); } function updateDB() {   var transaction =
// db.transaction([store_name], 'readwrite'); var store =
// transaction.objectStore(store_name);   var request =
// store.get(dbElements.cookies.name);   console.log("request" + request);
// store.onsuccess = function () {     console.log(data);     var data =
// request.result;   } }

function getAll() {
  var transaction = db.transaction([store_name], 'readwrite');
  var objectStore = transaction.objectStore(store_name);
  if ('getAll' in objectStore) {
    // IDBObjectStore.getAll() will return the full set of items in our store.
    objectStore
      .getAll()
      .onsuccess = function (event) {
      console.log("0 " + JSON.stringify(event.target.result[0].value) + "\n1 " + JSON.stringify(event.target.result[1].value));
      model.cookieCount = event.target.result[0].value;
          model.upgrades = event.target.result[1].value;
      upgradesListView
        .init
        .call(upgradesListView);
    };
  }
}

function updateDB() {
  var objectStore = db.transaction([store_name], "readwrite").objectStore(store_name);

  for (var key in dbElements) {
    update(key, dbElements, objectStore);
  }

}

function update(key, dbElements, objectStore) {
  console.log("key: " + key + " dbelem " + dbElements);
  var request = objectStore.get(dbElements[key].name)
  console.log(dbElements[key].value);

  request.onerror = function (event) {
    // Handle errors!
  };
  request.onsuccess = function (event) {
    // Get the old value that we want to update
    var data = event.target.result;
    console.log("data " + JSON.stringify(data) + "key " + key + " value " + model[key]);
    // update the value(s) in the object that you want to change
    data.value = model[dbElements[key].value];
    // console.log(data.value) Put this updated object back into the database.
    var requestUpdate = objectStore.put(data);
    requestUpdate.onerror = function (event) {
      // Do something with the error
    };
    requestUpdate.onsuccess = function (event) {
      // Success - the data is updated!
    };
  };
}

begin();
