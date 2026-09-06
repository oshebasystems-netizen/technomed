// =========================================
// i18n TRANSLATIONS
// =========================================
const translations = {
    ar: {
        title: "تكنو ميد | للاستشارات الهندسية وصيانة المعدات",
        logo_techno: "تكنو",
        logo_med: "ميد",
        nav_home: "الرئيسية",
        nav_services: "خدماتنا",
        nav_portfolio: "معرض الأعمال",
        nav_blog: "المقالات",
        nav_testimonials: "آراء العملاء",
        nav_contact: "تواصل معنا",
        nav_book: "احجز الآن",
        hero_title: "حلول هندسية متقدمة لصيانة <span>المعدات الطبية والمصانع</span>",
        hero_subtitle: "نحن نقدم استشارات هندسية وحلول صيانة احترافية للوحات الـ PCB و PLC للأجهزة الطبية، بالإضافة إلى دعم تكنولوجيا المعلومات للمصانع والشركات الكبرى.",
        hero_btn_services: "اكتشف خدماتنا",
        hero_btn_book: "طلب صيانة فورية",
        hero_btn_consult: "حجز استشارة عن بعد",
        services_heading: "خدماتنا <span>الاحترافية</span>",
        services_subheading: "نقدم مجموعة واسعة من الخدمات الهندسية بأعلى معايير الجودة لضمان استمرارية عمل معداتك.",
        srv_1_title: "صيانة لوحات PCB الطبية",
        srv_1_desc: "إصلاح وصيانة دقيقة للوحات الدوائر المطبوعة (PCB) الخاصة بالمعدات الطبية المعقدة لضمان أداء موثوق وآمن.",
        srv_2_title: "برمجة وصيانة PLC",
        srv_2_desc: "خدمات برمجة وصيانة أجهزة التحكم المنطقي المبرمج (PLC) المستخدمة في الأجهزة الطبية والمعدات الصناعية.",
        srv_3_title: "صيانة أجهزة الكمبيوتر للمصانع",
        srv_3_desc: "عقود صيانة دورية، دعم فني متكامل، وحماية شبكات أجهزة الكمبيوتر لضمان عدم توقف خطوط الإنتاج.",
        book_heading: "احجز خدمة <span>الصيانة</span> الخاصة بك",
        book_subheading: "املأ النموذج وسيقوم فريق المهندسين لدينا بالتواصل معك في أقرب وقت ممكن لتقديم الاستشارة وتحديد موعد الصيانة.",
        book_feat_1: "استجابة سريعة في أقل من 24 ساعة",
        book_feat_2: "فريق هندسي متخصص ومجهز",
        book_feat_3: "ضمان على قطع الغيار والصيانة",
        form_name_label: "الاسم / اسم الشركة",
        form_name_ph: "أدخل اسمك أو اسم شركتك",
        form_phone_label: "رقم الهاتف",
        form_phone_ph: "رقم الهاتف للتواصل",
        form_service_label: "نوع الخدمة",
        form_srv_choose: "اختر الخدمة المطلوبة",
        form_srv_pcb: "صيانة لوحة PCB طبي",
        form_srv_plc: "برمجة وصيانة PLC",
        form_srv_it: "صيانة كمبيوتر / شبكات مصانع",
        form_srv_consult: "استشارة هندسية عن بعد",
        form_date_label: "تاريخ الزيارة المفضل",
        form_details_label: "تفاصيل العطل أو الطلب",
        form_details_ph: "يرجى وصف المشكلة أو متطلباتك باختصار...",
        form_submit: "تأكيد الحجز",
        form_sending: '<i class="fa-solid fa-circle-notch fa-spin"></i> جاري إرسال الحجز...',
        form_success: '<i class="fa-solid fa-circle-check"></i> تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.',
        form_error: '<i class="fa-solid fa-circle-xmark"></i> تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.',
        port_heading: "معرض <span>الأعمال</span>",
        port_subheading: "نظرة على بعض من مشاريعنا الناجحة في مجالات الصيانة الطبية والصناعية.",
        port_1_title: "إصلاح لوحة أم لجهاز أشعة",
        port_1_desc: "مستشفى الحياة - PCB صيانة",
        port_2_title: "برمجة PLC لخط إنتاج",
        port_2_desc: "مصنع الأمل - أتمتة صناعية",
        port_3_title: "تجديد شبكة IT كاملة",
        port_3_desc: "مصنع للصناعات الدوائية - IT دعم",
        blog_heading: "أحدث <span>المقالات التقنية</span>",
        blog_subheading: "اقرأ أحدث النصائح حول صيانة الأجهزة المعقدة والحفاظ على كفاءة مصنعك.",
        blog_1_title: "أهمية الصيانة الوقائية للوحات الـ PLC",
        blog_1_desc: "تعرف على كيف يمكن للصيانة الوقائية أن تنقذ خطوط الإنتاج من التوقف المفاجئ وتوفر آلاف الدولارات...",
        blog_2_title: "كيفية تحديد أعطال لوحات الـ PCB الطبية",
        blog_2_desc: "خطوات أساسية للفحص الظاهري والمبدئي للوحات الأجهزة الطبية قبل طلب تدخل الصيانة المختص...",
        blog_3_title: "تأمين شبكات المصانع ضد الهجمات السيبرانية",
        blog_3_desc: "دليلك لحماية بيانات خطوط الإنتاج الصناعية وأنظمة سكادا (SCADA) من الاختراق والتعطيل المتعمد...",
        blog_readmore: 'اقرأ المزيد <i class="fa-solid fa-arrow-left"></i>',
        test_heading: "آراء <span>العملاء</span>",
        test_subheading: "نفخر بثقة عملائنا في خدماتنا الهندسية المتخصصة.",
        test_1_feedback: '"فريق عمل احترافي جداً، قاموا بإصلاح لوحة التحكم الخاصة بجهاز الأشعة في وقت قياسي وبكفاءة عالية."',
        test_1_name: "د. أحمد محمود",
        test_1_title: "مدير مستشفى السلام",
        test_2_feedback: '"عقد الصيانة معهم لأجهزة الكمبيوتر كان من أفضل القرارات. استجابة سريعة ولا توجد أي فترات توقف للإنتاج."',
        test_2_name: "م. طارق كمال",
        test_2_title: "مدير الإنتاج بمصنع للصناعات الغذائية",
        test_3_feedback: '"خبرة ممتازة في برمجة أجهزة الـ PLC، قاموا بحل مشكلة معقدة كانت تعطل خط التعبئة بكل سهولة."',
        test_3_name: "ياسر إبراهيم",
        test_3_title: "مالك مصنع النسيج",
        footer_about: "شركتك الموثوقة للاستشارات الهندسية وصيانة المعدات الطبية والصناعية. خبرة واسعة وجودة لا تضاهى.",
        footer_links_title: "روابط سريعة",
        footer_contact_title: "تواصل معنا",
        footer_address: "6 أكتوبر، مصر",
        footer_copyright: "&copy; 2026 تكنوميد للاستشارات الهندسية. جميع الحقوق محفوظة."
    },
    en: {
        title: "TechnoMed | Engineering & Maintenance",
        logo_techno: "Techno",
        logo_med: "Med",
        nav_home: "Home",
        nav_services: "Services",
        nav_portfolio: "Portfolio",
        nav_blog: "Blog",
        nav_testimonials: "Testimonials",
        nav_contact: "Contact",
        nav_book: "Book Now",
        hero_title: "Advanced Engineering Solutions for <span>Medical & Factory Equipment</span>",
        hero_subtitle: "We offer professional engineering consultations and maintenance solutions for PCB and PLC medical devices, plus comprehensive IT support for factories.",
        hero_btn_services: "Explore Services",
        hero_btn_book: "Request Maintenance",
        hero_btn_consult: "Remote Consultation",
        services_heading: "Our Professional <span>Services</span>",
        services_subheading: "We provide a wide range of high-quality engineering services to ensure the continuity of your equipment.",
        srv_1_title: "Medical PCB Repair",
        srv_1_desc: "Precise repair and maintenance of complex medical equipment printed circuit boards (PCBs) to ensure reliable performance.",
        srv_2_title: "PLC Programming & Maintenance",
        srv_2_desc: "Programming and maintenance services for Programmable Logic Controllers (PLCs) used in medical and industrial equipment.",
        srv_3_title: "Factory IT Maintenance",
        srv_3_desc: "Periodic maintenance contracts, integrated tech support, and network protection to prevent production line downtime.",
        book_heading: "Book Your <span>Maintenance</span> Service",
        book_subheading: "Fill out the form and our engineering team will contact you as soon as possible to provide a consultation and set an appointment.",
        book_feat_1: "Fast response in less than 24 hours",
        book_feat_2: "Specialized and equipped engineering team",
        book_feat_3: "Warranty on parts and maintenance",
        form_name_label: "Name / Company Name",
        form_name_ph: "Enter your name or company name",
        form_phone_label: "Phone Number",
        form_phone_ph: "Contact phone number",
        form_service_label: "Service Type",
        form_srv_choose: "Choose requested service",
        form_srv_pcb: "Medical PCB Repair",
        form_srv_plc: "PLC Programming & Maintenance",
        form_srv_it: "Factory IT / Networks",
        form_srv_consult: "Remote Engineering Consultation",
        form_date_label: "Preferred Visit Date",
        form_details_label: "Issue Details",
        form_details_ph: "Please describe the problem briefly...",
        form_submit: "Confirm Booking",
        form_sending: '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Request...',
        form_success: '<i class="fa-solid fa-circle-check"></i> Request sent successfully! We will contact you soon.',
        form_error: '<i class="fa-solid fa-circle-xmark"></i> Failed to connect to server. Please try again later.',
        port_heading: "Our <span>Portfolio</span>",
        port_subheading: "A look at some of our successful projects in medical and industrial maintenance.",
        port_1_title: "X-Ray Motherboard Repair",
        port_1_desc: "Al-Hayat Hospital - PCB Maintenance",
        port_2_title: "Production Line PLC",
        port_2_desc: "Al-Amal Factory - Industrial Automation",
        port_3_title: "Full IT Network Upgrade",
        port_3_desc: "Pharmaceutical Factory - IT Support",
        blog_heading: "Latest <span>Tech Articles</span>",
        blog_subheading: "Read the latest tips on complex equipment maintenance and factory efficiency.",
        blog_1_title: "The Importance of PLC Preventive Maintenance",
        blog_1_desc: "Learn how preventive maintenance can save production lines from sudden stops and save thousands of dollars...",
        blog_2_title: "Identifying Medical PCB Faults",
        blog_2_desc: "Basic steps for visual inspection of medical equipment boards before requesting expert maintenance...",
        blog_3_title: "Securing Factory Networks",
        blog_3_desc: "Your guide to protecting industrial production data and SCADA systems from intentional breaches...",
        blog_readmore: 'Read More <i class="fa-solid fa-arrow-right"></i>',
        test_heading: "Client <span>Testimonials</span>",
        test_subheading: "We are proud of our clients' trust in our specialized engineering services.",
        test_1_feedback: '"Very professional team, they repaired our X-ray control board in record time and with high efficiency."',
        test_1_name: "Dr. Ahmed Mahmoud",
        test_1_title: "Director of Al-Salam Hospital",
        test_2_feedback: '"The IT maintenance contract was one of the best decisions. Fast response and zero production downtime."',
        test_2_name: "Eng. Tarek Kamal",
        test_2_title: "Production Manager, Food Industry",
        test_3_feedback: '"Excellent PLC programming expertise. They easily solved a complex issue that stalled our packaging line."',
        test_3_name: "Yasser Ibrahim",
        test_3_title: "Textile Factory Owner",
        footer_about: "Your trusted company for engineering consultations and medical/industrial equipment maintenance. Unmatched quality.",
        footer_links_title: "Quick Links",
        footer_contact_title: "Contact Us",
        footer_address: "6th of October, Egypt",
        footer_copyright: "&copy; 2026 TechnoMed Engineering. All rights reserved."
    }
};

