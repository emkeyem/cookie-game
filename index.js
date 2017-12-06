var cookie = document.querySelector(".cookie-container .cookie");
var cookieNumber = document.querySelector(".cookie-number");
var cookieCount = 0;
var autoIncrement = 0;

var addCookie = function() {
    cookieCount += 1;
    cookieNumber.innerHTML = cookieCount;
}

cookie.addEventListener('click', addCookie);




