const controller = {
    init: function () {
        dataBase.init();
    },
    getUpgrades: function () {
        return Model.upgrades;
    },
    getName: function(name) {
        return Model.upgrades[name].name;
    },
    getCookies: function () {
        return Math.floor(Model.cookieCount);
    },
    getBackground: function(name) {
        return Model.upgrades[name].bg;
    },
    getPopulation: function (name) {
        return Model.upgrades[name].population;
    },
    getPrice: function (name) {
        return Math.floor(Model.upgrades[name].price);
    },
    getProduction: function (name) {
        return Model.upgrades[name].production;
    },
    // add all cookies manufactured by upgrades (in one second)
    addProductionCookies: function () {
        Model.cookieCount += this.getTotalProductionPerSecond(Model) / 10;
    },
    // return number of cookies manufactured by all upgrades in one second
    getTotalProductionPerSecond: function () {
        var productionPerSecond = 0;
        Object
            .keys(Model.upgrades)
            .forEach(  (key, index) => {
                productionPerSecond += this.getProductionPerSecond(key);
            });
        return Math.round(productionPerSecond * 10) / 10;
    },
    getProductionPerSecond: function(name) {
        return Model.upgrades[name].population * Model.upgrades[name].production;
    },
    // buy upgrade, update amount and price of certain upgrade, update number of
    // cookies
    buyUpgrade: function (upgrade) {
        if (controller.getCookies() >= Model.upgrades[upgrade].price) {
            Model.cookieCount -= Model.upgrades[upgrade].price;
            Model.upgrades[upgrade].population += 1;
            Model.upgrades[upgrade].price = Math.floor(Model.upgrades[upgrade].price * 1.15);
        }
    },
    // check if you can afford the upgrade
    canAffordUpgrade(upgradeName) {
        return controller.getCookies() >= Model.upgrades[upgradeName].price;
    },
    // add single cookie from click
    addCookie: function () {
        Model.cookieCount++;
    }
}

controller.init();