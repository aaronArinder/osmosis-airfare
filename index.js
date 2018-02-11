const osmosis = require('osmosis');
const fs = require('fs');


const scrapePopulations = (results) => {
  return new Promise((resolve, reject) => {

  const results = [];

  osmosis
    .get('https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population')
    .find('.wikitable:first tr:gt(0)')
    .set({
      state: 'td[3]',
      population: 'td[5]'
    })
    .follow('td[3] a@href')
    .set({
      longitude: '.longitude',
      latitude: '.latitude'
    })
    .data(data => results.push(data))
    .done(() => resolve(results))
  })
}

scrapePopulations().then((data, err) => {

  fs.writeFile('data-scraped.json', JSON.stringify(data, null, 4),
    function(err){
      if(err) console.error(err)
      else console.log('data saved')
    })
  }
)
