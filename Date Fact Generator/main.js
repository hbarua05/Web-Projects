document.querySelector("button").addEventListener("click", generate);

function generate() {
    let input = document.querySelector("#date").value;
    if (input != "") {
        let month = input.slice(5, 7),
            day = input.slice(8);
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `http://numbersapi.com/${month}/${day}/date`);
        xhr.onload = function () {
            if (this.status == 200) {
                document.querySelector(".fact-title").textContent = "Date Fact";
                document.querySelector(".fact").textContent = this.responseText;
                document.querySelector(".fact-box").style.display = "block";
            }
        };
        xhr.send();
    } else {
        document.querySelector(".fact-title").textContent =
            "Please Enter A Valid Date";
        document.querySelector(".fact").textContent = "";
        document.querySelector(".fact-box").style.display = "block";
    }
}
