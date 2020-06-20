const express = require('express');


const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Fox Mulder', text: 'The truth is out there.' },
    { id: 4, author: 'Dana Scully', text: 'Sure. Fine. Whatever.' }, 
    { id: 5, author: 'Walter Skinner', text: 'Are we done?' },
    { id: 6, author: 'Little Green Man', text: 'We come in peace!' },
  ];


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });