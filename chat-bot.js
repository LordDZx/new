let isChatbotOpen = false;

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    
    if (!isChatbotOpen) {
        chatbotWindow.style.display = 'block';
        simulateHelpCommand(); // Simulate the 'help' command
        isChatbotOpen = true;
    } else {
        chatbotWindow.style.display = 'none';
        clearChat(); // Clear chat when chatbot closes
        isChatbotOpen = false;
    }
}

function closeChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = 'none';
    clearChat(); // Clear chat when chatbot closes
    isChatbotOpen = false;
}

function sendMessage() {
    const input = document.getElementById('chatbot-input').value;
    if (input.trim()) {
        const message = input.trim();
        const chatbotBody = document.getElementById('chatbot-body');
        
        // Append user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.textContent = message;
        userMessageDiv.className = 'user-message';
        chatbotBody.appendChild(userMessageDiv);

        handleCommand(message);

        // Scroll to the bottom
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        
        // Clear input field
        document.getElementById('chatbot-input').value = '';
    }
}

function handleCommand(message) {
    const chatbotBody = document.getElementById('chatbot-body');
    let response = '';

    switch (message.toLowerCase()) {
        case 'help':
            response = 'قائمة الأوامر المتاحة: help, cost, smart, event, war, gge-bot, tips, contact-us, news';
            break;
        case 'cost':
            response = 'قائمه التكاليف هي قائمه ستساعدك في معرف تكاليف بناء المباني وتكاليف الياقوت و... تم الانتهاء منها وهي تعمل بكفائه ويتم تحديثها بأستمرار';
            break;
        case 'smart':
            response = 'اضافه الموقع ستساعد اللاعيبين المبتدئين والقدامي في اللعبه كثيرا وبها اضافات كثيره ومهمه وستفيد الكل علما هذه الاضافه تعمل بكامل كفائتها';
            break;
        case 'event':
            response = 'قائمه الاحداث  اضافه ستساعد اللاعيبين في تطوير انفسهم في الأحداث وستساعدهم في المنافسه وفهم اليه عمل الأحداث من المتوقع العمل عليها بعد الانتهاء من العمل علي خانه الحرب';
            break;
        case 'war':
            response = 'خانه الحرب اضافه ستساعدك في اتقان اساسيات والمساعده في فهم كيفيه عمل قاده وحكام في اللعبه وكيفيه فهم اساسيات الدفاع والهجوم';
            break;
        case 'gge-bot':
            response = 'عباره عن بوت أحداث للعبه تم انشائه من قبل صاحب الموقع (EL-Lord) لم يكتمل انشاء بوت الاحداث بعد وحاليا تم رفع الدعم عن تطوير هذا البوت';
            break;
        case 'tips':
            response = 'هذه الأضافه في الموقع لم تتم بعد ولم يتم العمل عليها حاليا. سيتم العمل عليها عندما ننتهي من باقي الأضافات قريبا';
            break;
        case 'news':
             response = 'اخر الأخبار اضافه تعرفك علي اخر تحديثاتنا في الموقع واخبار عن الاضافات الجديده للموقع لزياره الصفحه اضغط علي زر اخر الاخبار في الاعلي بجانب زر تواصل معنا او عبر هذا الرابط https://empire-wiki.netlify.app/news';
            break;
        
        case 'contact-us':
                response = 'نتعذر عن وجود اي اخطال للتواصل مع صاحب الموقع او التيم يرجي الضغط علي زر تواصل معنا او عبر نسخ ولصق هذا الرابط في صفحه ويب https://empire-wiki.netlify.app/contact-us ';
            break;

        default:
            response = 'هذا الأمر غير موجود للأستعلام عن الأوامر اكتب الأمر help.';
    }

    // Append bot response
    const responseDiv = document.createElement('div');
    responseDiv.textContent = response;
    responseDiv.className = 'bot-response';
    chatbotBody.appendChild(responseDiv);
}

function simulateHelpCommand() {
    sendMessage('help');
}

function clearChat() {
    const chatbotBody = document.getElementById('chatbot-body');
    chatbotBody.innerHTML = '';
}

// Add event listener for the Enter key
document.getElementById('chatbot-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default behavior (e.g., form submission)
        sendMessage();
    }
});
