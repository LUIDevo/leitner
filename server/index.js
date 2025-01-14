const express = require('express')
const sqlite3 = require('sqlite3')
const app = express()

const port = 4004
app.get('/put', (req,res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})