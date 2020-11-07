const endpoint = 'https://opendata.rdw.nl/resource/m9d7-ebf2.json?$limit=150000'
const voertuigsoort = 'voertuigsoort'
const taxi = 'taxi_indicator'

getData(endpoint)
    // wachten op json is geladen
    .then(result => {
        return result.json()
    })

    // .then wacht totdat de data is geladen
    .then(RDWData => {
        console.log("Hier komt alle data", RDWData)

        // De data ophalen van een kolom
        const voertuigArray = filterData(RDWData, voertuigsoort)
        console.log(voertuigArray)

        const taxiArray = filterData(RDWData, taxi)
        console.log(taxiArray)

       
        // Hoeveel personenautos zijn er?
        const aantalPersonenautos = countValuesInArray(voertuigArray, "Personenauto")
        console.log('er zijn ' + aantalPersonenautos + ' personenautos')

        // Hoeveel taxi's zijn er?
        const aantalTaxis = countValuesInArray(taxiArray, "Ja")
        console.log('Er zijn ' + aantalTaxis + ' taxis')
    })


//PROMISE fetch data van een url
function getData(url) {
    return fetch(url)
}


// Returnt de waardes van een bepaalde kolom en zet dit in een array.
function filterData(dataArray, column) {
    // door alle data heen gaan en alleen de geselecteerde kolom geven
    return dataArray.map(item => item[column])
}


//Geeft terug hoevaak een waarde terug komt in een bepaalde array
function countValuesInArray(valueArray, specificValue){
    let count = 0
    valueArray.forEach(item => {
        if(item == specificValue){
            count ++
        }
    })
    return count
}