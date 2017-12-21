/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _model = __webpack_require__(1);

var _model2 = _interopRequireDefault(_model);

var _db = __webpack_require__(2);

var _db2 = _interopRequireDefault(_db);

var _controller = __webpack_require__(3);

var _controller2 = _interopRequireDefault(_controller);

var _view = __webpack_require__(4);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = new _controller2.default(_model2.default);
var view = new _view2.default(controller);
var db = new _db2.default("store", "cookie_clicker", _model2.default, view);

db.init(view);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Model = {
    cookieCount: 0,

    upgrades: {
        cursor: {
            name: "Cursor",
            price: 25,
            src: "",
            production: 0.1,
            population: 0,
            bg: "url('./assets/img/buildings.png') 0 0"

        },
        grandma: {
            name: "Grandma",
            price: 100,
            src: "",
            production: 1,
            population: 0,
            bg: "url('./assets/img/buildings.png') 0 -64px"
        },
        farm: {
            name: "Farm",
            price: 1100,
            src: "",
            production: 8,
            population: 0,
            bg: "url('./assets/img/buildings.png') 0 -192px"
        },
        mine: {
            name: "Mine",
            price: 13000,
            src: "",
            production: 47,
            population: 0,
            bg: "url('./assets/img/buildings.png') 0 -256px"
        },
        factory: {
            name: "Factory",
            price: 130000,
            src: "",
            production: 260,
            population: 0,
            bg: "url('./assets/img/buildings.png') 0 -320px"
        }
    }

};

