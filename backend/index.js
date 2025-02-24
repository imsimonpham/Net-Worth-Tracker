const express = require('express');
const cors = require('cors');
const pool = require('./db');
const SQL = require('sql-template-strings');

const app = express();

//middleware
app.use(cors()); //allow cross origins
app.use(express.json()); //allow access to request.body for json data

//ROUTES

// TRANSACTIONS
//create transaction
app.post('/transactions', async (req, res) => {
  try {
    const date = req.body.date;
    const transType = req.body.transType;
    const category = req.body.category;
    const amount = req.body.amount;
    const fromAcct = req.body.fromAcct;
    const toAcct = req.body.toAcct;
    const note = req.body.note;
    
    const newTrans = await pool.query(SQL`
      INSERT INTO transaction 
        ("date", "transType", "category", "amount", "fromAcct", "toAcct", "note")
      VALUES 
        (${date}, ${transType}, ${category}, ${amount}, ${fromAcct}, ${toAcct}, ${note})
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
    const fromAcct = req.body.fromAcct;
    const toAcct = req.body.toAcct;
    const note = req.body.note;

    const updateTrans = await pool.query(SQL`
      UPDATE transaction
      SET "date" = ${date},
          "transType" = ${transType},
          "category" = ${category},
          "amount" = ${amount},
          "fromAcct" = ${fromAcct},
          "toAcct" = ${toAcct},
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
    const balance = req.body.balance;
    const type = req.body.type;
    const isActive = req.body.isActive;
    const createdAt = req.body.createdAt;

    const newAccount = await pool.query(SQL`
      INSERT INTO account
        ("name", "balance", "type", "isActive","createdAt")
      VALUES
        (${name}, ${balance}, ${type}, ${isActive}, ${createdAt})  
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

// update account
app.put('/accounts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    const updateAcct = await pool.query(SQL`
      UPDATE account
      SET "name" = ${name}
      WHERE id = ${id};
    `);

    res.json('Account was updated successfully');
  } catch (err) {
    console.error(err.message);
  }
})

//START APP
app.listen(5000, () => {
  console.log('server has started on port 5000')
})
