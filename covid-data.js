const cheerio = require("cheerio")
const { get } = require("axios")
const { URL } = require("./utils")

const getCovidData = async () => {
    const response = await get(URL)
    const html = await response.data 

    const regexContinent = /^South America|North America|Asia|Europe|Africa|Oceania$/
    const thead = []
    const allContinents = []
    const allCountries = []
    const world = []

    const objectCreator = (items) => {
        let obj = {}
        for(let i = 0; i < thead.length; i++){
            obj[thead[i]] = items[i] || "No Data"
        }
        return obj  
    }

    const $ = cheerio.load(html)

    $("#main_table_countries_today > thead > tr").each((_, el) => {
        const theadItems = $(el).text().trim().split(/\n+/)
        for(let item of theadItems){
            if(item === "#"){
                thead.push("Rank")
            } else {
                let modifiedItem = item.replace(",", "").trim()
                modifiedItem = modifiedItem.replace(/([A-Z])/g, " $1").trim()
                modifiedItem = modifiedItem.replace(/(?:^|\W)Tot(?:$|\W)/, "Total")

                if(modifiedItem === "Tests/"){
                    thead.push(modifiedItem + "1 M pop")
                    continue
                }
                if(modifiedItem === "1 M pop"){
                    continue
                }
                if(modifiedItem === "Continent"){
                    thead.push(modifiedItem)
                    break 
                }
                thead.push(modifiedItem)
            }            
        }
    })

    $("#main_table_countries_today > tbody > tr").each((_, el) => {
        let items = $(el).text().split(/\n/)
        if(items[3].match(regexContinent) || items[2] === "World"){
            if(items[2] === "World"){
                let modifiedItem = [...items]
                modifiedItem.shift()
                const worldInformation = objectCreator(modifiedItem)
                world.push(worldInformation)
            } else {
                let sliced = items.slice(5)
                let modifiedItem = ["", items[3]].concat(sliced)
                const continentInformation = objectCreator(modifiedItem)
                allContinents.push(continentInformation)
            }
        }
        if(items[1] !== "" && items[1] !== "World" && !items[1].match(regexContinent)){
            let modifiedItem = [...items]
            modifiedItem.shift()
            const countryInformation = objectCreator(modifiedItem)
            allCountries.push(countryInformation)       
        }
    })
    return { world, allContinents, allCountries }
}

module.exports = getCovidData