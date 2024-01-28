var selected
var buttons = document.getElementsByClassName("list-group");
var previous = ''

function toggleEnable(name) {
    selected = name;

    document.getElementById(selected).classList.toggle('active');
    if (!(previous == name || previous == '')) {
        document.getElementById(previous).classList.toggle('active');
    }
    previous = name;
}