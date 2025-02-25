// 1. منع كليك يمين
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// 2. منع اختصارات الكيبورد
document.addEventListener('keydown', (event) => {
    // منع F12
    if (event.key === 'F12') {
        event.preventDefault();
    }
    // منع Ctrl+Shift+I أو Ctrl+Shift+ي
    if (event.ctrlKey && event.shiftKey && (event.key.toLowerCase() === 'i' || event.key === 'ي')) {
        event.preventDefault();
    }
    // منع Ctrl+Shift+J
    if (event.ctrlKey && event.shiftKey && event.key === 'J') {
        event.preventDefault();
    }
    // منع Ctrl+Shift+C أو Ctrl+Shift+ؤ
    if (event.ctrlKey && event.shiftKey && (event.key.toLowerCase() === 'c' || event.key === 'ؤ')) {
        event.preventDefault();
    }
    // منع Ctrl+U أو Ctrl+ع
    if (event.ctrlKey && (event.key.toLowerCase() === 'u' || event.key === 'ع')) {
        event.preventDefault();
        alert("مش مسموح بمشاهدة الكود!");
    }
    // منع Ctrl+S أو Ctrl+س (لحظر حفظ الصفحة)
    if (event.ctrlKey && (event.key.toLowerCase() === 's' || event.key === 'س')) {
        event.preventDefault();
        alert("مش مسموح بحفظ الصفحة!");
    }
    // منع Ctrl+Shift+K
    if (event.ctrlKey && event.shiftKey && event.key === 'K') {
        event.preventDefault();
    }
});

// 3. تشويش على الكونسول
setInterval(() => {
    console.clear();
    console.log("%cإنت بتعمل إيه!؟", "color: red; font-size: 24px;");
}, 1000);

// 4. كود لمنع فتح DevTools عن طريق فحص حجم الشاشة
setInterval(() => {
    if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
        document.body.innerHTML = '<h1>ممنوع استخدام أدوات المطور!</h1>';
    }
}, 500);

// 5. تأكيد عمل السكريبت
console.log("%cتم تفعيل حماية أدوات المطور.", "color: green; font-size: 20px;");
