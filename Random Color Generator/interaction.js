let button = document.querySelector("a");
button.addEventListener("click", setRandomColor);

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor(event) {
    event.preventDefault();
    let color = document.querySelector(".color");
    let generatedColor = getRandomColor();
    color.innerHTML = generatedColor;
    color.style.color = generatedColor;
    document.querySelector("body").style.backgroundColor = generatedColor;
}
