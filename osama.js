const langToggleBtn = document.getElementById('lang-toggle');
const themeToggleBtn = document.getElementById('theme-toggle');
const contentEn = document.getElementById('content-en');
const contentAr = document.getElementById('content-ar');
const backToTopBtn = document.getElementById('backToTopBtn');

function setLanguage(lang) {
    contentEn.classList.remove('active');
    contentAr.classList.remove('active');

    setTimeout(() => {
        if (lang === 'ar') {
            contentEn.style.display = 'none';
            contentAr.style.display = 'block';
            setTimeout(() => contentAr.classList.add('active'), 10);
            langToggleBtn.innerHTML = '<i class="fas fa-language"></i>';
            document.body.dir = 'rtl';
            localStorage.setItem('language', 'ar');
        } else {
            contentAr.style.display = 'none';
            contentEn.style.display = 'block';
            setTimeout(() => contentEn.classList.add('active'), 10);
            langToggleBtn.innerHTML = '<i class="fas fa-language"></i>';
            document.body.dir = 'ltr';
            localStorage.setItem('language', 'en');
        }
    }, 0);
}

const savedLang = localStorage.getItem('language');
if (savedLang) {
    if (savedLang === 'ar') {
        contentEn.style.display = 'none';
        contentAr.style.display = 'block';
        contentAr.classList.add('active');
        langToggleBtn.innerHTML = '<i class="fas fa-language"></i>';
        document.body.dir = 'rtl';
    } else {
        contentEn.style.display = 'block';
        contentAr.style.display = 'none';
        contentEn.classList.add('active');
        langToggleBtn.innerHTML = '<i class="fas fa-language"></i>';
        document.body.dir = 'ltr';
    }
} else {
    contentEn.style.display = 'block';
    contentEn.classList.add('active');
    contentAr.style.display = 'none';
    document.body.dir = 'ltr';
    langToggleBtn.innerHTML = '<i class="fas fa-language"></i>';
    localStorage.setItem('language', 'en');
}

langToggleBtn.addEventListener('click', () => {
    if (contentEn.style.display === 'block') {
        setLanguage('ar');
    } else {
        setLanguage('en');
    }
});

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    themeToggleBtn.innerHTML = currentTheme === 'dark-mode' ? '☀️' : '🌙';
} else {
    document.body.classList.add('light-mode');
    themeToggleBtn.innerHTML = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    let theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    themeToggleBtn.innerHTML = theme === 'dark-mode' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
});

if (window.scrollY > 50) {
    langToggleBtn.style.display = 'none';
    themeToggleBtn.style.display = 'none';
} else {
    langToggleBtn.style.display = 'flex';
    themeToggleBtn.style.display = 'flex';
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }

    if (window.scrollY < 50) {
        langToggleBtn.style.display = 'flex';
        themeToggleBtn.style.display = 'flex';
    } else {
        langToggleBtn.style.display = 'none';
        themeToggleBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});