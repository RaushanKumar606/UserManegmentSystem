const express = require('express');
const cors = require('cors');

const router = require('./router');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(router)

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

 const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

