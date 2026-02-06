// Get URL parameters for guest name
function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        document.getElementById('guestName').textContent = decodeURIComponent(guestName);
    }
}

// Open Invitation
const openBtn = document.getElementById('openInvitation');
const coverSection = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');

openBtn.addEventListener('click', () => {
    coverSection.classList.add('hidden');
    mainContent.classList.add('active');

    // Start countdown
    startCountdown();

    // Initialize fade-in animations
    initFadeInAnimations();

    // Play background music (optional)
    // playBackgroundMusic();
});

// Countdown Timer
function startCountdown() {
    const weddingDate = new Date('2026-03-15T08:00:00').getTime();

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
        }
    }, 1000);
}

// Fade-in Animation on Scroll
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Copy to Clipboard
document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', function () {
        const textToCopy = this.getAttribute('data-copy');

        // Create temporary input
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Change button text temporarily
        const originalText = this.textContent;
        this.textContent = 'Tersalin! ✓';
        this.style.background = '#4caf50';

        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// RSVP Form Submission
const rsvpForm = document.querySelector('.rsvp-form');
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: rsvpForm.querySelector('input').value,
        attendance: rsvpForm.querySelector('select:nth-of-type(1)').value,
        guests: rsvpForm.querySelector('select:nth-of-type(2)').value,
        message: rsvpForm.querySelector('textarea').value
    };

    // Here you would normally send this to a backend
    console.log('RSVP Data:', formData);

    // Add wish to the list
    addWishToList(formData);

    // Reset form
    rsvpForm.reset();

    // Show success message
    alert('Terima kasih! Ucapan Anda telah terkirim. 🎉');
});

// Add Wish to List
function addWishToList(data) {
    const wishesList = document.getElementById('wishesList');

    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card';
    wishCard.style.cssText = `
        background: var(--bg-light);
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        border-left: 4px solid var(--primary-color);
    `;

    const attendanceText = data.attendance === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir';
    const attendanceColor = data.attendance === 'hadir' ? '#4caf50' : '#f44336';

    wishCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <h4 style="color: var(--primary-color); margin: 0; font-size: 1.1rem;">${data.name}</h4>
            <span style="color: ${attendanceColor}; font-size: 0.9rem; font-weight: 600;">${attendanceText}</span>
        </div>
        <p style="color: var(--text-light); margin: 0.5rem 0; font-size: 0.85rem;">
            ${data.guests} orang
        </p>
        <p style="color: var(--text-dark); margin: 0; line-height: 1.6;">
            ${data.message}
        </p>
    `;

    // Insert at the beginning
    wishesList.insertBefore(wishCard, wishesList.firstChild);
}

// Music Control
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Note: You would need to add an actual audio file
// const backgroundMusic = new Audio('path-to-your-music.mp3');
// backgroundMusic.loop = true;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        // backgroundMusic.pause();
        musicToggle.querySelector('.music-icon').textContent = '🔇';
        isPlaying = false;
    } else {
        // backgroundMusic.play();
        musicToggle.querySelector('.music-icon').textContent = '🎵';
        isPlaying = true;
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-section, .verse-section');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.backgroundPositionY = -(scrolled * speed) + 'px';
    });
});

// Initialize on page load
window.addEventListener('load', () => {
    getGuestName();
});

// Prevent right-click (optional, for protecting images)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Add sample wishes for demonstration
function addSampleWishes() {
    const sampleWishes = [
        {
            name: 'Keluarga Besar Ahmad',
            attendance: 'hadir',
            guests: '5 orang',
            message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallah! 💐'
        },
        {
            name: 'Teman Kuliah',
            attendance: 'hadir',
            guests: '2 orang',
            message: 'Congratulations! Wishing you both a lifetime of love and happiness! 🎉'
        },
        {
            name: 'Sahabat SMA',
            attendance: 'tidak-hadir',
            guests: '1 orang',
            message: 'Maaf tidak bisa hadir. Semoga lancar acaranya dan bahagia selalu! ❤️'
        }
    ];

    // Add sample wishes after a delay
    setTimeout(() => {
        sampleWishes.forEach(wish => {
            addWishToList(wish);
        });
    }, 1000);
}

// Uncomment to show sample wishes
// addSampleWishes();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Auto-scroll to top on page refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);