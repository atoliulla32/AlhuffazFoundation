// Header এবং Footer অটোমেটিক লোড করার ফাংশন
function loadHTML(id, filename) {
    fetch(filename)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// পেজ ওপেন হওয়ার সাথে সাথে ফাইলগুলো কল হবে
document.addEventListener("DOMContentLoaded", function() {
    loadHTML("header-placeholder", "header.html");
    loadHTML("footer-placeholder", "footer.html");
});

// স্লাইড মেনু ওপেন/ক্লোজ ফাংশন
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.querySelector('.menu-toggle'); // Button element target
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active"); // Put active on the button too!
}

// ড্রপডাউন মেনু টগল ফাংশন
function toggleDropdown(element) {
    if (window.innerWidth <= 1024) {
        element.classList.toggle("active");
    }
}
