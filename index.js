const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const { connectToDatabase } = require('./database/index');
const verifyJWT = require("./middleware/verifyJWT");

app.use(bodyParser.json());

// middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//------
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
//-------

app.use(verifyJWT);

app.use('/api/course', require('./routes/courseRoutes'));




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server running on port ${PORT}`);
});