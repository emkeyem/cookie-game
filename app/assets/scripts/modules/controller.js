class Controller {
    constructor(model) {
        this.Model = model;
    }

    init() {
        dataBase.init();
    }
    getUpgrades() {
        return this.Model.upgrades;
    }
    getName(name) {
        return this.Model.upgrades[name].name;
    }
    getCookies() {
        return Math.floor(this.Model.cookieCount);
    }
    getBackground(name) {
        return this.Model.upgrades[name].bg;
    }
    getPopulation(name) {
        return this.Model.upgrades[name].population;
    }
    getPrice(name) {
        return Math.floor(this.Model.upgrades[name].price);
    }
    getProduction(name) {
        return this.Model.upgrades[name].production;
    }
    // add all cookies manufactured by upgrades (in 100 miliseconds)
    addProductionCookies() {
        this.Model.cookieCount += this.getTotalProductionPerSecond(this.Model) / 10;
    }
    // return number of cookies manufactured by all upgrades in one second
    getTotalProductionPerSecond() {
        var productionPerSecond = 0;
        Object
            .keys(this.Model.upgrades)
            .forEach(  (key, index) => {
                productionPerSecond += this.getProductionPerSecond(key);
            });
        return Math.round(productionPerSecond * 10) / 10;
    }
    getProductionPerSecond(name) {
        return this.Model.upgrades[name].population * this.Model.upgrades[name].production;
    }
    // buy upgrade, update amount and price of certain upgrade, update number of
    // cookies
    buyUpgrade(upgrade) {
        if (this.getCookies() >= this.Model.upgrades[upgrade].price) {
            this.Model.cookieCount -= this.Model.upgrades[upgrade].price;
            this.Model.upgrades[upgrade].population += 1;
            this.Model.upgrades[upgrade].price = Math.floor(this.Model.upgrades[upgrade].price * 1.15);
        }
    }
    // check if you can afford the upgrade
    canAffordUpgrade(upgradeName) {
        return this.getCookies() >= this.Model.upgrades[upgradeName].price;
    }
    // add single cookie from click
    addCookie() {
        this.Model.cookieCount++;
    }
}



export default Controller;
