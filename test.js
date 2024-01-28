var selected
var buttons = document.getElementsByClassName("list-group");
var previous = ''

function resetButtons() {
    for (i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains('active')) {
            buttons[i].classList.toggle('active');
        }
    }
}

function toggleEnable(name) {
    selected = name;

    resetButtons()

    document.getElementById(selected).classList.toggle('active');
    if (!(previous == name || previous == '')) {
        document.getElementById(previous).classList.toggle('active');
    }
    previous = name;
}