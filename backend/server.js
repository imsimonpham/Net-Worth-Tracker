const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv'); 
const SQL = require('sql-template-strings');

const isDev = true;

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors()); //allow cross origins
app.use(express.json()); //allow access to request.body for json data

const pool = isDev
  ? require('./db') 
  : new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Required for Render connections
      },
    });

//ROUTES

//TEST
app.get('/', async (req, res) => {
  try {
    // Test the connection with a query
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error connecting to the database', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// TRANSACTIONS
//create transaction
app.post('/transactions', async (req, res) => {
  try {
    const date = req.body.date;
    const transType = req.body.transType;
    const category = req.body.category;
    const amount = req.body.amount;
    const fromAcctId = req.body.fromAcctId;
    const toAcctId = req.body.toAcctId;
    const note = req.body.note;
    
    const newTrans = await pool.query(SQL`
      INSERT INTO transaction 
        ("date", "transType", "category", "amount", "fromAcctId", "toAcctId", "note")
      VALUES 
        (${date}, ${transType}, ${category}, ${amount}, ${fromAcctId}, ${toAcctId}, ${note})
      RETURNING *
    `)
    res.json(newTrans.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//get transactions
app.get('/transactions', async (req, res) => {
  try {
    const allTrans = await pool.query(SQL`
      SELECT * FROM transaction  
    `);
    res.json(allTrans.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//delete transaction
app.delete('/transactions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTrans = await pool.query(SQL`
      DELETE FROM transaction
      WHERE id = ${id}
    `)
    res.json('transaction was deleted sucessfully');
  } catch (err) {
    console.error(err.message);
  }
})

//update transaction
app.put('/transactions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const date = req.body.date;
    const transType = req.body.transType;
    const category = req.body.category;
    const amount = req.body.amount;
    const fromAcctId = req.body.fromAcctId;
    const toAcctId = req.body.toAcctId;
    const note = req.body.note;

    const updateTrans = await pool.query(SQL`
      UPDATE transaction
      SET "date" = ${date},
        "transType" = ${transType},
        "category" = ${category},
        "amount" = ${amount},
        "fromAcctId" = ${fromAcctId},
        "toAcctId" = ${toAcctId},
        "note" = ${note}
      WHERE id = ${id};
    `);

    res.json('Transaction was updated successfully');
  } catch (err) {
    console.error(err.message);
  }
})

//ACCOUNTS
//create account
app.post('/accounts', async (req, res) => {
  try {
    const name = req.body.name;
    const type = req.body.type;
    const isActive = req.body.isActive;

    const newAccount = await pool.query(SQL`
      INSERT INTO account
        ("name", "type", "isActive")
      VALUES
        (${name}, ${type}, ${isActive})  
      RETURNING *
    `)

    res.json(newAccount.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//get accounts
app.get('/accounts', async (req, res) => {
  try {
    const allAccounts = await pool.query(SQL`
      SELECT * FROM account  
    `);
    res.json(allAccounts.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.get('/accounts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const account = await pool.query(SQL`
      SELECT * FROM account  
      WHERE id = ${id}
    `);
    res.json(account.rows);
  } catch (err) {
    console.error(err.message);
  }
})

//delete account
app.delete('/accounts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteAcct = await pool.query(SQL`
      DELETE FROM account
      WHERE id = ${id}
    `)
    res.json('account was deleted sucessfully');
  } catch (err) {
    console.error(err.message);
  }
})

//update account name
app.put('/accounts/name/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    const updateAcct = await pool.query(SQL`
      UPDATE account
      SET "name" = ${name}
      WHERE id = ${id};
    `);

    res.json('Account name was updated successfully');
  } catch (err) {
    console.error(err.message);
  }
})

//START APP
app.listen(port, () => {
  console.log(`server has started on port ${port}`)
})
