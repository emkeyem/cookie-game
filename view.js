var elems = document.getElementById('upgrades');

var upgradesListView = {
    init: function () {
        this.upgListElem = document.getElementById('upgrades');
        this.render();
    },
    render: function () {},
    createList: function (obj) {
        var list = "";
        Object
            .keys(obj)
            .forEach(function (key, index) {
                list += ` <li class="upgrade">
            <div class="upgrade_icon" style="background-position: ${obj[key].bgPosition}"></div>
            <div class="content">
                <div class="content_name">${obj[key].name}</div>
                <div class="content_price">${obj[key].price}</div>
                <div class="content_owned">${obj[key].population}</div>
            </div>
        </li>`
                // productionPerSecond += obj[key].population * obj[key].production;
                elems.innerHTML = list;
            })
    }
}

upgradesListView.createList(model.upgrades);
