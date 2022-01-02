const app = require("express")()
const routes = require("./routings/routings")
const { PORT } = require("./utils")

app.listen(PORT || 3000)
app.use("/api", routes)
