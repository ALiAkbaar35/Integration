import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    database: "rental",
    password: ""
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/contract', (req, res) => {
    const sql = 'SELECT * FROM rent_contracts';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/departments', (req, res) => {
    const sql = 'SELECT * FROM departments';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/vendors', (req, res) => {
    const sql = 'SELECT * FROM vendors';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/reports', (req, res) => {
    const sql = 'SELECT * FROM reports';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/personal_access_tokens', (req, res) => {
    const sql = 'SELECT * FROM personal_access_tokens';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/properties', (req, res) => {
    const sql = 'SELECT * FROM properties';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/payment_schedules', (req, res) => {
    const sql = 'SELECT * FROM payment_schedules';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/password_resets', (req, res) => {
    const sql = 'SELECT * FROM password_resets';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/migrations', (req, res) => {
    const sql = 'SELECT * FROM migrations';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/menu_role_permissions', (req, res) => {
    const sql = 'SELECT * FROM menu_role_permissions';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/menus', (req, res) => {
    const sql = 'SELECT * FROM menus';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})


app.get('/failed_jobs', (req, res) => {
    const sql = 'SELECT * FROM failed_jobs';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})
app.get('/current_month_rents', (req, res) => {
    const sql = 'SELECT * FROM current_month_rents';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
       return res.json(result);
    })
})


const port = 5050;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
