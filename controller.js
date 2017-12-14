var controller = {
    init: function () {
        upgradesListView.init();
    },
    getUpgrades: function () {
        return model.upgrades;
    },
    getCookies: function () {
        return Math.floor(model.cookieCount);
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
        model.cookieCount += this.getProductionPerSecond(model);
    },
    // add single cookie from click
    addCookie: function () {
        model.cookieCount++;
    },
    // return number of cookies manufactured by all upgrades in one second
    getProductionPerSecond: function () {
        var productionPerSecond = 0;
        Object
            .keys(model.upgrades)
            .forEach(function (key, index) {
                productionPerSecond += model.upgrades[key].population * model.upgrades[key].production;
            });
        return Math.round(productionPerSecond * 10) / 10;
    },
    // buy upgrade, update amount and price of certain upgrade, update number of
    // cookies
    buyUpgrade: function (upgrade) {
        console.log(controller.getCookies(), model.upgrades[upgrade].price);
        if (controller.getCookies() >= model.upgrades[upgrade].price) {
            model.cookieCount -= model.upgrades[upgrade].price;
            model.upgrades[upgrade].population += 1;
            model.upgrades[upgrade].price *= 1.15;
        }
    },
    // check if you can afford the upgrade
    canAffordUpgrade(upgrade) {
        return controller.getCookies() >= model.upgrades[upgrade].price;
    }

}
