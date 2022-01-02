const controllers = require("../controllers/controllers")
const routes = require("express").Router()

routes.get("/world", controllers.allWorld)
routes.get("/continents", controllers.allContinents)
routes.get("/continents/:continent", controllers.singleContinent)
routes.get("/countries", controllers.allCountries)
routes.get("/countries/:country", controllers.singleCountry)

module.exports = routes
