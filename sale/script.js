document.addEventListener("DOMContentLoaded", function() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeName = document.getElementById('theme-name');
    const body = document.body;

    // Load theme from localStorage
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
    body.classList.add(currentTheme);

    if (currentTheme === 'dark-mode') {
        themeIcon.src = 'Moon.png'; // تغيير الأيقونة حسب الوضع
        themeName.textContent = 'الوضع الليلي';
    } else if (currentTheme === 'light-mode') {
        themeIcon.src = 'Sun.png'; // تغيير الأيقونة حسب الوضع
        themeName.textContent = 'الوضع النهاري';
    }

    themeToggleButton.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            themeIcon.src = 'sun.png'; // تغيير الأيقونة حسب الوضع
            themeName.textContent = 'الوضع النهاري';
        } else if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeIcon.src = 'moon.png'; // تغيير الأيقونة حسب الوضع
            themeName.textContent = 'الوضع الليلي';
        }
    });

    window.openGallery = function(accountId, imageIndex) {
        const gallery = document.getElementById('image-gallery');
        const galleryImage = document.getElementById('gallery-image');
        // تعيين الصورة المرفقة في المعرض
        galleryImage.src = document.querySelector(`#account-${accountId} .image-thumbnails img:nth-child(${imageIndex + 1})`).src;
        gallery.style.display = 'flex';
    };

    window.closeGallery = function() {
        const gallery = document.getElementById('image-gallery');
        gallery.style.display = 'none';
    };

    window.changeImage = function(direction) {
        const galleryImage = document.getElementById('gallery-image');
        const currentSrc = galleryImage.src;
        const images = Array.from(document.querySelector(`#account-1 .image-thumbnails img`));
        const currentIndex = images.findIndex(img => img.src === currentSrc);

        if (direction === 'prev') {
            if (currentIndex === 0) return;
            galleryImage.src = images[currentIndex - 1].src;
        } else if (direction === 'next') {
            if (currentIndex === images.length - 1) return;
            galleryImage.src = images[currentIndex + 1].src;
        }
    };
});