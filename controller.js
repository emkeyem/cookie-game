var controller = {
    init: function () {
        upgradesListView.init();
    },
    getUpgrades: function () {
        return model.upgrades;
    },
    productionPerSecond: function () {
        var productionPerSecond;

        Object
            .keys(upgrades)
            .forEach(function (key, index) {
                productionPerSecond += upgrades[key].population * upgrades[key].production;
            });
        console.log(productionPerSecond);
        return productionPerSecond;
    }
}