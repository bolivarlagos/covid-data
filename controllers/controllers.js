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
        const chosenContinent = continent.toUpperCase()
        const { allContinents } = await getCovidData()
        const singleContinent = allContinents.filter(item => {
            const continentUpperName = item["Country Other"].toUpperCase()
            const upperName = item["Continent"].toUpperCase()
            return  continentUpperName === chosenContinent ||  upperName === chosenContinent
        })        
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
        const chosenCountry = country.toUpperCase()
        const { allCountries } = await getCovidData()
        const singleCountry = allCountries.filter(item => {
            const upperCaseCountry = item["Country Other"].toUpperCase()
            return upperCaseCountry === chosenCountry
        })
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
        let chosenContinent = continent.toUpperCase()

        if(chosenContinent === "NORTH-AMERICA" || chosenContinent === "SOUTH-AMERICA"){
            chosenContinent = chosenContinent.replace("-", " ")
        }

        const { allCountries } = await getCovidData()  
        const countriesFromContinent = allCountries.filter(country => {

            const upperCaseContinent = country["Continent"].toUpperCase()

            if(chosenContinent === "AMERICA"){                
                return upperCaseContinent === "NORTH AMERICA" || upperCaseContinent === "SOUTH AMERICA"
            }
            if(chosenContinent === "OCEANIA"){                
                return upperCaseContinent === "Australia/Oceania".toUpperCase()
            }
            return upperCaseContinent === chosenContinent
        })    
        if(countriesFromContinent.length === 0){
            throw new Error()
        }        
        res.status(200).json(countriesFromContinent)
    } catch (error) {
        res.status(500).json({ message: "No continent with that name" })        
    }
}