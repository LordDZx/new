document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const icon = document.getElementById('icon');
    const themeText = document.getElementById('theme-text');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        icon.src = 'img/moon.png';
        themeText.textContent = 'الوضع الليلي';
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        icon.src = 'img/sun.png';
        themeText.textContent = 'الوضع النهاري';
    }

    toggleButton.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            icon.src = '/img/sun.png';
            themeText.textContent = 'الوضع النهاري';
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            icon.src = '/img/moon.png';
            themeText.textContent = 'الوضع الليلي';
        }
    });

    document.querySelectorAll('.news-item').forEach(item => {
        const date = item.getAttribute('data-date');
        const formattedDate = new Date(date).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        item.querySelector('.date').textContent = `تاريخ الإضافة: ${formattedDate}`;
    });
});
