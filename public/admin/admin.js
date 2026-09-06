const API_URL = '/api';
let allBookings = [];
let chartInstance = null;

// Check auth state on load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        showDashboard();
        fetchBookings();
    }
});

// Login Logic
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');
    
    const btn = document.querySelector('#login-form button');
    const oldText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('adminToken', data.token);
            errorMsg.classList.add('hidden');
            showDashboard();
            fetchBookings();
        } else {
            errorMsg.innerText = data.error;
            errorMsg.classList.remove('hidden');
        }
    } catch (err) {
        errorMsg.innerText = 'حدث خطأ في الاتصال بالخادم';
        errorMsg.classList.remove('hidden');
    } finally {
        btn.innerHTML = oldText;
        btn.disabled = false;
    }
});

// Logout Logic
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('adminToken');
    document.getElementById('dashboard-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
});

function showDashboard() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
}

// Fetch Bookings
async function fetchBookings() {
    const token = localStorage.getItem('adminToken');
    try {
        const res = await fetch(`${API_URL}/bookings`, {
            headers: { 'Authorization': token }
        });
        
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('adminToken');
            document.getElementById('dashboard-container').classList.add('hidden');
            document.getElementById('login-container').classList.remove('hidden');
            return;
        }
        
        const bookings = await res.json();
        allBookings = bookings;
        applyFilter();
        renderChart();
    } catch (err) {
        console.error('Error fetching bookings', err);
    }
}

// Filter and Search Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterSelect = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-input');
    
    if (filterSelect) filterSelect.addEventListener('change', applyFilter);
    if (searchInput) searchInput.addEventListener('keyup', applyFilter);
});

function applyFilter() {
    const filterSelect = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-input');
    
    const filterValue = filterSelect ? filterSelect.value : 'الكل';
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    
    let filtered = allBookings;

    // Apply Status Filter
    if (filterValue !== 'الكل') {
        filtered = filtered.filter(b => b.status === filterValue);
    }

    // Apply Search Query
    if (searchQuery) {
        filtered = filtered.filter(b => 
            b.name.toLowerCase().includes(searchQuery) || 
            b.phone.includes(searchQuery)
        );
    }
    
    renderBookings(filtered);
}

function renderBookings(bookings) {
    document.getElementById('total-bookings').innerText = allBookings.length; // total always shows global count
    const tbody = document.getElementById('bookings-tbody');
    tbody.innerHTML = '';
    
    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">لا توجد حجوزات تتطابق مع بحثك</td></tr>';
        return;
    }

    bookings.forEach(b => {
        const tr = document.createElement('tr');
        const requestDate = new Date(b.created_at).toLocaleString('ar-EG');
        
        tr.innerHTML = `
            <td>${b.id}</td>
            <td><strong>${b.name}</strong></td>
            <td><span dir="ltr">${b.phone}</span></td>
            <td>${b.service}</td>
            <td>${b.date}</td>
            <td>${b.details || '-'}</td>
            <td><small dir="ltr">${requestDate}</small></td>
            <td>
                <select class="status-select" onchange="updateStatus(${b.id}, this.value)">
                    <option value="قيد الانتظار" ${b.status === 'قيد الانتظار' ? 'selected' : ''}>قيد الانتظار</option>
                    <option value="تم التواصل" ${b.status === 'تم التواصل' ? 'selected' : ''}>تم التواصل</option>
                    <option value="مكتمل" ${b.status === 'مكتمل' ? 'selected' : ''}>مكتمل</option>
                    <option value="ملغي" ${b.status === 'ملغي' ? 'selected' : ''}>ملغي</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Update Status
async function updateStatus(id, newStatus) {
    const token = localStorage.getItem('adminToken');
    try {
        const res = await fetch(`${API_URL}/bookings/${id}/status`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({ status: newStatus })
        });
        
        if (!res.ok) {
            alert('حدث خطأ أثناء تحديث الحالة');
        } else {
            // Update local state
            const booking = allBookings.find(b => b.id === id);
            if (booking) booking.status = newStatus;
        }
    } catch (err) {
        console.error('Error updating status', err);
        alert('حدث خطأ أثناء تحديث الحالة');
    }
}

// Export to Excel
document.getElementById('export-btn').addEventListener('click', () => {
    if (allBookings.length === 0) return alert('لا توجد بيانات لتصديرها');
    
    // Prepare data (Translate status and column names)
    const data = allBookings.map(b => ({
        "رقم الحجز": b.id,
        "الاسم": b.name,
        "رقم الهاتف": b.phone,
        "الخدمة": b.service,
        "التاريخ المفضل": b.date,
        "التفاصيل": b.details || '',
        "الحالة": b.status,
        "تاريخ الطلب": new Date(b.created_at).toLocaleString('ar-EG')
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "الحجوزات");
    
    XLSX.writeFile(workbook, "TechnoMed_Bookings.xlsx");
});

// Render Chart
function renderChart() {
    const ctx = document.getElementById('servicesChart').getContext('2d');
    
    // Count services
    const servicesCount = {};
    allBookings.forEach(b => {
        servicesCount[b.service] = (servicesCount[b.service] || 0) + 1;
    });

    const labels = Object.keys(servicesCount);
    const data = Object.values(servicesCount);

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#00B4D8', '#112240', '#64FFDA', '#F8F9FA', '#233554'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        font: { family: "'Cairo', sans-serif" }
                    }
                }
            }
        }
    });
}
