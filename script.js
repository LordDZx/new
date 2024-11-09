document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container');
    const tools = document.querySelectorAll('.tool');

    // إضافة تأثير الظهور عند تحميل الصفحة
    const revealContainer = () => {
        container.classList.add('visible');
    };

    // تفعيل التحريك عند تمرير الصفحة
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        tools.forEach(tool => {
            const toolTop = tool.getBoundingClientRect().top;
            const revealPoint = 150; // نقطة الظهور 

            if (toolTop < windowHeight - revealPoint) {
                tool.style.opacity = '1';
                tool.style.transform = 'translateY(0)';
            }
        });
    };

    // إضافة تأثير التحويم على الأدوات
    const addHoverEffects = () => {
        tools.forEach(tool => {
            tool.addEventListener('mouseover', () => {
                tool.style.opacity = '1';
                tool.style.transform = 'scale(1.05)';
            });

            tool.addEventListener('mouseout', () => {
                tool.style.opacity = '0.9';
                tool.style.transform = 'scale(1)';
            });
        });
    };

    // إضافة تأثير عند اقتراب المؤشر من الأزرار
    const addProximityEffect = () => {
        document.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            tools.forEach(tool => {
                const rect = tool.getBoundingClientRect();
                const toolCenterX = rect.left + rect.width / 2;
                const toolCenterY = rect.top + rect.height / 2;

                const distanceX = mouseX - toolCenterX;
                const distanceY = mouseY - toolCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                // إذا كانت المسافة أقل من 150px، قم بتكبير الزر
                const maxDistance = 150;
                if (distance < maxDistance) {
                    const scale = 1 + (1 - distance / maxDistance) * 0.1;
                    tool.style.transform = `scale(${scale})`;
                } else {
                    tool.style.transform = 'scale(1)';
                }
            });
        });
    };

    // استدعاء الوظائف
    revealContainer();
    window.addEventListener('scroll', revealOnScroll);
    addHoverEffects();
    addProximityEffect();
});