let currentLang = 'ar';

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update texts
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    // Update Placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    // Update Language Button text
    document.getElementById('lang-toggle-btn').innerText = currentLang === 'ar' ? 'English' : 'عربي';
}


// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const navLinks = document.querySelector('.nav-links');

mobileMenuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon between bars and times (close)
    const icon = mobileMenuIcon.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
const links = document.querySelectorAll('.nav-links li a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger reveal once on load
reveal();

// Booking Form Submission (Backend Integration)
const bookingForm = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get button to add loading state
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerHTML = translations[currentLang].form_sending;
        submitBtn.disabled = true;
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const serviceSelect = document.getElementById('service');
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        const date = document.getElementById('date').value;
        const details = document.getElementById('details').value;

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    phone,
                    service: serviceText, // Notice we send translated text, in real apps we send value
                    date,
                    details
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Show success message
                formMessage.innerHTML = translations[currentLang].form_success;
                formMessage.classList.remove('hidden');
                formMessage.classList.add('success');
                bookingForm.reset();
            } else {
                formMessage.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${data.error || 'Error'}`;
                formMessage.classList.remove('hidden');
                formMessage.classList.remove('success');
            }
        } catch (error) {
            formMessage.innerHTML = translations[currentLang].form_error;
            formMessage.classList.remove('hidden');
            formMessage.classList.remove('success');
        } finally {
            submitBtn.innerText = originalText; // Reset to specific lang or original
            submitBtn.setAttribute('data-i18n', 'form_submit');
            submitBtn.innerHTML = translations[currentLang].form_submit;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
                formMessage.classList.remove('success');
            }, 5000);
        }
    });
}
