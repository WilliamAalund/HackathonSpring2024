var selected

function toggleEnable(name) {
    selected = name;
    document.getElementById(name).classList.toggle('active');
}