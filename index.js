const express = require("express")
const app = express()

const fs = require("fs")
const path = require("path")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.listen(8080)