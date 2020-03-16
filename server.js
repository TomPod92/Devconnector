const express = require('express');
const connectDB = require('./config/db.js');

const app = express();

// Połączenie z baza danych
connectDB();

app.get('/', (request, response) => response.send('API running'));

// Rejestracja endpoint'ow
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));