exports.default = Model;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DB = function () {
  function DB(storeName, dbName, model, view) {
    _classCallCheck(this, DB);

    this.db = "";
    this.storeName = storeName;
    this.dbName = dbName;
    this.model = model;
    this.view = view;
  }

  _createClass(DB, [{
    key: "createDbObject",
    value: function createDbObject(name, model) {
      var obj = {};
      obj.name = name;
      obj.value = model[name];
      return obj;
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      // this.isIndexDbsupported();
      this.saveButton = document.querySelector(".save");
      this.saveButton.addEventListener('click', function () {
        return _this.updateDB();
      });

      var that = this;
      var openRequest = indexedDB.open(this.dbName, 1);

      openRequest.onupgradeneeded = function (e) {
        that.db = e.target.result;
        if (!that.db.objectStoreNames.contains(that.storeName)) {
          var store = that.db.createObjectStore(that.storeName, { keyPath: "name" });
          store.transaction.oncomplete = function (event) {
            var store = that.db.transaction(that.storeName, "readwrite").objectStore(that.storeName);
            for (var key in that.model) {
              store.add(that.createDbObject(key, that.model));
            }
          };
        }
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
  }, {
    key: "isIndexDbsupported",
    value: function isIndexDbsupported() {
      window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such featur" + "e will not be available.");
      }
    }
  }, {
    key: "getAll",
    value: function getAll() {

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
  }, {
    key: "updateModel",
    value: function updateModel(obj, model) {
      obj.target.result.forEach(function (element) {
        Object.keys(model).forEach(function (key) {
          if (element.name == key) {
            model[key] = element.value;
          };
        });
      });
    }
  }, {
    key: "updateDB",
    value: function updateDB() {
      var that = this;
      var objectStore = that.db.transaction([this.storeName], "readwrite").objectStore(this.storeName);
      for (var key in that.model) {
        this.updateSingleDbItem(key, that.model, objectStore);
      }
    }
  }, {
    key: "updateSingleDbItem",
    value: function updateSingleDbItem(key, model, objectStore) {
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
  }]);

  return DB;
}();

exports.default = DB;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(model) {
        _classCallCheck(this, Controller);

        this.Model = model;
    }

    _createClass(Controller, [{
        key: "init",
        value: function init() {
            dataBase.init();
        }
    }, {
        key: "getUpgrades",
        value: function getUpgrades() {
            return this.Model.upgrades;
        }
    }, {
        key: "getName",
        value: function getName(name) {
            return this.Model.upgrades[name].name;
        }
    }, {
        key: "getCookies",
        value: function getCookies() {
            return Math.floor(this.Model.cookieCount);
        }
    }, {
        key: "getBackground",
        value: function getBackground(name) {
            return this.Model.upgrades[name].bg;
        }
    }, {
        key: "getPopulation",
        value: function getPopulation(name) {
            return this.Model.upgrades[name].population;
        }
    }, {
        key: "getPrice",
        value: function getPrice(name) {
            return Math.floor(this.Model.upgrades[name].price);
        }
    }, {
        key: "getProduction",
        value: function getProduction(name) {
            return this.Model.upgrades[name].production;
        }
        // add all cookies manufactured by upgrades (in one second)

    }, {
        key: "addProductionCookies",
        value: function addProductionCookies() {
            this.Model.cookieCount += this.getTotalProductionPerSecond(this.Model) / 10;
        }
        // return number of cookies manufactured by all upgrades in one second

    }, {
        key: "getTotalProductionPerSecond",
        value: function getTotalProductionPerSecond() {
            var _this = this;

            var productionPerSecond = 0;
            Object.keys(this.Model.upgrades).forEach(function (key, index) {
                productionPerSecond += _this.getProductionPerSecond(key);
            });
            return Math.round(productionPerSecond * 10) / 10;
        }
    }, {
        key: "getProductionPerSecond",
        value: function getProductionPerSecond(name) {
            return this.Model.upgrades[name].population * this.Model.upgrades[name].production;
        }
        // buy upgrade, update amount and price of certain upgrade, update number of
        // cookies

    }, {
        key: "buyUpgrade",
        value: function buyUpgrade(upgrade) {
            if (this.getCookies() >= this.Model.upgrades[upgrade].price) {
                this.Model.cookieCount -= this.Model.upgrades[upgrade].price;
                this.Model.upgrades[upgrade].population += 1;
                this.Model.upgrades[upgrade].price = Math.floor(this.Model.upgrades[upgrade].price * 1.15);
            }
        }
        // check if you can afford the upgrade

    }, {
        key: "canAffordUpgrade",
        value: function canAffordUpgrade(upgradeName) {
            return this.getCookies() >= this.Model.upgrades[upgradeName].price;
        }
        // add single cookie from click

    }, {
        key: "addCookie",
        value: function addCookie() {
            this.Model.cookieCount++;
        }
    }]);

    return Controller;
}();

exports.default = Controller;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View(controller) {
        _classCallCheck(this, View);

        this.controller = controller;
    }

    _createClass(View, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var that = this;
            this.upgListElem = document.getElementById('upgrades');
            this.upgradesContainer = document.getElementById('upgrades');
            this.upgradeElements = document.getElementsByClassName('upgrade');
            this.cookiesNumber = document.querySelector(".cookie-number");
            this.cookie = document.querySelector(".cookie-container .cookie");

            this.updateCookiesPerSec();
            this.createList(that.controller.getUpgrades());
            console.log(this);
            this.cookie.addEventListener('click', function () {
                return _this.addClickCookie();
            });
            this.addEventListeners(this.upgradeElements);

            // update cookis number evey 100ms to keep counter smooth
            window.setInterval(function () {
                _this.updateCookies();

                // 
                Object.keys(that.controller.getUpgrades()).forEach(function (key) {
                    _this.toggleOverlay(key);
                });
            }, 1000 / 10);
        }

        // create full list of upgrades

    }, {
        key: 'createList',
        value: function createList(obj) {
            var _this2 = this;

            var list = "";
            Object.keys(obj).forEach(function (key) {
                list += _this2.createListItem(key);
            });
            this.upgradesContainer.innerHTML = list;
        }

        // create single upgrades list item

    }, {
        key: 'createListItem',
        value: function createListItem(key) {
            var that = this;

            var listItem = "";
            // if you can't afford the upgrade, element gets color overlay
            var overlay = that.controller.canAffordUpgrade(key) ? "" : "overlay";

            listItem = '\n            <li data-name="' + key + '" class="upgrade ' + overlay + '">\n                <div class="upgrade_icon" style="background: ' + that.controller.getBackground(key) + '"></div>\n                <div class="content">\n                    <div class="content_name">' + that.controller.getName(key) + '</div>\n                    <div class="content_price">' + that.controller.getPrice(key) + ' c</div>\n                    <div class="content_owned">' + that.controller.getPopulation(key) + '</div>\n                    <div class="content_production-per-second">' + that.controller.getProductionPerSecond(key).toFixed(1) + ' c/s</div>\n                </div>\n            </li>';
            return listItem;
        }
        // update view of list item on click

    }, {
        key: 'addEventListeners',
        value: function addEventListeners(list) {
            var that = this;
            for (var i = 0; i < list.length; i++) {
                list[i].addEventListener('click', function () {
                    var price = this.querySelector(".content_price");
                    var population = this.querySelector(".content_owned");
                    var productionPerSecond = this.querySelector(".content_production-per-second");
                    var name = this.dataset.name;

                    that.controller.buyUpgrade(name);
                    that.cookiesNumber.innerHTML = that.controller.getCookies(name);
                    price.innerHTML = that.controller.getPrice(name) + " c";
                    population.innerHTML = that.controller.getPopulation(name);
                    productionPerSecond.innerHTML = that.controller.getProductionPerSecond(name).toFixed(1) + " c/s";
                    that.updateCookiesPerSec();
                }, false);
            }
        }
        // if you can afford upgrade, overlay is on, if not, overlay is off

    }, {
        key: 'toggleOverlay',
        value: function toggleOverlay(key) {
            var that = this;

            var overlayCss = "overlay";
            var upgrade = document.querySelector('[data-name=' + key + ']');
            var canAfford = that.controller.canAffordUpgrade(key);

            if (canAfford && upgrade.classList.contains(overlayCss)) {
                upgrade.classList.remove(overlayCss);
            } else if (!canAfford && !upgrade.classList.contains(overlayCss)) {
                upgrade.classList.add(overlayCss);
            }
        }
    }, {
        key: 'updateCookiesPerSec',
        value: function updateCookiesPerSec() {
            var that = this;

            var cookiesPerSecond = document.querySelector(".cookies-per-second");
            cookiesPerSecond.innerHTML = that.controller.getTotalProductionPerSecond();
        }
    }, {
        key: 'updateCookies',
        value: function updateCookies() {
            var that = this;

            that.controller.addProductionCookies();
            this.cookiesNumber.innerHTML = that.controller.getCookies();
        }
    }, {
        key: 'addClickCookie',
        value: function addClickCookie() {
            var that = this;

            that.controller.addCookie();
            this.cookiesNumber.innerHTML = that.controller.getCookies();
        }
    }]);

    return View;
}();

exports.default = View;

/***/ })
/******/ ]);