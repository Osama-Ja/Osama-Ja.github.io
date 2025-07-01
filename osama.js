// Language Toggle
const langToggleBtn = document.getElementById('lang-toggle');
const contentEn = document.getElementById('content-en');
const contentAr = document.getElementById('content-ar');

// Function to set language and handle transitions
function setLanguage(lang) {
    // Hide both initially for smooth transition
    contentEn.classList.remove('active');
    contentAr.classList.remove('active');

    // Timeout to allow opacity transition before display changes
    setTimeout(() => {
        if (lang === 'ar') {
            contentEn.style.display = 'none';
            contentAr.style.display = 'block';
            // Add active class after display block for fade-in
            setTimeout(() => contentAr.classList.add('active'), 10); // Small delay for reflow
            langToggleBtn.textContent = 'English';
            document.body.dir = 'rtl';
            localStorage.setItem('language', 'ar');
        } else { // 'en'
            contentAr.style.display = 'none';
            contentEn.style.display = 'block';
            // Add active class after display block for fade-in
            setTimeout(() => contentEn.classList.add('active'), 10); // Small delay for reflow
            langToggleBtn.textContent = 'عربي';
            document.body.dir = 'ltr';
            localStorage.setItem('language', 'en');
        }
    }, 0); // Start the process immediately
}

// Initialize with saved language or default to English
const savedLang = localStorage.getItem('language');
if (savedLang) {
    // Directly apply display property for initial load without transition delay
    if (savedLang === 'ar') {
        contentEn.style.display = 'none';
        contentAr.style.display = 'block';
        contentAr.classList.add('active');
        langToggleBtn.textContent = 'English';
        document.body.dir = 'rtl';
    } else { // savedLang === 'en'
        contentEn.style.display = 'block';
        contentAr.style.display = 'none';
        contentEn.classList.add('active');
        langToggleBtn.textContent = 'عربي';
        document.body.dir = 'ltr';
    }
} else {
    // Default to English if no preference saved
    contentEn.style.display = 'block';
    contentEn.classList.add('active'); // Ensure active on initial load
    contentAr.style.display = 'none';
    document.body.dir = 'ltr';
    langToggleBtn.textContent = 'عربي';
    localStorage.setItem('language', 'en'); // Save initial default
}

langToggleBtn.addEventListener('click', () => {
    // Check which content is currently active/visible to determine next language
    if (contentEn.style.display === 'block') { // Currently English, switch to Arabic
        setLanguage('ar');
    } else { // Currently Arabic, switch to English
        setLanguage('en');
    }
});

// Theme Toggle (with Local Storage persistence)
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Apply saved theme on page load
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggleBtn.textContent = '☀️ Light';
    } else {
        themeToggleBtn.textContent = '🌙 Dark';
    }
} else {
    // Default to light mode if no theme is saved
    document.body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌙 Dark';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    let theme = 'light-mode';
    if (document.body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '☀️ Light';
        theme = 'dark-mode';
    } else {
        themeToggleBtn.textContent = '🌙 Dark';
    }
    localStorage.setItem('theme', theme); // Save user's preference
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');

// *** تعديلات هنا لجعل أزرار التبديل تختفي عند التمرير لأسفل ***
// اخفاء الازرار عند التحميل إذا لم تكن في الأعلى
if (window.scrollY > 50) { // يمكن تعديل 50px كعتبة لإخفاء الأزرار
    langToggleBtn.style.display = 'none';
    themeToggleBtn.style.display = 'none';
} else {
    langToggleBtn.style.display = 'flex'; // استخدم flex لأنها كانت hidden في CSS
    themeToggleBtn.style.display = 'flex';
}

// Show/hide buttons based on scroll position
window.addEventListener('scroll', () => {
    // Show/hide Back to Top button
    if (window.scrollY > 300) { // Show button after scrolling 300px
        backToTopBtn.style.display = 'flex'; // Use flex to center the icon
    } else {
        backToTopBtn.style.display = 'none';
    }

    // Show/hide Language and Theme toggle buttons
    // تظهر فقط عندما يكون المستخدم في أعلى الصفحة (مثلاً، أول 50 بكسل)
    if (window.scrollY < 50) { // إذا كان التمرير أقل من 50 بكسل من الأعلى
        langToggleBtn.style.display = 'flex';
        themeToggleBtn.style.display = 'flex';
    } else { // إذا كان المستخدم قد مرر لأسفل أكثر من 50 بكسل
        langToggleBtn.style.display = 'none';
        themeToggleBtn.style.display = 'none';
    }
});

// Scroll to top when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll animation
    });
});