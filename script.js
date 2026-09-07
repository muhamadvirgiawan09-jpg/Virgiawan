// ================= NAVBAR SCROLL =================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================= HAMBURGER MENU =================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ================= ACTIVE NAV LINK PADA SCROLL =================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ================= INTERSECTION OBSERVER UNTUK ANIMASI =================
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animasi hanya sekali
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => observer.observe(el));

// ================= LIGHTBOX =================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Data foto (digunakan untuk lightbox)
const fotoData = [
    { src: 'images/karya1.jpg', caption: 'Perspektif Bangunan — Gedung sekolah dari sudut pandang bawah' },
    { src: 'images/karya2.jpg', caption: 'Lingkungan Sekolah — Suasana keseharian di lingkungan sekolah' },
    { src: 'images/karya3.jpg', caption: 'Momen Candid — Momen spontan yang tertangkap kamera' },
    { src: 'images/karya4.jpg', caption: 'Alam dan Hutan — Keheningan alam yang menenangkan' },
    { src: 'images/karya5.jpg', caption: 'Senja — Langit jingga di penghujung hari' },
    { src: 'images/karya6.jpg', caption: 'Tanaman & Siluet — Bentuk siluet yang dramatis' },
    { src: 'images/karya7.jpg', caption: 'Bunga & Tetesan Air — Detail kecil yang sering terlewat' },
    { src: 'images/karya8.jpg', caption: 'Awan & Landscape — Bentang langit yang luas' },
];

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const data = fotoData[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.caption;
    lightboxCaption.textContent = data.caption;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + fotoData.length) % fotoData.length;
    updateLightbox();
}

function showNext() {
    currentIndex = (currentIndex + 1) % fotoData.length;
    updateLightbox();
}

// Event listener untuk portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const index = parseInt(item.getAttribute('data-index'));
        openLightbox(index);
    });
});

// Event listener untuk masonry items
document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
        const index = parseInt(item.getAttribute('data-index'));
        openLightbox(index);
    });
});

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Tutup lightbox dengan klik backdrop
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// ================= FALLBACK IMAGE HANDLER =================
// Jika gambar tidak ditemukan, ganti dengan placeholder
function handleImageError(img) {
    img.onerror = null;
    img.src = 'https://via.placeholder.com/600x400/1a2a1a/4ade80?text=Foto+Tidak+Ditemukan';
}

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        handleImageError(this);
    });
});

// ================= SMOOTH SCROLL FALLBACK =================
// (CSS scroll-behavior sudah aktif, tapi ini untuk browser lama)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight + 10;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});