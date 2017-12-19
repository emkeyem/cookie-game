const View = {
    init: function () {
        this.upgListElem = document.getElementById('upgrades');
        this.upgradesContainer = document.getElementById('upgrades');
        this.upgradeElements = document.getElementsByClassName('upgrade');
        this.cookiesNumber = document.querySelector(".cookie-number");
        this.cookie = document.querySelector(".cookie-container .cookie");


        this.updateCookiesPerSec();
        this.createList(controller.getUpgrades());

        this.cookie.addEventListener('click', () => this.addClickCookie());
        this.addEventListeners(this.upgradeElements);

        // update cookis number evey 100ms to keep counter smooth
        window.setInterval( () => {
            this.updateCookies();
         
            // 
            Object.keys(controller.getUpgrades())
                .forEach((key) => {
                    this.toggleOverlay(key);
                })
        }, 1000 / 10);

    },

    // create full list of upgrades
    createList: function (obj) {
        var list = "";
        Object
            .keys(obj)
            .forEach(key => {
                list += this.createListItem(key);
            })
        this.upgradesContainer.innerHTML = list;
    },

    // create single upgrades list item
    createListItem: function(key) {
        var listItem = "";
        // if you can't afford the upgrade, element gets color overlay
        var overlay = controller.canAffordUpgrade(key)
            ? ""
            : "overlay";

        listItem = `
            <li data-name="${key}" class="upgrade ${overlay}">
                <div class="upgrade_icon" style="background: ${controller.getBackground(key)}"></div>
                <div class="content">
                    <div class="content_name">${controller.getName(key)}</div>
                    <div class="content_price">${controller.getPrice(key)} c</div>
                    <div class="content_owned">${controller.getPopulation(key)}</div>
                    <div class="content_production-per-second">${controller
            .getProductionPerSecond(key)
            .toFixed(1)} c/s</div>
                </div>
            </li>`
        return listItem;

    },
    // update view of list item on click
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
                    price.innerHTML = controller.getPrice(name) + " c";
                    population.innerHTML = controller.getPopulation(name);
                    productionPerSecond.innerHTML = (controller.getProductionPerSecond(name)).toFixed(1) + " c/s";
                    that.updateCookiesPerSec();
                }, false);
        }
    },
    // if you can afford upgrade, overlay is on, if not, overlay is off
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
    },
    addClickCookie: function () {
        controller.addCookie();
        this.cookiesNumber.innerHTML = controller.getCookies();
    }

}
