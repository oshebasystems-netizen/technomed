const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
const path = require('path');

let db;

// Check if we are in Render production (DATABASE_URL exists)
if (process.env.DATABASE_URL) {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            service VARCHAR(255) NOT NULL,
            date VARCHAR(50) NOT NULL,
            details TEXT,
            status VARCHAR(50) DEFAULT 'قيد الانتظار',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `).catch(err => console.error("Error creating Postgres table:", err));

    db = {
        run: async function(sql, params, callback) {
            let i = 1;
            // Convert SQLite ? parameters to PostgreSQL $1, $2, etc.
            const pgSql = sql.replace(/\?/g, () => `$${i++}`);
            try {
                let finalSql = pgSql;
                // Workaround to get last inserted ID like SQLite does
                if (pgSql.trim().toUpperCase().startsWith('INSERT')) {
                    finalSql += ' RETURNING id';
                }
                const res = await pool.query(finalSql, params);
                let lastID = null;
                if (res.rows.length > 0 && res.rows[0].id) {
                    lastID = res.rows[0].id;
                }
                if (callback) callback.call({ lastID }, null);
            } catch (err) {
                if (callback) callback(err);
            }
        },
        all: async function(sql, params, callback) {
            let i = 1;
            const pgSql = sql.replace(/\?/g, () => `$${i++}`);
            try {
                const res = await pool.query(pgSql, params);
                if (callback) callback(null, res.rows);
            } catch (err) {
                if (callback) callback(err);
            }
        }
    };
    console.log("Connected to PostgreSQL (Render)");

} else {
    // Local Environment: Use SQLite
    const dbPath = path.resolve(__dirname, 'bookings.db');
    const sqliteDb = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database', err.message);
        } else {
            console.log('Connected to SQLite (Local)');
            sqliteDb.run(`CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                service TEXT NOT NULL,
                date TEXT NOT NULL,
                details TEXT,
                status TEXT DEFAULT 'قيد الانتظار',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);
        }
    });
    db = sqliteDb;
}

module.exports = db;
