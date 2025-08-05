// بيانات الضيوف التجريبية
const guests = [
    {
        id: 1,
        name: "أحمد محمد علي",
        phone: "+966501234567",
        invitations: 2,
        cardNumber: "001",
        status: "attendance"
    },
    {
        id: 2,
        name: "فاطمة أحمد السالم",
        phone: "+966507654321",
        invitations: 1,
        cardNumber: "002",
        status: "declined"
    },
    {
        id: 3,
        name: "محمد عبدالله الخالد",
        phone: "+966509876543",
        invitations: 3,
        cardNumber: "003",
        status: "waiting"
    },
    {
        id: 4,
        name: "نورا سعد المطيري",
        phone: "+966502468135",
        invitations: 1,
        cardNumber: "004",
        status: "confirmed"
    },
    {
        id: 5,
        name: "خالد فهد العتيبي",
        phone: "+966508642097",
        invitations: 2,
        cardNumber: "005",
        status: "attendance"
    },
    {
        id: 6,
        name: "ريم عبدالرحمن القحطاني",
        phone: "+966503691472",
        invitations: 1,
        cardNumber: "006",
        status: "sent"
    },
    {
        id: 7,
        name: "عبدالعزيز صالح الدوسري",
        phone: "+966504567890",
        invitations: 4,
        cardNumber: "007",
        status: "confirmed"
    },
    {
        id: 8,
        name: "هند محمد الشمري",
        phone: "+966506789012",
        invitations: 1,
        cardNumber: "008",
        status: "waiting"
    }
];

// دالة لإنشاء بطاقة ضيف
function createGuestCard(guest) {
    const statusText = {
        attendance: 'حضور',
        declined: 'اعتذار',
        waiting: 'انتظار',
        confirmed: 'تأكيد',
        sent: 'إرسال'
    };

    const statusIcon = {
        attendance: '✓',
        declined: '✗',
        waiting: '⏳',
        confirmed: '✓',
        sent: '📤'
    };

    return `
        <div class="guest-card" data-status="${guest.status}">
            <div class="status-badge ${guest.status}">
                <span class="status-icon">${statusIcon[guest.status]}</span>
            </div>
            <div class="guest-info">
                <div class="guest-name">${guest.name}</div>
                <div class="guest-phone">${guest.phone}</div>
                <div class="guest-details">
                    <span>عدد الدعوات: ${guest.invitations}</span>
                </div>
            </div>
        </div>
    `;
}

// دالة لعرض البطاقات
function displayCards(guestsToShow = guests) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = guestsToShow.map(guest => createGuestCard(guest)).join('');
}

// دالة للبحث
function searchGuests() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredGuests = guests.filter(guest => 
        guest.name.toLowerCase().includes(searchTerm) || 
        guest.cardNumber.includes(searchTerm) ||
        guest.phone.includes(searchTerm)
    );
    displayCards(filteredGuests);
}

// دالة للفلترة
function filterGuests(status) {
    if (status === 'all') {
        displayCards(guests);
    } else {
        const filteredGuests = guests.filter(guest => guest.status === status);
        displayCards(filteredGuests);
    }
}

// دالة تحديث عدد الفلاتر
function updateFilterCounts() {
    const counts = {
        all: guests.length,
        attendance: guests.filter(g => g.status === 'attendance').length,
        declined: guests.filter(g => g.status === 'declined').length,
        waiting: guests.filter(g => g.status === 'waiting').length,
        confirmed: guests.filter(g => g.status === 'confirmed').length,
        sent: guests.filter(g => g.status === 'sent').length
    };

    Object.keys(counts).forEach(status => {
        const btn = document.querySelector(`[data-filter="${status}"]`);
        if (btn) {
            const countSpan = btn.querySelector('.filter-count');
            if (countSpan) {
                countSpan.textContent = `(${counts[status]})`;
            }
        }
    });
}

