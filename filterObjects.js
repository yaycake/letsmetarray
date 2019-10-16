const axios = require('axios'); 
const fs = require ('fs')

let filteredObjectsArray = [];

//open and sort CSV -- housekeeping code 

const sortCSV = () => {
    fs.readFile('allObjects.csv', 'utf8', function(err, data) {
        console.log("sorting csv")
        var dataArray = data.split(",").sort(); 
        fs.writeFile("allObjects.csv", dataArray, (err) => {
            console.log(err)
        })
    })
}
// sortCSV()

const openCSV = (callback) => {
    fs.readFile('allObjects.csv', 'utf8', function (err, data) {
        console.log(`[inOPENCSV]`)
        var dataArray = data.split(",");
        callback(dataArray)
        return dataArray
      });
}

const writeCSV = (array) => {
    console.log(`in writecsv`)
    fs.writeFile('filtered.csv', array, (err) => {
        console.log(err);
        console.log('success')
    })
}

const pingForImage = (artId) => {
    console.log(`pinging for image`)
    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
    .then(response => {   
        if (response.data.primaryImage) {
            console.log(`ARTID [${artId}] HAS IMAGE`)
            console.log(`- - - - - - - `)
            filteredObjectsArray.sort().push(artId)
            writeCSV(filteredObjectsArray);
            return artId
        } 
        
    })
    .catch(error => {
        console.log('Problem fetching object!!')
        console.log(error.response.status)
        console.log(error.response.statusText)
        console.log(`ERROR URL: ${error.config.url}`)
    })
}

const filterObjects = (array) => {

    setTimeout(()=>{
        for (const art of array) {
            // console.log(`THIS THE ART: ${art}`)
            pingForImage(art)
        }
    }, 3000)
    
    // array.forEach( (art, index) => {
        // console.log(`THIS THE ART: ${art}`)
        // pingForImage(art)
        
        // setTimeout(() => {
        //     console.log(`THIS THE ART: ${art}`)
        //     pingForImage(art)
        //     console.log(`PRINT PING: ${pingForImage(art)}`)
        // }, 1000)
    // })  
}

openCSV(filterObjects);






