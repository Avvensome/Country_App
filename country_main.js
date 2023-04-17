// Select all elements and inputs
const input = document.querySelector('.form__input')
const mainContainer = document.querySelector('main')
// get value from input

const countryHtmlStructure = (countryInfo) => {
  return ` 

    <div class="container-country-main">
    <img
      class="img-country-flag"
      src="${countryInfo.flags.svg}"
    />
    <div class="container-country-lower-section">
      <div class="country-name-region-container">
        <h2>${countryInfo.name}</h2>
        <h3>${countryInfo.region}</h3>
      </div>
      <div class="country-info-container">
        <p>💬 ${countryInfo.languages[0].name}</p>
        <p>💰 ${countryInfo.currencies[0].code}</p>
  <p>👬 ${(countryInfo.population / 1000000).toFixed(2)} M</p>
      </div >
    </div >
  </div > `
}



const getCountry = (countryName) => {
  fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then(response => response.json())
    .then(data => mainContainer.insertAdjacentHTML('beforeend', countryHtmlStructure(data[0])))

}

input.addEventListener('keypress', function (e) {
  if (e.key === "Enter") e.preventDefault()
  if (e.key === "Enter") {
    console.log(input.value);
    getCountry(input.value)
    input.value = ''
  }
})





