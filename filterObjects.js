const axios = require('axios'); 
const fs = require ('fs')

let filteredObjectsArray = [];

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
            filteredObjectsArray.push(artId)
            writeCSV(filteredObjectsArray);
            return artId
        } 
        
    })
    .catch(error => {
        console.log('Problem fetching object!!')
        console.log(error)
    })
}

const filterObjects = (array) => {
    array.forEach( (art, index) => {
        // console.log(`THIS THE ART: ${art}`)
        // pingForImage(art)
        
        setTimeout(() => {
            console.log(`THIS THE ART: ${art}`)
            pingForImage(art)
            console.log(`PRINT PING: ${pingForImage(art)}`)
        }, 1000)
    })  
}

openCSV(filterObjects);




