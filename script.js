const mainNav = document.querySelector('.mainNav');
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const sections = document.querySelectorAll('.heroSection, .arcadiaSection, .storySection, .gallerySection, .choiceSection, .contactSection');

let currentIdx = 0;
let isMoving = false;

const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('lightMode');
    }
};
// Lädt das gespeicherte Thema //
applySavedTheme();

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNav.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target)) {
        mainNav.classList.remove('open');
    }
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('lightMode');
    if (document.body.classList.contains('lightMode')) {
        localStorage.setItem('userTheme', 'light');
    } else {
        localStorage.setItem('userTheme', 'dark');
    }
});

const updateCurrentIndex = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    currentIdx = Math.round(scrollPosition / windowHeight);
};
// Smooth scrolling mit Mausrad // 
window.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 768) return; 
    
    if (e.target.closest('.messageOverlay')) return;
    
    e.preventDefault();
    if (isMoving) return;

    if (e.deltaY > 0) {
        if (currentIdx < sections.length - 1) currentIdx++;
    } else {
        if (currentIdx > 0) currentIdx--;
    }

    isMoving = true;
    sections[currentIdx].scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        isMoving = false;
    }, 800);
}, { passive: false });

window.addEventListener('resize', updateCurrentIndex);
window.addEventListener('load', updateCurrentIndex);

// Entscheidungs Logik //
function makeDecision(choice) {
    const sideDream = document.querySelector('.stayDream');
    const sideWake = document.querySelector('.wakeUp');
    const alertBanner = document.querySelector('.consequenceAlert');

    if (choice === 'dream') {
        sideDream.classList.add('selected');
        sideDream.classList.remove('faded');
        sideWake.classList.add('faded');
        sideWake.classList.remove('selected');
        document.body.style.setProperty('--accentBlue', '#fffbd5ff');
    } else if (choice === 'wakeup') {
        sideWake.classList.add('selected');
        sideWake.classList.remove('faded');
        sideDream.classList.add('faded');
        sideDream.classList.remove('selected');
        document.body.style.setProperty('--accentBlue', '#7c2520ff');
    }

    if (alertBanner) {
        alertBanner.style.opacity = '1';
        setTimeout(() => {
            alertBanner.style.opacity = '0';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hotspot = document.getElementById('signHotspot');
    const subtitle = document.getElementById('inspectSubtitle');
    const subtitleText = subtitle ? subtitle.querySelector('p') : null;
    let subtitleTimeout;

    const originalSignText = subtitleText ? subtitleText.innerText : "";

    const showSubtitle = (text) => {
        if (!subtitle || !subtitleText) return;
        clearTimeout(subtitleTimeout);
        subtitleText.innerText = text;
        subtitle.classList.add('open');
        subtitleTimeout = setTimeout(() => {
            subtitle.classList.remove('open');
        }, 4000);
    };

    if (hotspot) {
        hotspot.addEventListener('click', () => {
            showSubtitle(originalSignText);
        });
    }

    // Video Playback Logik für die Polaroid Videos //
    const polaroids = document.querySelectorAll(".polaroid");

    polaroids.forEach(card => {
        card.addEventListener("click", function() {
            
            if (this.classList.contains('p2')) {
                showSubtitle("Oh... I should try clicking on the other pictures.");
            }

            const currentVideo = this.querySelector("video");

            if (!currentVideo) return;

            if (!currentVideo.paused) {
                currentVideo.pause();
                const originalSrc = currentVideo.querySelector("source").src;
                currentVideo.src = "";
                currentVideo.load();
                currentVideo.src = originalSrc;
            } else {
                document.querySelectorAll(".polaroid video").forEach(otherVideo => {
                    if (!otherVideo.paused && otherVideo !== currentVideo) {
                        otherVideo.pause();
                        const otherSrc = otherVideo.querySelector("source").src;
                        otherVideo.src = "";
                        otherVideo.load();
                        otherVideo.src = otherSrc;
                    }
                });
                
                currentVideo.play().catch(err => console.log("Playback interrupted:", err));
            }
        });
    });
});