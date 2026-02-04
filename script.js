const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const questionPage = document.getElementById("question-page");
const successPage = document.getElementById("success-page");
const song = document.getElementById("love-song");

/* Floating hearts */
/* Floating hearts – FIXED */
const heartContainer = document.getElementById("floating-hearts");

for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 40 + Math.random() * 30 + "px";
    heart.style.animationDuration = 6 + Math.random() * 6 + "s";
    heart.style.animationDelay = -Math.random() * 10 + "s"; // 👈 START IMMEDIATELY

    heartContainer.appendChild(heart);
}


/* ---- PERFECT FLOATING NO BUTTON ---- */
function moveNoButton() {
    const noRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const padding = 10; // safety margin
    let newX = 0, newY = 0, safe = false;

    const maxX = window.innerWidth - noRect.width - padding * 2;
    const maxY = window.innerHeight - noRect.height - padding * 2;

    if (maxX <= 0 || maxY <= 0) {
        // element too large for viewport — center it
        newX = Math.max(padding, (window.innerWidth - noRect.width) / 2);
        newY = Math.max(padding, (window.innerHeight - noRect.height) / 2);
    } else {
        let attempts = 0;
        while (!safe && attempts < 20) {
            newX = Math.random() * maxX + padding;
            newY = Math.random() * maxY + padding;

            // avoid YES button
            const overlap =
                newX < yesRect.right &&
                newX + noRect.width > yesRect.left &&
                newY < yesRect.bottom &&
                newY + noRect.height > yesRect.top;

            if (!overlap) safe = true;
            attempts++;
        }

        if (!safe) {
            // fallback: place it on the opposite side of the YES button
            if (yesRect.left < window.innerWidth / 2) {
                newX = Math.min(window.innerWidth - noRect.width - padding, yesRect.right + padding);
            } else {
                newX = Math.max(padding, yesRect.left - noRect.width - padding);
            }
            newY = Math.min(Math.max(padding, yesRect.top - noRect.height - padding), window.innerHeight - noRect.height - padding);
        }
    }

    // clamp to viewport just in case
    newX = Math.min(Math.max(padding, newX), window.innerWidth - noRect.width - padding);
    newY = Math.min(Math.max(padding, newY), window.innerHeight - noRect.height - padding);

    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
}


/* Desktop hover */
noBtn.addEventListener("mouseenter", moveNoButton);

/* Mobile tap */
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
});

/* YES → Page 2 + Play Song (update history so Back works) */
yesBtn.addEventListener("click", () => {
    // push a state so the browser Back button returns to question page
    history.pushState({ page: "success" }, "", "#success");

    questionPage.classList.add("hidden");
    successPage.classList.remove("hidden");

    song.currentTime = 0;
    song.volume = 0.8;
    song.play();
});

/* STOP SONG */
function stopSong() {
    song.pause();
    song.currentTime = 0;
}

/* Handle Back / Forward navigation */
window.addEventListener("popstate", (e) => {
    if (e.state && e.state.page === "success") {
        // show success (forward navigation)
        questionPage.classList.add("hidden");
        successPage.classList.remove("hidden");
    } else {
        // back to question — stop music and show question page
        stopSong();
        successPage.classList.add("hidden");
        questionPage.classList.remove("hidden");
    }
});

/* pageshow handles bfcache restore */
window.addEventListener("pageshow", () => {
    if (location.hash === "#success" || (history.state && history.state.page === "success")) {
        questionPage.classList.add("hidden");
        successPage.classList.remove("hidden");
    } else {
        stopSong();
        successPage.classList.add("hidden");
        questionPage.classList.remove("hidden");
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopSong();
});

/* ensure initial history state */
history.replaceState({ page: "question" }, "", location.pathname + location.search + location.hash);
