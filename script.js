const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const questionPage = document.getElementById("question-page");
const successPage = document.getElementById("success-page");

/* Disable keyboard tricks */
document.addEventListener("keydown", e => e.preventDefault());

/* Floating outline hearts (EXACT FEEL) */
const heartContainer = document.getElementById("floating-hearts");

for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = "♡";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 10 + Math.random() * 10 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heartContainer.appendChild(heart);
}

/* NO button movement (stays inside button area, BELOW yes) */
noBtn.addEventListener("mouseenter", () => {
    const area = document.querySelector(".btn-group");

    const maxX = area.clientWidth - noBtn.clientWidth;
    const maxY = area.clientHeight - noBtn.clientHeight;

    const randomX = Math.random() * maxX;
    const randomY = 60 + Math.random() * (maxY - 60);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

/* YES click */
yesBtn.addEventListener("click", () => {
    questionPage.classList.add("hidden");
    successPage.classList.remove("hidden");
});
