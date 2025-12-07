// EmailJS configuration - encoded to prevent direct exposure
const emailConfigs = {
    general: {
        publicKey: atob("djZFUHh2UjctN09tdENVcGc="),
        serviceId: atob("d2V5c3Rvbg=="),
        templateId: atob("dGVtcGxhdGVfdjIybWR2Zg=="),
        toEmail: "inquiry@weyston.com"
    },
    quote: {
        publicKey: atob("VlpDYW9SSjY4OU5GZTFGb0c="),
        serviceId: atob("d2V5c3Rvbg=="),
        templateId: atob("dGVtcGxhdGVfNXZybWJjbg=="),
        toEmail: "sales@weyston.com"
    },
    support: {
        publicKey: atob("SVYwSDVXUGFaOHN4RWhncXU="),
        serviceId: atob("d2V5c3Rvbg=="),
        templateId: atob("dGVtcGxhdGVfajJnbWowcw=="),
        toEmail: "support@weyston.com"
    },
    job: {
        publicKey: atob("NEpLbEtPNHJ6V3dsR21iV18="),
        serviceId: atob("d2V5c3Rvbg=="),
        templateId: atob("dGVtcGxhdGVfbHIzcW1nbw=="),
        toEmail: "hr@weyston.com"
    },
    partnership: {
        publicKey: atob("TTFlY3VyWFRUZ1hfQ2x5V0g="),
        serviceId: atob("d2V5c3Rvbg=="),
        templateId: atob("dGVtcGxhdGVfZ2Q1azZzcg=="),
        toEmail: "info@weyston.com"
    }
};

// Export configuration getter
window.getEmailConfig = function(inquiryType) {
    return emailConfigs[inquiryType] || emailConfigs.general;
};