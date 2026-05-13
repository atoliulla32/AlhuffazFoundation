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

// --- লাইভ নিউজ বোর্ড সব পেজে দেখানোর গ্লোবাল কোড ---
function initGlobalLiveBoard() {
    // চেক করবে হেডার পেজে লোড হয়েছে কিনা
    const marqueeContent = document.getElementById('header-marquee-content');
    if (!marqueeContent) {
        setTimeout(initGlobalLiveBoard, 500); // হেডার লোড না হলে একটু পর আবার চেক করবে
        return;
    }

    // অন্যান্য পেজে Firebase লোড করা না থাকলে অটোমেটিক লোড করবে
    if (typeof firebase === 'undefined') {
        const fbApp = document.createElement('script');
        fbApp.src = "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
        document.head.appendChild(fbApp);

        fbApp.onload = () => {
            const fbDb = document.createElement('script');
            fbDb.src = "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js";
            document.head.appendChild(fbDb);
            fbDb.onload = fetchGlobalNotices;
        };
    } else {
        fetchGlobalNotices(); // Firebase থাকলে সরাসরি ডাটা আনবে
    }
}

function fetchGlobalNotices() {
    const firebaseConfig = {
        apiKey: "AIzaSyAjv9u2Qn3EdVxNKBMcT1ezHp-5NitucT0",
        authDomain: "foundation-ntc.firebaseapp.com",
        projectId: "foundation-ntc"
    };
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    db.collection("notices").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        const marqueeContent = document.getElementById('header-marquee-content');
        if(!marqueeContent) return;
        
        marqueeContent.innerHTML = '';
        let liveNoticesCount = 0;
        
        snapshot.forEach((doc) => {
            const notice = doc.data();
            if(notice.isLive) {
                document.getElementById('headerLiveBoard').style.display = 'flex';
                marqueeContent.innerHTML += `<span class="date">[${notice.date}]</span> ${notice.title} <span class="divider">•</span> `;
                liveNoticesCount++;
            }
        });
        
        // যদি লাইভ নিউজ না থাকে
        if(liveNoticesCount === 0) {
            marqueeContent.innerHTML = 'বর্তমানে কোনো ব্রেকিং বিজ্ঞপ্তি নেই।';
            document.getElementById('headerLiveBoard').style.display = 'flex';
        }
    });
}

// ফাংশনটি চালু করে দেওয়া হলো
initGlobalLiveBoard();
