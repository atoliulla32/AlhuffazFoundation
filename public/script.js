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

// স্লাইড মেনু ওপেন/ক্লোজ এবং আইকন পরিবর্তন ফাংশন
function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    var menuIcon = document.getElementById("menu-icon");
    
    // মেনু খুলবে বা বন্ধ হবে
    navLinks.classList.toggle("active");
    
    // আইকন পরিবর্তন (৩ দাগ থেকে লাল X)
    if (navLinks.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
        menuIcon.style.color = "red";
    } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
        menuIcon.style.color = "#15803d";
    }
}

// ড্রপডাউন মেনু টগল ফাংশন
function toggleDropdown(element) {
    if (window.innerWidth <= 1024) {
        element.classList.toggle("active");
    }
}
