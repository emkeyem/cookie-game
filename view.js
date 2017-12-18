var upgradesListView = {
    init: function () {
        var that = this;
        this.upgListElem = document.getElementById('upgrades');
        this.upgradesContainer = document.getElementById('upgrades');
        this.upgradeElements = document.getElementsByClassName('upgrade');
        this.cookiesNumber = document.querySelector(".cookie-number");

        this.updateCookies();
        this.createList(controller.getUpgrades());
        this.updateCookiesPerSec();

        this.addEventListeners(this.upgradeElements);
        window.setInterval(function () {
            that.updateCookies();
            Object
                .keys(controller.getUpgrades())
                .forEach(function (key) {
                    that.toggleOverlay(key);
                })
        }, 1000 / 10);
        this.render();

    },
    render: function () {},
    createList: function (obj) {
        var that = this;
        // var obj = ;
        var list = "";
        Object
            .keys(obj)
            .forEach(function (key) {
                // if you can't afford the upgrade, element gets color overlay
                var overlay = controller.canAffordUpgrade(key)
                    ? ""
                    : "overlay";

                list += `
                <li data-name="${key}" class="upgrade ${overlay}">
                    <div class="upgrade_icon" style="background: ${controller.getBackground(key)}"></div>
                    <div class="content">
                        <div class="content_name">${controller.getName(key)}</div>
                        <div class="content_price">${controller.getPrice(key)}</div>
                        <div class="content_owned">${controller.getPopulation(key)}</div>
                        <div class="content_production-per-second">${controller.getProductionPerSecond(key)} c/s</div>
                    </div>
                </li>`
                that.upgradesContainer.innerHTML = list;
            })
    },
    addEventListeners: function (list) {
        that = this;
        for (i = 0; i < list.length; i++) {
            list[i]
                .addEventListener('click', function () {

                    var price = this.querySelector(".content_price");
                    var population = this.querySelector(".content_owned");
                    var productionPerSecond = this.querySelector(".content_production-per-second");
                    var name = this.dataset.name;

                    controller.buyUpgrade(name);
                    that.cookiesNumber.innerHTML = controller.getCookies(name)
                    price.innerHTML = controller.getPrice(name);
                    population.innerHTML = controller.getPopulation(name);
                    productionPerSecond.innerHTML = (controller.getPopulation(name) * controller.getProduction(name)).toFixed(1) + " c/s";
                    that.updateCookiesPerSec(model);
                }, false);
        }
    },
    toggleOverlay: function (key) {
        var overlayCss = "overlay";
        var upgrade = document.querySelector(`[data-name=${key}]`)
        var canAfford = controller.canAffordUpgrade(key);

        if (canAfford && upgrade.classList.contains(overlayCss)) {
            upgrade
                .classList
                .remove(overlayCss);
        } else if (!canAfford && !upgrade.classList.contains(overlayCss)) {
            upgrade
                .classList
                .add(overlayCss);
        }
    },
    updateCookiesPerSec: function () {
        var cookiesPerSecond = document.querySelector(".cookies-per-second");
        cookiesPerSecond.innerHTML = controller.getTotalProductionPerSecond();
    },
    updateCookies: function () {
        controller.addProductionCookies();
        this.cookiesNumber.innerHTML = controller.getCookies();
    }

}
