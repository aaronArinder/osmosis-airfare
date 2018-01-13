const osmosis = require('osmosis');

osmosis
  .get('https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population')
  .find('.wikitable:first tr:gt(0)')
  .set({
    state: 'td[3]',
    population: 'td[4]'
  })
  .follow('td[3] a@href')
  .set({
    longitude: '.longitude',
    latitude: '.latitude'
  })
  .data(data => console.log(data))
