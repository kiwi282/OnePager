const mainNav = document.querySelector('.mainNav');
const navToggle = document.getElementById('navToggle');
const themeToggle = document.getElementById('themeToggle');
const sections = document.querySelectorAll('.heroSection, .arcadiaSection, .storySection, .gallerySection, .choiceSection, .contactSection');

let currentIdx = 0;
let isMoving = false;

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mainNav.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target)) {
        mainNav.classList.remove('open');
    }
});

const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('lightMode');
    }
};

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

window.addEventListener('wheel', (e) => {
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
document.addEventListener('DOMContentLoaded', () => {
    const choiceSides = document.querySelectorAll('.choiceSide');

    if (choiceSides.length > 0) {
        choiceSides.forEach(side => {
            side.addEventListener('click', () => {
                choiceSides.forEach(s => s.classList.remove('selected', 'faded'));
                
                side.classList.add('selected');
                choiceSides.forEach(s => {
                    if (s !== side) {
                        s.classList.add('faded');
                    }
                });
                
                console.log("Choice registered. Consequences ahead.");
            });
        });
    }
});