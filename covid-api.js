const express = require("express")
const app = express()
const routes = require("./routings/routings")
const { PORT } = require("./utils")

app.listen(PORT || 3000)
app.use(express.json())

app.use("/api", routes)

app.get("/", (req, res) => {
    res.redirect("/api/countries")
})