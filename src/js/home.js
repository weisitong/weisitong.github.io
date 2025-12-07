// Home page specific JavaScript

// SEO优化：动态生成热卖型号的结构化数据
function generateHotModelsStructuredData() {
    const currentLang = window.currentLang || 'en';
    
    // 生成产品列表结构化数据
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": currentLang === 'en' ? "Hot Selling Electronic Components" : "热卖电子元器件型号",
        "description": currentLang === 'en' ? 
            "Popular electronic components models from leading manufacturers like Murata, Yageo, TDK, Samsung, Taiyo Yuden" : 
            "来自村田、国巨、TDK、三星、太阳诱电等知名制造商的热门电子元器件型号",
        "numberOfItems": hotSellingModels.length,
        "itemListElement": hotSellingModels.map((model, index) => ({
            "@type": "Product",
            "position": index + 1,
            "name": model.model,
            "brand": {
                "@type": "Brand",
                "name": currentLang === 'en' ? model.brand_en : model.brand_zh,
                "alternateName": currentLang === 'en' ? model.brand_zh : model.brand_en
            },
            "category": currentLang === 'en' ? model.category_en : model.category_zh,
            "description": `${model.specs} - ${currentLang === 'en' ? model.feature_en : model.feature_zh}`,
            "manufacturer": {
                "@type": "Organization",
                "name": currentLang === 'en' ? model.brand_en : model.brand_zh
            },
            "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "纬思通科技",
                    "alternateName": "Weyston Technology"
                }
            }
        }))
    };
    
    // 更新或创建结构化数据脚本
    let structuredDataScript = document.getElementById('hot-models-structured-data');
    if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'hot-models-structured-data';
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData, null, 2);
}

