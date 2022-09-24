require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');

app.get('/api', (req, res) => {
    res.json({ msg: 'App working!!!' })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
})

app.listen(process.env.PORT || 4000, () => {
    console.log('server running on port 4000')
})