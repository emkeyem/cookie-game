var controller = {
    init: function () {
        upgradesListView.init();
    },
    getUpgrades: function () {
        return model.upgrades;
    },
    getName: function(name) {
        return model.upgrades[name].name;
    },
    getCookies: function () {
        return Math.floor(model.cookieCount);
    },
    getBackground: function(name) {
        return model.upgrades[name].bg;
    },
    getPopulation: function (name) {
        return model.upgrades[name].population;
    },
    getPrice: function (name) {
        return Math.floor(model.upgrades[name].price);
    },
    getProduction: function (name) {
        return model.upgrades[name].production;
    },
    // add all cookies manufactured by upgrades (in one second)
    addProductionCookies: function () {
        model.cookieCount += this.getTotalProductionPerSecond(model) / 10;
    },
    // return number of cookies manufactured by all upgrades in one second
    getTotalProductionPerSecond: function () {
        var productionPerSecond = 0;
        var that = this;
        Object
            .keys(model.upgrades)
            .forEach(function (key, index) {
                productionPerSecond += that.getProductionPerSecond(key);
            });
        return Math.round(productionPerSecond * 10) / 10;
    },
    getProductionPerSecond: function(name) {
        return model.upgrades[name].population * model.upgrades[name].production;
    },
    // buy upgrade, update amount and price of certain upgrade, update number of
    // cookies
    buyUpgrade: function (upgrade) {
        if (controller.getCookies() >= model.upgrades[upgrade].price) {
            model.cookieCount -= model.upgrades[upgrade].price;
            model.upgrades[upgrade].population += 1;
            model.upgrades[upgrade].price = Math.floor(model.upgrades[upgrade].price * 1.15);
        }
    },
    // check if you can afford the upgrade
    canAffordUpgrade(upgradeName) {
        return controller.getCookies() >= model.upgrades[upgradeName].price;
    },
    // add single cookie from click
    addCookie: function () {
        model.cookieCount++;
    }
}
