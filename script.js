document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Theme toggle functionality
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌓';
    themeToggle.classList.add('theme-toggle');
    document.body.appendChild(themeToggle);

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        updateThemeToggleButton();
    }

    function updateThemeToggleButton() {
        themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌓';
    }

    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('touchend', function(e) {
        e.preventDefault();
        toggleTheme();
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeToggleButton();

    // Add hover effect to list items
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        });

        item.addEventListener('mouseleave', () => {
            item.style.color = '';
        });
    });

    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.background-animation').style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Add tilt effect to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const dx = x - xc;
            const dy = y - yc;
            
            section.style.transform = `perspective(1000px) rotateX(${dy / -20}deg) rotateY(${dx / 20}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        section.addEventListener('mouseleave', () => {
            section.style.transform = '';
        });
    });

    // Add typing effect to tagline
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // Photo slider functionality
    const viewPhotosBtn = document.getElementById('viewPhotosBtn');
    const photoSlider = document.getElementById('photoSlider');
    const sliderPhotos = document.querySelectorAll('.slider-photo');
    const closeBtn = document.querySelector('.slider-close');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');

    let currentPhotoIndex = 0;

    function updateSliderBackground() {
        const sliderBackground = document.querySelector('.slider-background');
        const currentPhoto = document.querySelector('.slider-photo.active');
        
        if (currentPhoto) {
            const img = new Image();
            img.src = currentPhoto.src;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 1;
                canvas.height = 1;
                ctx.drawImage(img, 0, 0, 1, 1);
                const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                sliderBackground.style.background = `linear-gradient(45deg, rgba(${r},${g},${b},0.3), var(--secondary-color))`;
            }
        }
    }

    function showPhoto(index) {
        sliderPhotos.forEach(photo => {
            photo.classList.remove('active');
            photo.style.opacity = 0;
        });
        sliderPhotos[index].classList.add('active');
        setTimeout(() => {
            sliderPhotos[index].style.opacity = 1;
        }, 50);
        updateSliderBackground();
    }

    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % sliderPhotos.length;
        showPhoto(currentPhotoIndex);
    }

    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + sliderPhotos.length) % sliderPhotos.length;
        showPhoto(currentPhotoIndex);
    }

    viewPhotosBtn.addEventListener('click', () => {
        photoSlider.classList.add('active');
        showPhoto(currentPhotoIndex);
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        photoSlider.classList.remove('active');
        document.body.style.overflow = '';
    });

    prevBtn.addEventListener('click', prevPhoto);
    nextBtn.addEventListener('click', nextPhoto);

    // Close slider when clicking outside the content
    photoSlider.addEventListener('click', (e) => {
        if (e.target === photoSlider) {
            photoSlider.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (photoSlider.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextPhoto();
            } else if (e.key === 'ArrowLeft') {
                prevPhoto();
            } else if (e.key === 'Escape') {
                photoSlider.classList.remove('active');
            }
        }
    });

    // Button animation
    function animateButton() {
        viewPhotosBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            viewPhotosBtn.style.transform = 'scale(1)';
        }, 200);
    }

    setInterval(animateButton, 3000);
});
