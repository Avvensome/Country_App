// Select all elements and inputs
const input = document.querySelector('.form__input')
const mainContainer = document.querySelector('main')
// get value from input

input.addEventListener('submit', function (e) {
    e.preventDefault()

})

const countryHtmlStructure = (countryInfo) => {
    `      
    <div class="container-country-main">
    <img
      class="img-country-flag"
      src="${countryInfo.flags}"
    />
    <div class="container-country-lower-section">
      <div class="country-name-region-container">
        <h2>${countryInfo.name}</h2>
        <h3>${countryInfo.region}</h3>
      </div>
      <div class="country-info-container">
        <p>💬 ${countryInfo.languages}</p>
        <p>💰 ${countryInfo.currencies}</p>
        <p>👬 ${countryInfo.population / 1000000} M</p>
      </div>
    </div>
  </div>`
}


const getCountry = (countryName) => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
        })
}

getCountry('poland')