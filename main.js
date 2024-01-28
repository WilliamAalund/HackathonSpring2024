var selected
var buttons = document.getElementsByClassName('a');
var BorS

function resetButtons() {
    for (i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains('active') && buttons[i].getAttribute("id") != selected) {
            buttons[i].classList.remove('active');

            console.log(buttons[i].getAttribute("id"));
        }
        if(buttons[i].getAttribute("id") == selected && !buttons[i].classList.contains('active')) {
            buttons[i].classList.add('active');
        }
    }
}

function toggleEnable(name) {
    selected = name;

    console.log(selected);
}

function buy(p) {
    if (p == "buy") {
        BorS = 1;
    } else {
        BorS = 0;
    }
}

function lockIn() {
    buyStock();
}

function update() {
    resetButtons();
}

function frame() {
    update();
}

setInterval(frame, 33);