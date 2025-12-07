// Common JavaScript functionality for all pages

// Global variables - 优先从localStorage获取语言设置
window.currentLang = localStorage.getItem('selectedLanguage') || 'en';

// 立即应用语言设置，防止闪烁
(function() {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        window.currentLang = savedLang;
        document.documentElement.lang = savedLang;
        
        // 立即应用语言到所有元素，防止闪烁
        if (document.readyState !== 'loading') {
            applyLanguageImmediately(savedLang);
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                applyLanguageImmediately(savedLang);
            });
        }
    }
})();

// 立即应用语言函数
function applyLanguageImmediately(lang) {
    // 批量更新所有元素，减少重绘
    const elements = document.querySelectorAll('[data-en][data-zh]');
    const fragment = document.createDocumentFragment();
    
    // 使用requestAnimationFrame优化性能
    requestAnimationFrame(() => {
        elements.forEach(element => {
            const newText = element.getAttribute(`data-${lang}`);
            if (newText && element.textContent !== newText) {
                element.textContent = newText;
            }
        });
        
        // 更新语言切换按钮
        updateLanguageButtons(lang);
        
        // 移除加载类，显示内容
        document.documentElement.classList.remove('lang-loading');
    });
}

// 更新语言按钮
function updateLanguageButtons(lang) {
    const langToggle = document.getElementById('langToggle');
    const mobileLangToggle = document.getElementById('mobileLangToggle');
    const toggleText = lang === 'en' ? '中文' : 'EN';
    
    if (langToggle && langToggle.textContent !== toggleText) {
        langToggle.textContent = toggleText;
    }
    if (mobileLangToggle && mobileLangToggle.textContent !== toggleText) {
        mobileLangToggle.textContent = toggleText;
    }
}

// 优化的语言切换功能
function switchLanguage() {
    const newLang = window.currentLang === 'en' ? 'zh' : 'en';
    
    // 立即更新全局变量
    window.currentLang = newLang;
    
    // 保存到localStorage
    localStorage.setItem('selectedLanguage', newLang);
    
    // 批量更新DOM，减少重绘
    const elements = document.querySelectorAll('[data-en][data-zh]');
    
    // 使用DocumentFragment优化性能
    requestAnimationFrame(() => {
        elements.forEach(element => {
            const newText = element.getAttribute(`data-${newLang}`);
            if (newText) {
                element.textContent = newText;
            }
        });
        
        // 更新语言按钮
        updateLanguageButtons(newLang);
        
        // 更新HTML lang属性
        document.documentElement.lang = newLang;
        
        // 触发自定义事件
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { lang: newLang } 
        }));
    });
}

// 优化的语言应用函数
function applySavedLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && savedLang !== 'en') {
        window.currentLang = savedLang;
        applyLanguageImmediately(savedLang);
    } else {
        // 即使是英文也要移除加载类
        document.documentElement.classList.remove('lang-loading');
    }
}

// 优化的移动菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // 使用事件委托优化性能
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        
        // 优化菜单项点击处理
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('mobile-menu-item')) {
                mobileMenu.classList.add('hidden');
            }
        });
        
        // 优化外部点击处理
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        }, { passive: true });
    }
}

// 优化的语言切换初始化
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    const mobileLangToggle = document.getElementById('mobileLangToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchLanguage();
        });
    }
    
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchLanguage();
            
            // 隐藏移动菜单
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// 优化的初始化函数
function initializeCommon() {
    // 首先应用保存的语言
    applySavedLanguage();
    
    // 初始化移动菜单
    initMobileMenu();
    
    // 初始化语言切换
    initLanguageToggle();
    
    // 平滑滚动（仅限同页面锚点）
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }, { passive: false });
}

// 使用更高效的DOM就绪检测
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommon, { once: true });
} else {
    // DOM已经就绪，立即执行
    initializeCommon();
}

// 导出函数供全局访问
window.switchLanguage = switchLanguage;
window.applySavedLanguage = applySavedLanguage;
window.initMobileMenu = initMobileMenu;
window.initLanguageToggle = initLanguageToggle;