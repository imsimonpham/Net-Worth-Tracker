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
    const { date, transType, category, amount, fromAcctId, toAcctId, note } = req.body;

    const newTrans = await pool.query(
      `INSERT INTO transaction 
        ("date", "transType", "category", "amount", "fromAcctId", "toAcctId", "note") 
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [date, transType, category, amount, fromAcctId, toAcctId, note]
    );

    res.json(newTrans.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
})

//get transactions
app.get('/transactions', async (req, res) => {
  try {
    const allTrans = await pool.query("SELECT * FROM transaction");
    res.json(allTrans.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
})

//delete transaction
app.delete('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTrans = await pool.query(
      "DELETE FROM transaction WHERE id = $1",
      [id]
    );
    res.json({ message: "Transaction was deleted successfully" });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
})

//update transaction
app.put('/transactions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, transType, category, amount, fromAcctId, toAcctId, note } = req.body;

    const updateTrans = await pool.query(
      `UPDATE transaction
       SET "date" = $1,
           "transType" = $2,
           "category" = $3,
           "amount" = $4,
           "fromAcctId" = $5,
           "toAcctId" = $6,
           "note" = $7
       WHERE id = $8`,
      [date, transType, category, amount, fromAcctId, toAcctId, note, id]
    );

    res.json({ message: "Transaction was updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// pull income data for CHARTS
app.get('/transactions/income/monthly', async (req, res) => {
  try {
    const { month, year } = req.query;
    const queryText = `
      SELECT "category", 
        SUM("amount") AS "totalAmount"
      FROM "transaction"
      WHERE "transType" = 'Income'
        AND "transType" != 'Transfer'
        AND DATE_TRUNC('month', "date") = DATE_TRUNC('month', MAKE_DATE($1::integer, $2::integer, 1))
      GROUP BY "category"
      ORDER BY "totalAmount" DESC;
    `;
    const queryParams = [year, month];
    const income = await pool.query(queryText, queryParams);
    res.json(income.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get('/transactions/income/yearly', async (req, res) => {
  try {
    const { year } = req.query;

    const queryText = `
      SELECT "category", 
        SUM("amount") AS "totalAmount"
      FROM "transaction"
      WHERE "transType" = 'Income'
        AND "transType" != 'Transfer'
        AND DATE_TRUNC('year', "date") = DATE_TRUNC('year', MAKE_DATE($1::integer, 1, 1))
      GROUP BY "category"
      ORDER BY "totalAmount" DESC;
    `;
    const queryParams = [year];
    const income = await pool.query(queryText, queryParams);
    res.json(income.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// pull expense data for CHARTS
app.get('/transactions/expense/monthly', async (req, res) => {
  try {
    const { month, year } = req.query;
    const queryText = `
      SELECT "category", 
        SUM("amount") AS "totalAmount"
      FROM "transaction"
      WHERE "transType" = 'Expense'
        AND DATE_TRUNC('month', "date") = DATE_TRUNC('month', MAKE_DATE($1::integer, $2::integer, 1))
      GROUP BY "category"
      ORDER BY "totalAmount" DESC;
    `;
    const queryParams = [year, month];
    const expense = await pool.query(queryText, queryParams);
    res.json(expense.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get('/transactions/expense/yearly', async (req, res) => {
  try {
    const { year } = req.query;
    const queryText = `
      SELECT "category", 
        SUM("amount") AS "totalAmount"
      FROM "transaction"
      WHERE "transType" = 'Expense'
        AND DATE_TRUNC('year', "date") = DATE_TRUNC('year', MAKE_DATE($1::integer, 1, 1))
      GROUP BY "category"
      ORDER BY "totalAmount" DESC;
    `;
    const queryParams = [year];
    const expense = await pool.query(queryText, queryParams);
    res.json(expense.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get('/transactions/yearlyByMonth', async (req, res) => {
  try {
    const { year } = req.query;
    const queryText = `
      SELECT 
        EXTRACT(MONTH FROM "date") AS month,
        SUM(CASE WHEN "transType" = 'Income' THEN "amount"::numeric ELSE 0 END) AS income,
        SUM(CASE WHEN "transType" = 'Expense' THEN "amount"::numeric ELSE 0 END) AS expenses,
        SUM(CASE WHEN "transType" = 'Income' THEN "amount"::numeric ELSE 0 END) - 
        SUM(CASE WHEN "transType" = 'Expense' THEN "amount"::numeric ELSE 0 END) AS balance,
        EXTRACT(YEAR FROM "date") AS year
      FROM "transaction"
      WHERE DATE_TRUNC('year', "date") = DATE_TRUNC('year', MAKE_DATE($1::integer, 1, 1))
      GROUP BY EXTRACT(YEAR FROM "date"), EXTRACT(MONTH FROM "date")
      ORDER BY year, EXTRACT(MONTH FROM "date");
    `;
    const queryParams = [year];
    const expense = await pool.query(queryText, queryParams);
    res.json(expense.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


//ACCOUNTS
//create account
app.post('/accounts', async (req, res) => {
  try {
    const { name, type, cashBalance, isActive } = req.body;

    const newAccount = await pool.query(
      `INSERT INTO account
        ("name", "type", "cashBalance", "isActive")
      VALUES
        ($1, $2, $3, $4)
      RETURNING *`,
      [name, type, cashBalance, isActive]
    );

    res.json(newAccount.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//get accounts
app.get('/accounts', async (req, res) => {
  try {
    const allAccounts = await pool.query(
      `SELECT * FROM account`
    );
    res.json(allAccounts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get('/accounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const account = await pool.query(
      `SELECT * FROM account  
       WHERE id = $1`,
      [id]
    );
    res.json(account.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//delete account
app.delete('/accounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAcct = await pool.query(
      `DELETE FROM account
       WHERE id = $1`,
      [id]
    );
    res.json('account was deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//update account name
app.put('/accounts/name/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateAcct = await pool.query(
      `UPDATE account
       SET "name" = $1
       WHERE id = $2`,
      [name, id]
    );

    res.json('Account name was updated successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//START APP
app.listen(port, () => {
  console.log(`server has started on port ${port}`)
})
