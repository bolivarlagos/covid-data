const cheerio = require("cheerio")
const { get } = require("axios")
const { URL } = require("./utils")

const getCovidData = async () => {
    const response = await get(URL)
    const html = await response.data 

    const thead = []
    const allContinents = []
    const allCountries = []
    const world = []

    const $ = cheerio.load(html)
    $("#main_table_countries_today > thead > tr").each((i, el) => {
        const theadItems = $(el).text().trim().split(/\n+/)
        for(let item of theadItems){
            if(item === "#"){
                thead.push("Rank")
            } else {
                let modifiedItem = item.replace(",", "").trim()
                modifiedItem = modifiedItem.replace(/([A-Z])/g, " $1").trim()

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
    console.log(thead)
}
