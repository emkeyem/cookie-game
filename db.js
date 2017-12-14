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

var db;

var openRequest = indexedDB.open('cookie_clicker', 1);

openRequest.onupgradeneeded = function (e) {
  var db = e.target.result;
  console.log('running onupgradeneeded');
  if (!db.objectStoreNames.contains('store')) {
    var storeOS = db.createObjectStore('store', {
      keyPath: "name"
    });
  }
};

openRequest.onsuccess = function (e) {
  console.log('running onsuccess');
  db = e.target.result;
  console.log(db);

  if (db.objectStoreNames.contains('store')) {
    getItem(dbElements.cookies, elemHandler);
  }
  addAll();
};


openRequest.onerror = function (e) {
  console.dir(e);
};

function addItem(item) {
  var transaction = db.transaction(['store'], 'readwrite');
  var store = transaction.objectStore('store');
  var item = item;

  var request = store.add(item);

  request.onerror = function (e) {
    console.log('Error', e.target.error.name);
  };
  request.onsuccess = function (e) {
    console.log('Woot! Did it');
  };
}

function getItem(elem, elemHandler) {
  var transaction = db.transaction(['store'], 'readwrite');
  var store = transaction.objectStore('store');
  var request = store.get(elem.name);
  

  request.onsuccess = function (event) {
    var result = event.target.result;
    elemHandler(result);
  };

  
 console.log(request);
}

function updateItem() {
  
}

function elemHandler(item){
  console.log(item);
}

function addAll() {
  addItem({
    name: "upgrades",
    value: model.upgrades
  });
  addItem({
    name: "cookies",
    value: model.cookieCount
  });
}