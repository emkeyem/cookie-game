var cookie = document.querySelector(".cookie-container .cookie");
var cookieNumber = document.querySelector(".cookie-number");



var addCookie = function() {
    model.cookieCount += 1;
    cookieNumber.innerHTML = Math.round(model.cookieCount*10)/10;
}

cookie.addEventListener('click', addCookie);




