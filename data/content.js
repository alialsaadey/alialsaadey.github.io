/* ==========================================================================
   ملف المحتوى المركزي — عدّل النصوص والخدمات والأعمال ووسائل التواصل من هنا فقط.
   Central content file — edit texts, services, works and contact links here.

   قواعد سريعة:
   - أي حقل يُترك فارغاً ('' أو []) يُخفى مكانه تلقائياً من الموقع.
   - الهاتف: اكتبه بالصيغة المحلية (07…) وبالصيغة الدولية بلا + في phoneIntl.
   - بعد التعديل افتح الموقع مباشرة، ولا تحتاج لأي أداة بناء.
     (اختياري: node build.mjs لتحديث النسخة الثابتة وبيانات SEO داخل index.html)
   ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SITE_DATA = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  return {
    /* ---------- بيانات التواصل (مشتركة بين اللغتين) ---------- */
    contact: {
      phone: '07771313149',
      phoneDisplay: '0777 131 3149',
      phoneIntl: '9647771313149', // بدون + وبدون أصفار — يُستخدم للاتصال وواتساب
      email: 'ali.alsaade.sm@gmail.com',
      instagram: '', // مثال: 'https://instagram.com/اسم_الحساب'
      tiktok: '',    // مثال: 'https://www.tiktok.com/@اسم_الحساب'
      facebook: '',
      cv: ''         // مثال: 'assets/cv.pdf' — يظهر زر السيرة الذاتية عند وضع مسار الملف
    },

    /* ---------- التصنيفات ---------- */
    serviceCats: [
      { id: 'visual',    ar: 'الإنتاج البصري',     en: 'Visual production' },
      { id: 'marketing', ar: 'الترويج والإدارة',   en: 'Promotion & management' }
    ],
    workCats: [
      { id: 'photo',  ar: 'تصوير إعلاني',          en: 'Ad photography' },
      { id: 'video',  ar: 'فيديو ومونتاج',          en: 'Video & editing' },
      { id: 'motion', ar: 'موشن جرافيك',           en: 'Motion graphics' },
      { id: 'ai',     ar: 'ذكاء اصطناعي',          en: 'AI content' },
      { id: 'design', ar: 'تصميم',                 en: 'Design' }
    ],

    /* ---------- الخدمات (من السيرة الذاتية) ---------- */
    services: [
      {
        id: 'photo', cat: 'visual', icon: 'camera',
        ar: {
          title: 'تصوير إعلاني',
          desc: 'تصوير فوتوغرافي وفيديو للمنتجات والعلامات والمشاريع.',
          long: 'تصوير إعلاني يُبنى على هدف واضح لعلامتك، سواء كان منتجاً أو مشروعاً أو هوية تجارية، بصور وفيديوهات تُظهر التفاصيل وتناسب منصات العرض التي ستُنشر عليها.',
          points: ['تصوير فوتوغرافي للمنتجات والعلامات التجارية', 'تصوير فيديو إعلاني للمشاريع', 'مراعاة هدف الحملة ومنصة النشر قبل التصوير']
        },
        en: {
          title: 'Advertising photography',
          desc: 'Photo and video shooting for products, brands and projects.',
          long: 'Commercial photography built around a clear goal for your brand — a product, a project or a business identity — with images and footage that show the details and suit the platforms they will run on.',
          points: ['Product and brand photography', 'Promotional video for projects', 'Campaign goal and platform considered before the shoot']
        }
      },
      {
        id: 'editing', cat: 'visual', icon: 'scissors',
        ar: {
          title: 'مونتاج احترافي',
          desc: 'إيقاع بصري وصوتي يناسب كل منصة.',
          long: 'مونتاج يعطي المحتوى إيقاعاً بصرياً وصوتياً مناسباً لطبيعة كل منصة، باستخدام Adobe Premiere Pro وCapCut، من الفيديو الإعلاني القصير إلى المحتوى الأطول.',
          points: ['مونتاج بـ Adobe Premiere Pro وCapCut', 'إيقاع بصري وصوتي يناسب المنصة', 'تجهيز الفيديو بالقياسات المناسبة للنشر']
        },
        en: {
          title: 'Professional video editing',
          desc: 'Visual and audio rhythm tailored to every platform.',
          long: 'Editing that gives your content the visual and sound rhythm each platform calls for, using Adobe Premiere Pro and CapCut — from short promotional clips to longer content.',
          points: ['Editing in Adobe Premiere Pro and CapCut', 'Visual and audio rhythm suited to the platform', 'Videos prepared in the right formats for publishing']
        }
      },
      {
        id: 'motion', cat: 'visual', icon: 'cube',
        ar: {
          title: 'موشن جرافيك',
          desc: 'مؤثرات وحركة تصنع الفرق عبر After Effects.',
          long: 'عناصر حركية ومؤثرات بصرية تُنفَّذ في Adobe After Effects لتوضيح الفكرة وإضافة طابع احترافي لمحتواك الإعلاني.',
          points: ['موشن جرافيك ومؤثرات بصرية بـ After Effects', 'حركة تدعم الرسالة الإعلانية', 'دمج الموشن مع الفيديو والمونتاج']
        },
        en: {
          title: 'Motion graphics',
          desc: 'Effects and motion that make the difference, built in After Effects.',
          long: 'Animated elements and visual effects created in Adobe After Effects to clarify the idea and give your advertising content a professional finish.',
          points: ['Motion graphics and effects in After Effects', 'Movement that supports the advertising message', 'Motion combined with video and editing']
        }
      },
      {
        id: 'ai', cat: 'visual', icon: 'chip',
        ar: {
          title: 'محتوى بالذكاء الاصطناعي',
          desc: 'صناعة مشاهد وفيديوهات مرئية بأحدث الأدوات.',
          long: 'صناعة مشاهد وفيديوهات مرئية بأدوات الذكاء الاصطناعي لتنفيذ أفكار يصعب أو يكلف تصويرها بالطرق التقليدية، مع توجيه إبداعي يخدم هوية العلامة.',
          points: ['مشاهد وفيديوهات مرئية بأدوات الذكاء الاصطناعي', 'تنفيذ أفكار إبداعية تناسب هوية العلامة', 'دمج المحتوى مع المونتاج والموشن']
        },
        en: {
          title: 'AI-generated content',
          desc: 'Visual scenes and videos made with the latest tools.',
          long: 'Visual scenes and videos created with AI tools to bring to life ideas that are hard or costly to shoot the traditional way, with creative direction that serves the brand identity.',
          points: ['Visual scenes and videos made with AI tools', 'Creative ideas that fit the brand identity', 'Content combined with editing and motion']
        }
      },
      {
        id: 'promo', cat: 'marketing', icon: 'megaphone',
        ar: {
          title: 'ترويج وإعلان',
          desc: 'على جميع منصات التواصل الاجتماعي.',
          long: 'ترويج وإعلان لعلامتك ومشروعك على منصات التواصل الاجتماعي، بمحتوى مرئي مصمم ليصل إلى الجمهور المناسب.',
          points: ['ترويج على جميع منصات التواصل الاجتماعي', 'محتوى إعلاني مرئي موجّه للجمهور المناسب', 'ربط المحتوى بهدف المشروع']
        },
        en: {
          title: 'Promotion & advertising',
          desc: 'Across all social media platforms.',
          long: 'Promotion and advertising for your brand and project on social media, with visual content designed to reach the right audience.',
          points: ['Promotion on all social media platforms', 'Visual ad content aimed at the right audience', 'Content tied to the project goal']
        }
      },
      {
        id: 'manage', cat: 'marketing', icon: 'layout',
        ar: {
          title: 'إدارة الأعمال والصفحات',
          desc: 'إدارة حضور البراند وصفحاته باحتراف.',
          long: 'إدارة حضور العلامة التجارية وصفحاتها على منصات التواصل بما يحافظ على هوية موحدة ومحتوى منتظم.',
          points: ['إدارة صفحات العلامة على منصات التواصل', 'الحفاظ على هوية بصرية متسقة', 'تنظيم المحتوى المنشور']
        },
        en: {
          title: 'Business & page management',
          desc: 'Managing your brand presence and pages professionally.',
          long: 'Managing your brand presence and its pages on social platforms, keeping a consistent identity and regular content.',
          points: ['Managing brand pages on social platforms', 'Keeping a consistent visual identity', 'Organising published content']
        }
      },
      {
        id: 'ideas', cat: 'marketing', icon: 'bulb',
        ar: {
          title: 'أفكار إبداعية ناجحة',
          desc: 'إنشاء أفكار وحملات تعزّز جمهورك وتنمّي أعمالك.',
          long: 'تطوير أفكار وحملات إبداعية تعزز جمهورك وتنمي أعمالك، تبدأ من فهم مشروعك وهدفه ثم تتحول إلى محتوى قابل للتنفيذ.',
          points: ['أفكار وحملات إبداعية لعلامتك', 'تحويل الفكرة إلى محتوى قابل للتنفيذ', 'التركيز على تعزيز الجمهور ونمو العمل']
        },
        en: {
          title: 'Creative ideas that work',
          desc: 'Ideas and campaigns that strengthen your audience and grow your business.',
          long: 'Developing creative ideas and campaigns that strengthen your audience and grow your business — starting from understanding your project and its goal, then turning it into content that can be produced.',
          points: ['Creative ideas and campaigns for your brand', 'Turning an idea into producible content', 'Focused on audience growth and business growth']
        }
      }
    ],

    /* ---------- معرض الأعمال ----------
       يبقى القسم مخفياً حتى تضيف أعمالاً هنا. مثال لعمل:
       {
         id: 'work-1', cat: 'photo', service: 'photo',
         type: 'image',                       // أو 'video'
         src: 'assets/works/work-1.webp',     // الصورة أو الفيديو
         thumb: 'assets/works/work-1-thumb.webp', // اختياري: صورة مصغرة
         poster: '',                          // للفيديو فقط: صورة الغلاف
         ratio: '4/5',                        // 4/5 للتصاميم، 9/16 للفيديو العمودي، 16/9 ...
         ar: { title: 'اسم المشروع', desc: 'وصف العمل', service: 'تصوير إعلاني' },
         en: { title: 'Project name', desc: 'Work description', service: 'Ad photography' }
       }
    */
    works: [],

    /* ---------- المهارات والأدوات (من السيرة الذاتية) ---------- */
    skills: [
      {
        ar: { title: 'برامج المونتاج والموشن', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'] },
        en: { title: 'Editing & motion software', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'] },
        latin: true
      },
      {
        ar: { title: 'الذكاء الاصطناعي', items: ['أدوات الذكاء الاصطناعي المرئي'] },
        en: { title: 'Artificial intelligence', items: ['Visual AI tools'] }
      },
      {
        ar: { title: 'المنصات', items: ['جميع منصات التواصل الاجتماعي'] },
        en: { title: 'Platforms', items: ['All social media platforms'] }
      },
      {
        ar: { title: 'مجالات العمل', items: ['تصوير إعلاني فوتوغرافي', 'تصوير فيديو', 'مونتاج', 'موشن جرافيك', 'محتوى بالذكاء الاصطناعي', 'ترويج وإعلان', 'إدارة الصفحات'] },
        en: { title: 'Fields of work', items: ['Advertising photography', 'Video shooting', 'Editing', 'Motion graphics', 'AI content', 'Promotion & ads', 'Page management'] }
      }
    ],

    /* ---------- أقسام اختيارية: تبقى مخفية حتى تُضاف بيانات حقيقية ---------- */
    experience: [],
    /* مثال: { ar:{role:'', org:'', period:'', desc:''}, en:{role:'', org:'', period:'', desc:''} } */
    courses: [],
    /* مثال: { ar:{title:'', audience:'', topics:['',''], mode:''}, en:{...} } */
    education: [],
    /* مثال: { ar:{title:'', org:'', year:''}, en:{...} } */

    /* ---------- النصوص ---------- */
    ar: {
      lang: 'ar', dir: 'rtl', switchLabel: 'English', switchTo: 'en',
      meta: {
        title: 'علي ناظم الساعدي | مصوّر إعلانات ومونتير وصانع محتوى مرئي — بغداد',
        description: 'علي ناظم محمد الساعدي، مصوّر إعلانات ومونتير وصانع محتوى مرئي في بغداد. تصوير إعلاني، مونتاج، موشن جرافيك، محتوى بالذكاء الاصطناعي، وترويج وإدارة صفحات للشركات والبراندات.'
      },
      brand: 'علي الساعدي',
      name: 'علي ناظم محمد الساعدي',
      nameEn: 'Ali Nazim Mohammed Al-Saadi',
      role: 'مصوّر إعلانات · مونتير · صانع محتوى مرئي',
      eyebrow: 'بغداد · العراق',
      tagline: 'أحوّل فكرة علامتك التجارية إلى محتوى مرئي يلفت الانتباه ويبني الثقة، من التصوير الإعلاني والمونتاج إلى الموشن جرافيك والمحتوى بالذكاء الاصطناعي، لأصحاب الشركات والمشاريع والبراندات داخل العراق وخارجه.',
      tags: ['تصوير إعلاني', 'مونتاج احترافي', 'موشن جرافيك', 'محتوى بالذكاء الاصطناعي', 'ترويج وإدارة صفحات'],
      location: 'بغداد، العراق',
      center: 'رمز التقدم',
      ui: {
        skip: 'الانتقال إلى المحتوى',
        nav: { about: 'نبذة عني', services: 'خدماتي', works: 'أعمالي', skills: 'المهارات', experience: 'الخبرة', courses: 'الدورات', education: 'التعليم', contact: 'تواصل' },
        menu: 'القائمة', closeMenu: 'إغلاق القائمة', mainNav: 'التنقل الرئيسي',
        cv: 'السيرة الذاتية',
        heroWorks: 'استعرض أعمالي', heroServices: 'استعرض خدماتي', heroContact: 'تواصل معي',
        aboutEyebrow: 'من أنا', aboutTitle: 'نبذة عني',
        aboutP1: 'أعمل على تحويل فكرة العلامة التجارية إلى محتوى مرئي يلفت الانتباه ويبني الثقة ويحقق انتشاراً حقيقياً. أجمع بين التصوير الإعلاني الفوتوغرافي والفيديو، والمونتاج والموشن جرافيك، وصناعة المحتوى بالذكاء الاصطناعي، مع خبرة في الترويج وإدارة الصفحات على جميع منصات التواصل الاجتماعي.',
        aboutP2: 'أبدأ من هدف المشروع وجمهوره، ثم أبني المحتوى بجودة سينمائية من التصوير حتى المونتاج، لأصحاب الشركات والمشاريع والبراندات داخل العراق وخارجه.',
        diffTitle: 'ما يميّز عملي',
        diff: ['محتوى مبني على هدف تسويقي واضح', 'جودة سينمائية من التصوير حتى المونتاج', 'خدمات للشركات والبراندات داخل العراق وخارجه'],
        focusTitle: 'مجالات التخصص',
        focus: ['التصوير الإعلاني للمنتجات والعلامات', 'المونتاج والموشن جرافيك', 'صناعة المحتوى بالذكاء الاصطناعي', 'الترويج وإدارة الصفحات'],
        centerLabel: 'المركز',
        servicesEyebrow: 'ماذا أقدّم', servicesTitle: 'خدماتي',
        servicesSub: 'خدمات متكاملة تغطي الفكرة والتنفيذ والنشر، لتصل علامتك بالشكل الذي تستحقه.',
        all: 'الكل', details: 'التفاصيل والأعمال', detailsOnly: 'التفاصيل',
        whatIncluded: 'ما تشمله الخدمة', relatedWorks: 'أعمال مرتبطة', inquire: 'استفسر عن هذه الخدمة',
        worksEyebrow: 'نماذج منفذة', worksTitle: 'معرض الأعمال', worksSub: 'مختارات من الصور والفيديوهات التي نفذتها.',
        workService: 'الخدمة', viewWork: 'عرض العمل', playVideo: 'تشغيل الفيديو',
        skillsEyebrow: 'الأدوات', skillsTitle: 'المهارات والأدوات',
        skillsSub: 'البرامج والمنصات التي أعتمد عليها في التنفيذ.',
        experienceEyebrow: 'المسيرة', experienceTitle: 'الخبرة والمسيرة المهنية',
        coursesEyebrow: 'التدريب', coursesTitle: 'الدورات والتدريب',
        courseAudience: 'الفئة المستهدفة', courseTopics: 'المحاور', courseMode: 'طريقة الحضور', courseInquire: 'استفسر عن الدورة',
        educationEyebrow: 'المؤهلات', educationTitle: 'التعليم والشهادات',
        contactEyebrow: 'لنبدأ', contactTitle: 'جاهز لنقل علامتك إلى حضور مرئي أقوى؟',
        contactSub: 'تواصل معي لبدء مشروعك. اكتب لي عن فكرتك أو خدمتك، وسأرد عليك بأقرب وقت.',
        whatsapp: 'واتساب', call: 'اتصال هاتفي', email: 'البريد الإلكتروني', instagram: 'انستغرام', tiktok: 'تيك توك', facebook: 'فيسبوك',
        location: 'الموقع', startProject: 'تواصل معي لبدء مشروعك',
        waGeneral: 'مرحباً علي، أود الاستفسار عن مشروع.',
        waService: 'مرحباً علي، أود الاستفسار عن خدمة: ',
        waCourse: 'مرحباً علي، أود الاستفسار عن دورة: ',
        footerLinks: 'روابط سريعة', rights: 'جميع الحقوق محفوظة', top: 'العودة إلى الأعلى',
        close: 'إغلاق', prev: 'السابق', next: 'التالي'
      }
    },

    en: {
      lang: 'en', dir: 'ltr', switchLabel: 'عربي', switchTo: 'ar',
      meta: {
        title: 'Ali Nazim Al-Saadi | Advertising Photographer, Video Editor & Visual Content Creator — Baghdad',
        description: 'Ali Nazim Mohammed Al-Saadi — advertising photographer, video editor and visual content creator in Baghdad. Ad photography, editing, motion graphics, AI content, promotion and page management for companies and brands.'
      },
      brand: 'Ali Al-Saadi',
      name: 'Ali Nazim Mohammed Al-Saadi',
      nameEn: 'علي ناظم محمد الساعدي',
      role: 'Advertising photographer · Video editor · Visual content creator',
      eyebrow: 'Baghdad · Iraq',
      tagline: 'I turn your brand idea into visual content that earns attention and builds trust — from advertising photography and editing to motion graphics and AI-made content — for business owners, projects and brands in Iraq and abroad.',
      tags: ['Ad photography', 'Professional editing', 'Motion graphics', 'AI content', 'Promotion & page management'],
      location: 'Baghdad, Iraq',
      center: 'Ramz Al-Taqaddum',
      ui: {
        skip: 'Skip to content',
        nav: { about: 'About', services: 'Services', works: 'Works', skills: 'Skills', experience: 'Experience', courses: 'Courses', education: 'Education', contact: 'Contact' },
        menu: 'Menu', closeMenu: 'Close menu', mainNav: 'Main navigation',
        cv: 'Résumé',
        heroWorks: 'View my work', heroServices: 'View my services', heroContact: 'Contact me',
        aboutEyebrow: 'Who I am', aboutTitle: 'About me',
        aboutP1: 'I turn a brand idea into visual content that grabs attention, builds trust and spreads for real. I combine advertising photography and video, editing and motion graphics, and AI-made content, with experience in promotion and page management across all social media platforms.',
        aboutP2: 'I start from the project’s goal and audience, then build the content with cinematic quality from the shoot to the final edit — for companies, projects and brands in Iraq and abroad.',
        diffTitle: 'What sets my work apart',
        diff: ['Content built on a clear marketing goal', 'Cinematic quality from shooting to editing', 'Services for companies and brands in Iraq and abroad'],
        focusTitle: 'Areas of focus',
        focus: ['Advertising photography for products and brands', 'Editing and motion graphics', 'AI-powered content creation', 'Promotion and page management'],
        centerLabel: 'Center',
        servicesEyebrow: 'What I offer', servicesTitle: 'My services',
        servicesSub: 'Complete services covering the idea, the production and the publishing, so your brand arrives the way it deserves.',
        all: 'All', details: 'Details & works', detailsOnly: 'Details',
        whatIncluded: 'What the service includes', relatedWorks: 'Related works', inquire: 'Ask about this service',
        worksEyebrow: 'Selected projects', worksTitle: 'Portfolio', worksSub: 'A selection of the images and videos I have produced.',
        workService: 'Service', viewWork: 'View work', playVideo: 'Play video',
        skillsEyebrow: 'Toolkit', skillsTitle: 'Skills & tools',
        skillsSub: 'The software and platforms I rely on to deliver.',
        experienceEyebrow: 'Journey', experienceTitle: 'Experience',
        coursesEyebrow: 'Training', coursesTitle: 'Courses & training',
        courseAudience: 'Target audience', courseTopics: 'Topics', courseMode: 'Format', courseInquire: 'Ask about this course',
        educationEyebrow: 'Qualifications', educationTitle: 'Education & certificates',
        contactEyebrow: 'Let’s begin', contactTitle: 'Ready to give your brand a stronger visual presence?',
        contactSub: 'Get in touch to start your project. Tell me about your idea or service and I will reply as soon as I can.',
        whatsapp: 'WhatsApp', call: 'Phone call', email: 'Email', instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook',
        location: 'Location', startProject: 'Contact me to start your project',
        waGeneral: 'Hello Ali, I would like to ask about a project.',
        waService: 'Hello Ali, I would like to ask about this service: ',
        waCourse: 'Hello Ali, I would like to ask about this course: ',
        footerLinks: 'Quick links', rights: 'All rights reserved', top: 'Back to top',
        close: 'Close', prev: 'Previous', next: 'Next'
      }
    }
  };
});
