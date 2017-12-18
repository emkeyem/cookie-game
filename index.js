var cookie = document.querySelector(".cookie-container .cookie");
var cookieNumber = document.querySelector(".cookie-number");



var addCookie = function() {
    model.cookieCount += 1;
    cookieNumber.innerHTML = controller.getCookies();
}

cookie.addEventListener('click', addCookie);




