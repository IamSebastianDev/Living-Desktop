/** @format */

// import an initilise express
const express = require('express');
const app = express();

// configure port

let PORT = process.env.PORT || 5000;

// redirect to the public folder
app.use(express.static('./public/'));

// direct to apis

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
