"use strict";
var screens = document.querySelectorAll('.screen');
var chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
var startBtn = document.getElementById('start-btn');
var goBackBtn = document.getElementById('go-back-btn');
var timeEl = document.getElementById('time');
var scoreEl = document.getElementById('score');
var messageEl = document.getElementById('message');
var gameContainer = document.querySelector('.game-container');
var seconds = 0;
var score = 0;
var selectedInsect = {};
startBtn.addEventListener('click', function () { return screens[0].classList.add('up'); });
goBackBtn.addEventListener('click', function () { return screens[0].classList.remove('up'); });
chooseInsectBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        var src = img === null || img === void 0 ? void 0 : img.getAttribute('src');
        var alt = img === null || img === void 0 ? void 0 : img.getAttribute('alt');
        selectedInsect = { src: src, alt: alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});
function startGame() {
    setInterval(increaseTime, 1000);
}
function increaseTime() {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    timeEl.innerHTML = "Time: " + m + ":" + s;
    seconds++;
}
function createInsect() {
    var insect = document.createElement('div');
    insect.classList.add('insect');
    var _a = getRandomLocation(), x = _a.x, y = _a.y;
    insect.style.top = y + "px";
    insect.style.left = x + "px";
    var src = selectedInsect.src, alt = selectedInsect.alt;
    insect.innerHTML = "<img src=\"" + src + "\" alt=\"" + alt + "\" style=\"transform: rotate(" + Math.random() * 360 + "deg)\"/>";
    insect.addEventListener('click', catchInsect);
    gameContainer.appendChild(insect);
}
function getRandomLocation() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = Math.random() * (width - 200) + 100;
    var y = Math.random() * (height - 200) + 100;
    return { x: x, y: y };
}
function catchInsect() {
    var _this = this;
    increaseScore();
    this.classList.add('caught');
    setTimeout(function () { return _this.remove(); }, 2000);
    addInsects();
}
function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}
function increaseScore() {
    score++;
    if (score > 19) {
        messageEl.classList.add('visible');
    }
    scoreEl.innerHTML = "Score:" + score;
}
