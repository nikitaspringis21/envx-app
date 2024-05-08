const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ success: true, message: "Login successful" });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.json({ success: true, message: "Registration successful" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