// SEO优化：动态生成热卖型号的meta关键词
function generateHotModelsMetaKeywords() {
    const currentLang = window.currentLang || 'en';
    
    // 提取所有品牌和型号
    const brands = [...new Set(hotSellingModels.map(model => 
        currentLang === 'en' ? model.brand_en : model.brand_zh
    ))];
    const models = hotSellingModels.map(model => model.model);
    const categories = [...new Set(hotSellingModels.map(model => 
        currentLang === 'en' ? model.category_en : model.category_zh
    ))];
    
    // 生成关键词
    const baseKeywords = currentLang === 'en' ? [
        'hot selling electronic components',
        'popular electronic parts',
        'in stock components',
        'authentic electronic components',
        'authorized distributor',
        'electronic components supplier'
    ] : [
        '热卖电子元器件',
        '热门电子元件',
        '现货元器件',
        '正品电子元器件',
        '授权代理商',
        '电子元器件供应商'
    ];
    
    const brandKeywords = brands.flatMap(brand => [
        `${brand}代理`,
        `${brand}分销`,
        `${brand}授权`,
        `${brand} distributor`,
        `${brand} authorized`
    ]);
    
    const modelKeywords = models;
    const categoryKeywords = categories;
    
    const allKeywords = [
        ...baseKeywords,
        ...brandKeywords,
        ...modelKeywords,
        ...categoryKeywords
    ].join(',');
    
    // 更新或创建meta关键词标签
    let metaKeywords = document.querySelector('meta[name="keywords"][id="hot-models-keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.id = 'hot-models-keywords';
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = allKeywords;
}

// SEO优化：生成隐藏的热卖型号文本内容
function generateHiddenSEOContent() {
    const currentLang = window.currentLang || 'en';
    
    // 创建隐藏的SEO内容容器
    let seoContainer = document.getElementById('hidden-seo-content');
    if (!seoContainer) {
        seoContainer = document.createElement('div');
        seoContainer.id = 'hidden-seo-content';
        seoContainer.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;';
        document.body.appendChild(seoContainer);
    }
    
    // 生成SEO友好的文本内容
    const seoText = hotSellingModels.map(model => {
        const brand = currentLang === 'en' ? model.brand_en : model.brand_zh;
        const category = currentLang === 'en' ? model.category_en : model.category_zh;
        const feature = currentLang === 'en' ? model.feature_en : model.feature_zh;
        
        return currentLang === 'en' ? 
            `${brand} ${model.model} ${category} ${model.specs} ${feature} authentic components authorized distributor in stock fast delivery` :
            `${brand} ${model.model} ${category} ${model.specs} ${feature} 正品元器件 授权代理商 现货供应 快速交付`;
    }).join(' ');
    
    // 添加通用SEO文本
    const generalSEOText = currentLang === 'en' ? 
        'Electronic components distributor Murata Yageo TDK Samsung Taiyo Yuden Epson UNI-ROYAL authorized dealer authentic parts in stock fast shipping worldwide' :
        '电子元器件代理商 村田 国巨 TDK 三星 太阳诱电 爱普生 厚声 授权经销商 正品元件 现货库存 快速发货 全球服务';
    
    seoContainer.innerHTML = `
        <h2>${currentLang === 'en' ? 'Hot Selling Electronic Components Models' : '热卖电子元器件型号'}</h2>
        <p>${seoText}</p>
        <p>${generalSEOText}</p>
    `;
}

// Hot selling models data
const hotSellingModels = [
    {
        brand_en: "Murata",
        brand_zh: "村田",
        category_en: "MLCC Capacitor",
        category_zh: "多层陶瓷电容",
        model: "GRM188R71H104KA93D",
        specs: "0603, 100nF, 50V, X7R",
        feature_en: "High reliability, automotive grade",
        feature_zh: "高可靠性，车规级",
        icon: "fas fa-battery-half"
    },
    {
        brand_en: "Yageo",
        brand_zh: "国巨",
        category_en: "Chip Resistor",
        category_zh: "贴片电阻",
        model: "RC0603FR-0710KL",
        specs: "0603, 10KΩ, ±1%, 1/10W",
        feature_en: "Precision, low noise",
        feature_zh: "精密，低噪声",
        icon: "fas fa-bolt"
    },
    {
        brand_en: "Taiyo Yuden",
        brand_zh: "太阳诱电 太诱",
        category_en: "MLCC Capacitor",
        category_zh: "多层陶瓷电容",
        model: "JDK063BBJ225MP-F",
        specs: "0201 225 6.3V X5R",
        feature_en: "Best price, authorized channel, stable supply",
        feature_zh: "价格最优 代理渠道 供应稳定",
        icon: "fas fa-battery-half"
    },
    {
        brand_en: "Taiyo Yuden",
        brand_zh: "太阳诱电 太诱",
        category_en: "MLCC Capacitor",
        category_zh: "多层陶瓷电容",
        model: "LDK063BBJ225MPLF",
        specs: "0201 225 10V X5R",
        feature_en: "Best price, authorized channel, stable supply",
        feature_zh: "价格最优 代理渠道 供应稳定",
        icon: "fas fa-battery-half"
    },    {
        brand_en: "Taiyo Yuden",
        brand_zh: "太阳诱电 太诱",
        category_en: "MLCC Capacitor",
        category_zh: "多层陶瓷电容",
        model: "JMK063BC6105MP-F",
        specs: "0201 105 6.3V X6S",
        feature_en: "Best price, authorized channel, stable supply",
        feature_zh: "价格最优 代理渠道 供应稳定",
        icon: "fas fa-battery-half"
    },    {
        brand_en: "Taiyo Yuden",
        brand_zh: "太阳诱电 太诱",
        category_en: "MLCC Capacitor",
        category_zh: "多层陶瓷电容",
        model: "JMK105BC6475MV-F",
        specs: "0402 475 6.3V X6S",
        feature_en: "Best price, authorized channel, stable supply",
        feature_zh: "价格最优 代理渠道 供应稳定",
        icon: "fas fa-battery-half"
    },
    {
        brand_en: "TDK",
        brand_zh: "TDK",
        category_en: "Power Inductor",
        category_zh: "功率电感",
        model: "VLS6045EX-100M",
        specs: "6045, 10μH, 4.2A, 22mΩ",
        feature_en: "Low DCR, high current",
        feature_zh: "低直流电阻，大电流",
        icon: "fas fa-circle-notch"
    },
    {
        brand_en: "Epson",
        brand_zh: "爱普生",
        category_en: "Crystal",
        category_zh: "无源晶体",
        model: "FC-135 32.768KHZ",
        specs: "3.2×1.5mm, 32.768kHz, ±20ppm",
        feature_en: "Ultra-miniature, low power",
        feature_zh: "超小型，低功耗",
        icon: "fas fa-gem"
    },
    {
        brand_en: "Samsung",
        brand_zh: "三星",
        category_en: "MLCC Capacitor",
        category_zh: "多层陶瓷电容",
        model: "CL10B104KB8NNNC",
        specs: "0603, 100nF, 50V, X7R",
        feature_en: "High capacitance density",
        feature_zh: "高容量密度",
        icon: "fas fa-battery-half"
    },
    {
        brand_en: "UNI-ROYAL",
        brand_zh: "厚声",
        category_en: "Chip Resistor",
        category_zh: "贴片电阻",
        model: "0603WAF1002T5E",
        specs: "0603, 10KΩ, ±1%, 1/10W",
        feature_en: "High precision, stable",
        feature_zh: "高精度，稳定",
        icon: "fas fa-bolt"
    }
];

// 优化的热销型号生成函数
function generateHotModels() {
    const container = document.getElementById('hotModelsContainer');
    if (!container) return;
    
    const currentLang = window.currentLang || 'en';
    
    // 使用DocumentFragment优化性能
    const fragment = document.createDocumentFragment();
    
    hotSellingModels.forEach(model => {
        const div = document.createElement('div');
        div.className = 'bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow border-l-4 border-primary';
        
        div.innerHTML = `
            <div class="flex items-center mb-3">
                <div class="text-primary text-2xl mr-3">
                    <i class="${model.icon}"></i>
                </div>
                <div>
                    <div class="font-bold text-primary" data-en="${model.brand_en}" data-zh="${model.brand_zh}">
                        ${currentLang === 'en' ? model.brand_en : model.brand_zh}
                    </div>
                    <div class="text-sm text-accent" data-en="${model.category_en}" data-zh="${model.category_zh}">
                        ${currentLang === 'en' ? model.category_en : model.category_zh}
                    </div>
                </div>
            </div>
            <div class="text-lg font-bold mb-1">${model.model}</div>
            <div class="text-sm text-gray-600 mb-2">${model.specs}</div>
            <div class="text-xs text-accent" data-en="${model.feature_en}" data-zh="${model.feature_zh}">
                ${currentLang === 'en' ? model.feature_en : model.feature_zh}
            </div>
        `;
        
        fragment.appendChild(div);
    });
    
    // 一次性更新DOM
    container.innerHTML = '';
    container.appendChild(fragment);
    
    // 同步更新SEO优化内容
    generateHotModelsStructuredData();
    generateHotModelsMetaKeywords();
    generateHiddenSEOContent();
}

// 优化的首页初始化
function initializeHomePage() {
    // 使用requestAnimationFrame优化渲染
    requestAnimationFrame(() => {
        generateHotModels();
    });
    
    // 监听语言变化事件
    document.addEventListener('languageChanged', function() {
        requestAnimationFrame(() => {
            generateHotModels();
        });
    });
}

// 优化的DOM就绪检测
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomePage, { once: true });
} else {
    initializeHomePage();
}
