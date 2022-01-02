const getCovidData = require("../covid-data")

module.exports.allWorld = async (req, res) => {
    try {
        const { world } = await getCovidData()
        res.status(200).json(world)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })        
    }
}
module.exports.allContinents = async (req, res) => {
    try {
        const { allContinents } = await getCovidData()
        res.status(200).json(allContinents)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })        
    }
}
module.exports.singleContinent = (req, res) => {
    res.json({ continent: "single continent"})
}
module.exports.allCountries = async (req, res) => {
    try {
        const { allCountries } = await getCovidData()
        res.status(200).json(allCountries)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })        
    }
}
module.exports.singleCountry = (req, res) => {
    res.json({ country: "single country"})
}