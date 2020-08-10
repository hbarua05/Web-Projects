let hamburger = document.querySelector(".hamburger");
// Add click eventListener for displaying the navLinks
hamburger.addEventListener("click", hamburgerDisplay);
// Function to display the hamburger
function hamburgerDisplay() {
    let nav = document.querySelector("ul");
    let active = nav.classList.toggle("active"); // Checks if the hamburger has been opened
    let navLinks = document.querySelectorAll("li"); // Selecting all the navLinks
    if (active) {
        nav.style.left = "0px"; // Moving the hamburger links into page
        // Displaying the links
        for (let i = 0, len = navLinks.length; i < len; i++) {
            navLinks[i].style.opacity = "1";
            navLinks[i].style.transform = "scale(1)";
            navLinks[i].style.transition =
                "opacity 500ms ease-in, transform 400ms ease-in-out";
        }
        // Hiding the links
    } else {
        nav.style.left = "-100%"; // Moving the hamburger links out of page
        for (let i = 0, len = navLinks.length; i < len; i++) {
            navLinks[i].style.opacity = "0.1";
            navLinks[i].style.transform = "scale(0.1)";
            navLinks[i].style.transition =
                "opacity 600ms ease-in, transform 300ms ease-in-out";
        }
    }
}
// Creating media query List
let mql = window.matchMedia("(min-width: 1000px)");
// Function to display navLinks
function displaynavbar(screen) {
    if (screen.matches) {
        let navLinks = document.querySelectorAll("li");
        for (let i = 0, len = navLinks.length; i < len; i++) {
            navLinks[i].style.opacity = "1";
            navLinks[i].style.transform = "scale(1)";
        }
    }
}
// A media query to display the navLinks
mql.addListener(displaynavbar);