// دالة ملف الإحصائيات
function fillStatistics() {
    const stats = {
        total: guests.length,
        attendance: guests.filter(g => g.status === 'attendance').length,
        declined: guests.filter(g => g.status === 'declined').length,
        waiting: guests.filter(g => g.status === 'waiting').length,
        confirmed: guests.filter(g => g.status === 'confirmed').length,
        sent: guests.filter(g => g.status === 'sent').length
    };
    
    alert(`📊 إحصائيات الدعوات:

📋 المجموع: ${stats.total}
✅ حضور: ${stats.attendance}
❌ اعتذار: ${stats.declined}
⏳ انتظار: ${stats.waiting}
✓ تأكيد: ${stats.confirmed}
📤 إرسال: ${stats.sent}`);
}

// دالة تحميل بيانات الضيوف
function downloadGuestData() {
    // إنشاء البيانات بصيغة CSV
    const headers = ['الاسم', 'رقم الهاتف', 'عدد الدعوات', 'الحالة'];
    const csvContent = [headers.join(',')];
    
    // إضافة بيانات كل ضيف
    guests.forEach(guest => {
        const statusText = {
            attendance: 'حضور',
            declined: 'اعتذار', 
            waiting: 'انتظار',
            confirmed: 'تأكيد',
            sent: 'إرسال'
        };
        
        const row = [
            guest.name,
            guest.phone,
            guest.invitations,
            statusText[guest.status]
        ];
        csvContent.push(row.join(','));
    });
    
    // إنشاء الملف وتحميله
    const csvString = csvContent.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'بيانات_الضيوف.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // رسالة تأكيد
    alert('📁 تم تحميل بيانات الضيوف بنجاح!');
    alert('📁 تم تحميل بيانات الضيوف بنجاح!');
}

// دالة إرسال تأكيد
function sendConfirmation() {
    const selectedCards = document.querySelectorAll('.card-checkbox:checked');
    if (selectedCards.length === 0) {
        alert('يرجى اختيار ضيوف لإرسال التأكيد لهم');
        return;
    }
    alert(`📤 تم إرسال التأكيد لـ ${selectedCards.length} ضيف بنجاح!`);
}

// دالة تغيير الكل
function changeAll() {
    const selectedCards = document.querySelectorAll('.card-checkbox:checked');
    if (selectedCards.length === 0) {
        alert('يرجى اختيار ضيوف لتغيير حالتهم');
        return;
    }
    alert(`🔄 تم تغيير حالة ${selectedCards.length} ضيف بنجاح!`);
}

// دالة إرسال دعوة
function sendInvitation() {
    const selectedCards = document.querySelectorAll('.card-checkbox:checked');
    if (selectedCards.length === 0) {
        alert('يرجى اختيار ضيوف لإرسال الدعوات لهم');
        return;
    }
    alert(`📧 تم إرسال الدعوات لـ ${selectedCards.length} ضيف بنجاح!`);
}

// دالة للترتيب
function sortGuests(sortBy) {
    let sortedGuests = [...guests];
    
    switch(sortBy) {
        case 'name':
            sortedGuests.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
            break;
        case 'status':
            const statusOrder = { 'attendance': 1, 'confirmed': 2, 'sent': 3, 'waiting': 4, 'declined': 5 };
            sortedGuests.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
            break;
        case 'date':
            sortedGuests.sort((a, b) => a.id - b.id);
            break;
    }
    
    displayCards(sortedGuests);
}

// إعداد مستمعي الأحداث
document.addEventListener('DOMContentLoaded', function() {
    // عرض البطاقات الأولي
    displayCards();
    
    // تحديث عدد الفلاتر
    updateFilterCounts();

    // إعداد البحث
    document.getElementById('searchInput').addEventListener('input', searchGuests);

    // إعداد أزرار الفلترة
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // إضافة الفئة النشطة للزر المضغوط
            this.classList.add('active');
            // تطبيق الفلتر
            filterGuests(this.dataset.filter);
        });
    });

    // إعداد الترتيب
    document.getElementById('sortSelect').addEventListener('change', function() {
        sortGuests(this.value);
    });
});
