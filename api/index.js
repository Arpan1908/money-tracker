// const express = require('express');
// const app = express();
// const cors = require('cors');
// require('dotenv').config();
// const Transaction = require('./models/Transaction');
// const { default: mongoose } = require('mongoose');

// app.use(cors());
// app.use(express.json());
// app.get('/api/info',async (req,res)=>{
//     await mongoose.connect(process.env.MONGO_URL)
//     const info = await Transaction.find()
//     res.json(info)
// })

// app.post('/api/transaction',async (req,res)=>{
//     //
//     await mongoose.connect(process.env.MONGO_URL)
//     const {item,description,time,price} = req.body;
//     const transaction = Transaction.create({item,description,time,price})

//     res.json(transaction)
// })

// app.listen(8000,()=>{
//     console.log("Server is running on port 8000")
// })

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// Handle connection error event
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.get('/api/info', async (req, res) => {
  try {
    const info = await Transaction.find();
    res.json(info);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.post('/api/transaction', async (req, res) => {
  try {
    const { item, description, time, price } = req.body;
    const transaction = await Transaction.create({ item, description, time, price });
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
