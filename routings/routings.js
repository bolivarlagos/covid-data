const routes = require("express").Router()

routes.get("/world")
routes.get("/continents")
routes.get("/continents/:single")
routes.get("/countries")
routes.get("/countries/:single")

module.exports = routes
