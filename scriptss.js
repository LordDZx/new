document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleThemeButton');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;

    // Check localStorage for theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.classList.add('dark-mode');
        themeLabel.textContent = 'الوضع الفاتح';
    } else {
        body.classList.add('light-mode');
        toggleButton.classList.add('light-mode');
        themeLabel.textContent = 'الوضع الداكن';
    }

    toggleButton.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            toggleButton.classList.remove('light-mode');
            toggleButton.classList.add('dark-mode');
            themeLabel.textContent = 'الوضع الفاتح';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            toggleButton.classList.remove('dark-mode');
            toggleButton.classList.add('light-mode');
            themeLabel.textContent = 'الوضع الداكن';
            localStorage.setItem('theme', 'light');
        }
    });
});
