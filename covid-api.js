const app = require("express")()
const routes = require("./routings/routings")

app.listen(3000)
app.use("/api", routes)