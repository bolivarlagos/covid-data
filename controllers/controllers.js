module.exports.allWorld = (req, res) => {
    res.json({ world: "world"})
}
module.exports.allContinents = (req, res) => {
    res.json({ continents: "continents"})
}
module.exports.singleContinent = (req, res) => {
    res.json({ continent: "single continent"})
}
module.exports.allCountries = (req, res) => {
    res.json({ countries: "countries"})
}
module.exports.singleCountry = (req, res) => {
    res.json({ country: "single country"})
}
module.exports.wrongRoute = (req, res) => {
    res.json({ error: "error"})
}