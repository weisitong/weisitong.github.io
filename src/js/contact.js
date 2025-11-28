// Contact page specific JavaScript

// EmailJS lazy loading for performance optimization
function loadEmailJS() {
    if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.async = true;
        document.head.appendChild(script);
    }
}

// Load EmailJS after page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(loadEmailJS, 100);
    });
} else {
    setTimeout(loadEmailJS, 100);
}

// Form elements translation handler
function updateFormElements() {
    const currentLang = window.currentLang || 'en';
    
    // Update select options
    document.querySelectorAll('select option[data-en][data-zh]').forEach(option => {
        const newText = option.getAttribute(`data-${currentLang}`);
        if (newText) {
            option.textContent = newText;
        }
    });
    
    // Update textarea placeholder
    const textarea = document.querySelector('textarea[data-en-placeholder][data-zh-placeholder]');
    if (textarea) {
        const newPlaceholder = textarea.getAttribute(`data-${currentLang}-placeholder`);
        if (newPlaceholder) {
            textarea.placeholder = newPlaceholder;
        }
    }
}

// Form validation
function validateForm(form) {
    const requiredFields = ['firstName', 'lastName', 'email', 'inquiryType', 'message'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Email sending functionality
function sendEmail(config, templateParams, form, submitBtn, originalText) {
    if (window.emailjs) {
        emailjs.send(config.serviceId, config.templateId, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                const currentLang = window.currentLang || 'en';
                showTopNotification('success', currentLang === 'en' ? 
                    'Thank you for your message! We will get back to you within 24 hours.' : 
                    '感谢您的留言！我们会在24小时内回复您。');
                
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                const currentLang = window.currentLang || 'en';
                showTopNotification('error', currentLang === 'en' ? 
                    'Sorry, there was an error sending your message. Please try again or contact us directly at inquiry@weyston.com' : 
                    '抱歉，发送消息时出现错误。请重试或直接联系我们：inquiry@weyston.com');
            })
            .finally(function() {
                // Restore button state
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                const btnTextElement = submitBtn.querySelector('.btn-text');
                if (btnTextElement) {
                    btnTextElement.textContent = originalText;
                }
                form.classList.remove('form-submitting');
            });
    } else {
        // EmailJS not loaded, retry
        setTimeout(() => sendEmail(config, templateParams, form, submitBtn, originalText), 100);
    }
}

// Form submission handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const inquiryType = formData.get('inquiryType');
    const currentLang = window.currentLang || 'en';
    
    // Validate form
    if (!validateForm(form)) {
        showTopNotification('error', currentLang === 'en' ? 'Please fill in all required fields.' : '请填写所有必填字段。');
        return;
    }
    
    // Get email configuration
    const config = window.getEmailConfig(inquiryType);
    
    // Initialize EmailJS
    emailjs.init(config.publicKey);
    
    // Prepare template parameters
    const templateParams = {
        to_email: config.toEmail,
        from_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        from_email: formData.get('email'),
        company: formData.get('company') || 'N/A',
        phone: formData.get('phone') || 'N/A',
        inquiry_type: form.querySelector('select option:checked').textContent,
        message: formData.get('message'),
        language: currentLang === 'en' ? 'English' : 'Chinese',
        submit_time: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Shanghai'
        })
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text') || submitBtn;
    const originalText = btnText.textContent;
    
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    
    if (!submitBtn.querySelector('.btn-text')) {
        submitBtn.innerHTML = `<span class="btn-text">${originalText}</span>`;
    }
    
    form.classList.add('form-submitting');
    
    // Send email
    sendEmail(config, templateParams, form, submitBtn, originalText);
}

// Notification functions
function showTopNotification(type, message) {
    const notification = document.getElementById('topNotification');
    const content = document.getElementById('notificationContent');
    
    notification.className = 'top-notification';
    
    if (type === 'success') {
        notification.classList.add('success');
        content.innerHTML = `<span class="success-icon">✓</span>${message}`;
    } else if (type === 'error') {
        notification.classList.add('error');
        content.innerHTML = `<span style="margin-right: 8px;">⚠</span>${message}`;
        
        setTimeout(() => {
            notification.classList.add('shake');
            setTimeout(() => {
                notification.classList.remove('shake');
            }, 500);
        }, 100);
    }
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        hideTopNotification();
    }, 8000);
}

function hideTopNotification() {
    const notification = document.getElementById('topNotification');
    notification.classList.remove('show');
}

// Initialize contact page
function initializeContactPage() {
    // Update form elements
    updateFormElements();
    
    // Add form submission handler
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
    
    // Listen for language changes
    document.addEventListener('languageChanged', updateFormElements);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContactPage);
} else {
    initializeContactPage();
}

// Export functions for global access
window.showTopNotification = showTopNotification;
window.hideTopNotification = hideTopNotification;