var selected
var buttons = document.getElementById("pp");
var previous = ''
var BorS

function resetButtons() {
    for (i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains('active') && buttons[i].getAttribute("id") != selected) {
            buttons[i].classList.add('active');
            console.log(buttons[i].getAttribute("id"));
        } else {
            buttons[i].classList.remove('active');
            console.log(buttons[i].getAttribute("id"));
        }
    }
}

function toggleEnable(name) {
    selected = name;

    resetButtons()

    //document.getElementById(selected).classList.toggle('active');
    //if (!(previous == name || previous == '')) {
        //document.getElementById(previous).classList.toggle('active');
    //}
    previous = name;

    console.log(selected);
}

function update() {
    resetButtons();
}

function frame() {
    update();
}

setInterval(frame, 33);