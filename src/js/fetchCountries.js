const URL = 'https://restcountries.com/v3.1';

function fetchCountries(nameCountry) {
    return fetch(`${URL}/name/${nameCountry}?fields=name,capital,population,languages,flags`)
        .then(response => response.json())
 }

export default { fetchCountries };