let openBtn = document.querySelector(".open-modal");
let closeBtn = document.querySelector(".exit");
let modal = document.querySelector(".modal");

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        closeModal();
    }
});

function openModal() {
    modal.style.display = "block";
}
function closeModal() {
    modal.style.display = "none";
}
