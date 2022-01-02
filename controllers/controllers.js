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
module.exports.singleContinent = async (req, res) => {    
    try {
        const { continent } = req.params
        const { allContinents } = await getCovidData()
        const singleContinent = allContinents.filter(item => item["Country Other"].toUpperCase() === continent.toUpperCase() || item["Continent"].toUpperCase() === continent.toUpperCase())
        if(singleContinent.length === 0){
            throw new Error()
        }
        res.status(200).json(singleContinent)
    } catch (error) {
        res.status(500).json({ message: "No continent with that name" })        
    }
    
}
module.exports.allCountries = async (req, res) => {
    try {
        const { allCountries } = await getCovidData()
        res.status(200).json(allCountries)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })        
    }
}
module.exports.singleCountry = async (req, res) => {    
    try {
        const { country } = req.params
        const { allCountries } = await getCovidData()
        const singleCountry = allCountries.filter(item => item["Country Other"].toUpperCase() === country.toUpperCase())
        if(singleCountry.length === 0){
            throw new Error()
        }
        res.status(200).json(singleCountry)
    } catch (error) {
        res.status(500).json({ message: "No country with that name" })        
    }
}

module.exports.countryPosition = async (req, res) => {    
    try {
        const { position } = req.params
        const { allCountries } = await getCovidData()
        const countryPosition = allCountries[position - 1]
        if(!countryPosition){
            throw new Error()
        }
        res.status(200).json(countryPosition)
    } catch (error) {
        res.status(500).json({ message: "Wrong Position" })        
    }
}

module.exports.countriesFromContinent = async (req, res) => {        
    try {
        let { continent } = req.params
        if(continent.toUpperCase() === "NORTH-AMERICA" || continent.toUpperCase() === "SOUTH-AMERICA"){
            continent = continent.replace("-", " ")
        }
        const { allCountries } = await getCovidData()  
        const countriesFromContinent = allCountries.filter(country => {
            if(continent.toUpperCase() === "AMERICA"){
                return country["Continent"].toUpperCase() === "NORTH AMERICA"|| country["Continent"].toUpperCase() === "SOUTH AMERICA"
            }
            return country["Continent"].toUpperCase() === continent.toUpperCase()
        })    
        if(countriesFromContinent.length === 0){
            throw new Error()
        }        
        res.status(200).json(countriesFromContinent)
    } catch (error) {
        res.status(500).json({ message: "No continent with that name" })        
    }
}