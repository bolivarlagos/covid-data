const controllers = require("../controllers/controllers")
const routes = require("express").Router()

routes.get("*", controllers.wrongRoute)
routes.get("/api/world", controllers.allWorld)
routes.get("/api/continents", controllers.allContinents)
routes.get("/api/continents/:single", controllers.singleContinent)
routes.get("/api/countries", controllers.allCountries)
routes.get("/api/countries/:single", controllers.singleCountry)

module.exports = routes
