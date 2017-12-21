class View  {
    constructor(controller) {
        this.controller = controller;
    }
    init() {
        var that = this;
        this.upgListElem = document.getElementById('upgrades');
        this.upgradesContainer = document.getElementById('upgrades');
        this.upgradeElements = document.getElementsByClassName('upgrade');
        this.cookiesNumber = document.querySelector(".cookie-number");
        this.cookie = document.querySelector(".cookie-container .cookie");


        this.updateCookiesPerSec();
        this.createList(that.controller.getUpgrades());
console.log(this);
        this.cookie.addEventListener('click', () => this.addClickCookie());
        this.addEventListeners(this.upgradeElements);

        // update cookis number evey 100ms to keep counter smooth
        window.setInterval( () => {
            this.updateCookies();
         
            // 
            Object.keys(that.controller.getUpgrades())
                .forEach((key) => {
                    this.toggleOverlay(key);
                })
        }, 1000 / 10);

    }

    // create full list of upgrades
    createList(obj) {
        var list = "";
        Object
            .keys(obj)
            .forEach(key => {
                list += this.createListItem(key);
            })
        this.upgradesContainer.innerHTML = list;
    }

    // create single upgrades list item
    createListItem(key) {
        var that = this;
        
        var listItem = "";
        // if you can't afford the upgrade, element gets color overlay
        var overlay = that.controller.canAffordUpgrade(key)
            ? ""
            : "overlay";

        listItem = `
            <li data-name="${key}" class="upgrade ${overlay}">
                <div class="upgrade_icon" style="background: ${that.controller.getBackground(key)}"></div>
                <div class="content">
                    <div class="content_name">${that.controller.getName(key)}</div>
                    <div class="content_price">${that.controller.getPrice(key)} c</div>
                    <div class="content_owned">${that.controller.getPopulation(key)}</div>
                    <div class="content_production-per-second">${that.controller
            .getProductionPerSecond(key)
            .toFixed(1)} c/s</div>
                </div>
            </li>`
        return listItem;

    }
    // update view of list item on click
    addEventListeners(list) {
        var that = this;
        for (var i = 0; i < list.length; i++) {
            list[i]
                .addEventListener('click', function () {
                    var price = this.querySelector(".content_price");
                    var population = this.querySelector(".content_owned");
                    var productionPerSecond = this.querySelector(".content_production-per-second");
                    var name = this.dataset.name;

                    that.controller.buyUpgrade(name);
                    that.cookiesNumber.innerHTML = that.controller.getCookies(name)
                    price.innerHTML = that.controller.getPrice(name) + " c";
                    population.innerHTML = that.controller.getPopulation(name);
                    productionPerSecond.innerHTML = (that.controller.getProductionPerSecond(name)).toFixed(1) + " c/s";
                    that.updateCookiesPerSec();
                }, false);
        }
    }
    // if you can afford upgrade, overlay is on, if not, overlay is off
    toggleOverlay(key) {
        var that = this;
        
        var overlayCss = "overlay";
        var upgrade = document.querySelector(`[data-name=${key}]`)
        var canAfford = that.controller.canAffordUpgrade(key);

        if (canAfford && upgrade.classList.contains(overlayCss)) {
            upgrade
                .classList
                .remove(overlayCss);
        } else if (!canAfford && !upgrade.classList.contains(overlayCss)) {
            upgrade
                .classList
                .add(overlayCss);
        }
    }
    updateCookiesPerSec() {
        var that = this;
        
        var cookiesPerSecond = document.querySelector(".cookies-per-second");
        cookiesPerSecond.innerHTML = that.controller.getTotalProductionPerSecond();
    }
    updateCookies() {
        var that = this;
        
        that.controller.addProductionCookies();
        this.cookiesNumber.innerHTML = that.controller.getCookies();
    }
    addClickCookie() {
        var that = this;
        
        that.controller.addCookie();
        this.cookiesNumber.innerHTML = that.controller.getCookies();
    }

}

export default View;