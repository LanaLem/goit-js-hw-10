import './css/styles.css';
import API from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const refs = {
    inputEl: document.querySelector("#search-box"),
    countryListEl: document.querySelector(".country-list"),
    countryInfoEl: document.querySelector(".country-info"),
};
 
refs.inputEl.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
    refs.countryInfoEl.innerHTML = '';
    refs.countryListEl.innerHTML = '';
    
    const nameCountry = e.target.value.trim();
    
    if (nameCountry == '') {
        return
    };
    
    API.fetchCountries(nameCountry)
        .then(renderMarkup)
        .catch(onError)
}

function renderMarkup(countries) {
    if (countries.length >= 10) {
       return Notify.info("Too many matches found. Please enter a more specific name.");
    }
    
    if (2 < countries.length && countries.length < 10) {
        markupList(countries);
        return
    }
     
    markupCountryCard(countries);
}

function markupList(countries) { 
    const markup = countries.map((country) => {
         return`<li>
            <img src=${country.flags.svg} width = 35 height = 35 alt=${country.name.official}>
            <span><b>${country.name.official}</b></span>
            </li>`;
    }).join("");
    refs.countryListEl.innerHTML = markup;
}

function markupCountryCard(countries) {
    const markup = countries.map((country) => {
           return `<div class="country-flag-name">
            <img src=${country.flags.svg} width = 35 height = 35 alt=${country.name.official}>
            <span><b>${country.name.official}</b></span>
            </div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
        }).join("");
    refs.countryInfoEl.innerHTML = markup;
}

function onError(error) {
    Notify.failure("Oops, there is no country with that name");
}