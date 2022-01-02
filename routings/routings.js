const controllers = require("../controllers/controllers")
const routes = require("express").Router()

routes.get("/world", controllers.allWorld)
routes.get("/continents", controllers.allContinents)
routes.get("/continents/:single", controllers.singleContinent)
routes.get("/countries", controllers.allCountries)
routes.get("/countries/:single", controllers.singleCountry)

module.exports = routes
