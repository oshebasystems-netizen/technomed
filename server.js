const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const https = require('https');
const db = require('./database');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'technomed_secret_123'; // In production, use env variables

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Telegram Notification Function
function sendTelegramNotification(booking) {
    const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
    const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

    // Skip if user hasn't configured it yet
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') return;

    const message = `🔔 *حجز جديد - تكنوميد*\n\n👤 *الاسم:* ${booking.name}\n📞 *الهاتف:* ${booking.phone}\n⚙️ *الخدمة:* ${booking.service}\n📅 *التاريخ:* ${booking.date}\n📝 *التفاصيل:* ${booking.details}`;

    const data = JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const req = https.request(options, (res) => {
        if (res.statusCode === 200) {
            console.log('Telegram notification sent');
        }
    });

    req.on('error', (e) => {
        console.error('Error sending telegram message', e);
    });

    req.write(data);
    req.end();
}

// Login Endpoint for Admin
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Basic auth based on implementation plan defaults
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '12h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'غير مصرح لك بالدخول' });
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'الجلسة انتهت، يرجى تسجيل الدخول مجدداً' });
        req.user = decoded;
        next();
    });
};

// Create a new booking (Public Endpoint)
app.post('/api/bookings', (req, res) => {
    const { name, phone, service, date, details } = req.body;
    if (!name || !phone || !service || !date) {
        return res.status(400).json({ error: 'يرجى إكمال الحقول المطلوبة' });
    }

    const sql = `INSERT INTO bookings (name, phone, service, date, details) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [name, phone, service, date, details], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'حدث خطأ أثناء حفظ البيانات' });
        }
        
        // Notify admin via Telegram
        sendTelegramNotification({ name, phone, service, date, details });
        
        res.json({ success: true, message: 'تم إرسال حجزك بنجاح', id: this.lastID });
    });
});

// Get all bookings (Admin Endpoint)
app.get('/api/bookings', verifyToken, (req, res) => {
    db.all(`SELECT * FROM bookings ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'حدث خطأ أثناء جلب البيانات' });
        }
        res.json(rows);
    });
});

// Update booking status (Admin Endpoint)
app.put('/api/bookings/:id/status', verifyToken, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    db.run(`UPDATE bookings SET status = ? WHERE id = ?`, [status, id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'خطأ في تحديث الحالة' });
        }
        res.json({ success: true });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
