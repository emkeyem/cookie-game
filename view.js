var upgradesListView = {
    init: function () {
        var that = this;
        this.upgListElem = document.getElementById('upgrades');
        this.upgradesContainer = document.getElementById('upgrades');
        this.upgradeElements = document.getElementsByClassName('upgrade');
        this.cookiesNumber = document.querySelector(".cookie-number");

        this.updateCookies();
        this.createList();
        this.updateCookiesPerSec();


        this.addEventListeners(this.upgradeElements);
        window.setInterval(function () {
            that.updateCookies();
        }, 1000);
        this.render();

    },
    render: function () {},
    createList: function () {
        var that = this;
        var obj = controller.getUpgrades();
        var list = "";
        Object
            .keys(obj)
            .forEach(function (key) {
                // if you can't afford the upgrade, element gets color overlay
                var overlay = controller.canAffordUpgrade(key)
                    ? ""
                    : '<div class="overlay"></div>';

                list += `
                <li data-name="${key}" class="upgrade">${overlay}
                    <div class="upgrade_icon" style="background: ${obj[key].bg}"></div>
                    <div class="content">
                        <div class="content_name">${obj[key].name}</div>
                        <div class="content_price">${obj[key].price}</div>
                        <div class="content_owned">${obj[key].population}</div>
                    </div>
                </li>`
                // productionPerSecond += obj[key].population * obj[key].production;
                that.upgradesContainer.innerHTML = list;
            })
            console.log("crrating view");
    },
    addEventListeners: function (list) {
        that = this;
        for (i = 0; i < list.length; i++) {
            list[i]
                .addEventListener('click', function () {

                    var price = this.getElementsByClassName("content_price")[0];
                    var population = this.getElementsByClassName("content_owned")[0];
                    var name = this.dataset.name;

                    controller.buyUpgrade(name);
                    that.cookiesNumber.innerHTML = controller.getCookies(name)
                    price.innerHTML = controller.getPrice(name);
                    population.innerHTML = controller.getPopulation(name);
                    that.updateCookiesPerSec(model);
                }, false);
        }
    },
    toggleOverlay: function(){
        
    },
    updateCookiesPerSec: function () {
        var cookiesPerSecond = document.querySelector(".cookies-per-second");
        cookiesPerSecond.innerHTML = controller.getProductionPerSecond();
    },
    updateCookies: function () {
        controller.addProductionCookies();
        this.cookiesNumber.innerHTML = controller.getCookies();
    }

}

// upgradesListView.init();
