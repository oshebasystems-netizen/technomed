document.getElementById('track-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phone = document.getElementById('phone-input').value.trim();
    if (!phone) return;
    
    const resultContainer = document.getElementById('result-container');
    const errorMsg = document.getElementById('error-msg');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('track-btn');
    
    // Reset UI
    resultContainer.innerHTML = '';
    resultContainer.style.display = 'none';
    errorMsg.style.display = 'none';
    loading.style.display = 'block';
    btn.disabled = true;
    
    try {
        const response = await fetch(`/api/track/${encodeURIComponent(phone)}`);
        const data = await response.json();
        
        if (response.ok && data.length > 0) {
            renderBookings(data);
            resultContainer.style.display = 'block';
        } else {
            errorMsg.innerText = 'عفواً، لا يوجد أي طلب صيانة أو استشارة مسجل بهذا الرقم.';
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        errorMsg.innerText = 'حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً.';
        errorMsg.style.display = 'block';
    } finally {
        loading.style.display = 'none';
        btn.disabled = false;
    }
});

function renderBookings(bookings) {
    const container = document.getElementById('result-container');
    
    bookings.forEach(booking => {
        const date = new Date(booking.created_at).toLocaleDateString('ar-EG', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        
        let timelineHTML = '';
        const status = booking.status;
        
        // Status definitions
        const steps = [
            { id: 'قيد الانتظار', icon: 'fa-clock', text: 'تم استلام الطلب' },
            { id: 'تم التواصل', icon: 'fa-phone-volume', text: 'جاري العمل' },
            { id: 'مكتمل', icon: 'fa-check', text: 'مكتمل' }
        ];
        
        if (status === 'ملغي') {
            timelineHTML = `
                <div class="timeline">
                    <div class="timeline-step cancelled">
                        <div class="timeline-icon"><i class="fa-solid fa-xmark"></i></div>
                        <p>عذراً، تم إلغاء هذا الطلب.</p>
                    </div>
                </div>
            `;
        } else {
            let passed = true;
            let timelineSteps = steps.map(step => {
                let stateClass = '';
                if (status === step.id) {
                    stateClass = 'active';
                    passed = false; // Next steps won't be active/completed
                } else if (passed) {
                    stateClass = 'completed';
                }
                
                return `
                    <div class="timeline-step ${stateClass}">
                        <div class="timeline-icon"><i class="fa-solid ${step.icon}"></i></div>
                        <p>${step.text}</p>
                    </div>
                `;
            }).join('');
            
            timelineHTML = `<div class="timeline">${timelineSteps}</div>`;
        }
        
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.innerHTML = `
            <div class="booking-header">
                <h3><i class="fa-solid fa-wrench" style="color: var(--clr-cyan-dark);"></i> ${booking.service}</h3>
                <span>بتاريخ: ${date}</span>
            </div>
            <div style="margin-bottom: 15px; color: var(--clr-navy);">
                <strong>الاسم:</strong> ${booking.name}
            </div>
            ${timelineHTML}
        `;
        
        container.appendChild(card);
    });
}
