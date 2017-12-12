var upgradesContainer = document.getElementById('upgrades');
var upgradeElements = document.getElementsByClassName('upgrade');
var cuuk = document.querySelector(".cookie-number");

var upgradesListView = {
    init: function () {
        this.upgListElem = document.getElementById('upgrades');
        this.render();
    },
    render: function () {},
    createList: function () {
        var obj = controller.getUpgrades();
        var list = "";
        Object
            .keys(obj)
            .forEach(function (key, index) {
                var overlay = controller.canAfford(key) ? "" : '<div class="overlay"></div>';
                list += ` <li data-name="${key}" class="upgrade">${overlay}
            <div class="upgrade_icon" style="background: ${obj[key].bg}"></div>
            <div class="content">
                <div class="content_name">${obj[key].name}</div>
                <div class="content_price">${obj[key].price}</div>
                <div class="content_owned">${obj[key].population}</div>
            </div>
        </li>`
                // productionPerSecond += obj[key].population * obj[key].production;
                upgradesContainer.innerHTML = list;
            })
    },
    addEventListeners: function (list) {
        that = this;
        for (i = 0; i < list.length; i++) {
            list[i]
                .addEventListener('click', function () {

                    var price = this.getElementsByClassName("content_price")[0];
                    var population = this.getElementsByClassName("content_owned")[0];
                    var name = this.dataset.name;
                    // model.upgrades[name].population += 1;
                    // model.upgrades[name].price *= 1.15;
                    controller.buyUpgrade(name);
                    cuuk.innerHTML = controller.getCookies()
                    price.innerHTML = Math.floor(model.upgrades[name].price);
                    population.innerHTML = Math.floor(model.upgrades[name].population);
                    that.updateCookiesPerSec(model);
                }, false);
        }
    },
    updateCookiesPerSec: function() {
        var cookiesPerSecond = document.querySelector(".cookies-per-second");
        cookiesPerSecond.innerHTML = controller.getProductionPerSecond(model);
    },
    updateCookies: function() {
        controller.setCookies(model);
        cuuk.innerHTML = controller.getCookies();
    }
    
}

upgradesListView.createList();
upgradesListView.addEventListeners(upgradeElements);
window.setInterval(function(){
    upgradesListView.updateCookies();
  }, 1000);
