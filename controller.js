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
    setCookies: function (model) {
        model.cookieCount += this.getProductionPerSecond(model);
    },
    getProductionPerSecond: function (model) {
        var productionPerSecond = 0;

        Object
            .keys(model.upgrades)
            .forEach(function (key, index) {
                productionPerSecond += model.upgrades[key].population * model.upgrades[key].production;
            });
        return Math.round(productionPerSecond * 10) / 10;
    },
    buyUpgrade: function (upgrade) {
        console.log(controller.getCookies(), model.upgrades[upgrade].price);
        if (controller.getCookies() >= model.upgrades[upgrade].price) {
            model.cookieCount -= model.upgrades[upgrade].price;
            model.upgrades[upgrade].population += 1;
            model.upgrades[upgrade].price *= 1.15;
        }
    },
    canAfford(upgrade){
        return controller.getCookies() >= model.upgrades[upgrade].price;
    }

}
