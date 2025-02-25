// حركة العناصر عند التمرير
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});


// 1. تأثير التمرير Parallax
document.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        const scrolled = window.scrollY;
        parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// 2. تأثير الرسوم المتحركة على التمرير (Scroll Animation)
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    elements.forEach(el => {
        observer.observe(el);
    });
});

// 3. إضافة تأثيرات عند النقر (Click Effects)
document.querySelectorAll('.click-effect').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300); // إزالة التأثير بعد 300 مللي ثانية
    });
});

// 4. تحريك العناصر باستخدام الـ Drag and Drop
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
});

document.querySelector('.drop-zone').addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.querySelector('.drop-zone').addEventListener('drop', function(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(id);
    this.appendChild(draggedElement);
});

// 5. تأثير عرض شرائح الصور (Image Slider)
let index = 0;
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (n >= slides.length) index = 0;
    if (n < 0) index = slides.length - 1;
    slides.forEach(slide => slide.style.display = 'none');
    slides[index].style.display = 'block';
}
document.querySelector('.prev').addEventListener('click', () => showSlide(--index));
document.querySelector('.next').addEventListener('click', () => showSlide(++index));
showSlide(index);

// 6. إنشاء قائمة تنقل منسدلة (Dropdown Menu)
document.querySelectorAll('.dropdown').forEach(menu => {
    menu.addEventListener('mouseover', function() {
        this.querySelector('.dropdown-content').style.display = 'block';
    });
    menu.addEventListener('mouseout', function() {
        this.querySelector('.dropdown-content').style.display = 'none';
    });
});

// 7. تأثيرات الكتابة المتحركة (Typing Effect)
function typeEffect(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
const typeElement = document.querySelector('.typewriter');
if (typeElement) {
    typeEffect(typeElement, 'مرحبا بكم في موقعنا!', 100);
}

// 8. تأثير الانتقال السلس للروابط (Smooth Scrolling)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 9. عرض إشعارات (Notifications)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000); // يظهر الإشعار لمدة 3 ثواني
}
showNotification('مرحبا! هذه رسالة إشعار.');

// 10. عرض تفاصيل عند التمرير فوق (Tooltip)
document.querySelectorAll('.tooltip').forEach(item => {
    item.addEventListener('mouseover', function() {
        this.querySelector('.tooltip-text').style.visibility = 'visible';
    });
    item.addEventListener('mouseout', function() {
        this.querySelector('.tooltip-text').style.visibility = 'hidden';
    });
});
