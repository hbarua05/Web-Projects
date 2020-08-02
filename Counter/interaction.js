let buttons = document.querySelector(".buttons");
let count = document.querySelector(".count");

buttons.addEventListener("click", (event) => {
    if (event.target.nodeName == "A") {
        event.preventDefault();
        let action = event.target.className;
        if (action == "increase") {
            count.textContent++;
        } else if (action == "decrease") {
            count.textContent--;
        } else {
            count.textContent = 0;
        }
    }
});
