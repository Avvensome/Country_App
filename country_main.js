// Select all elements and inputs
const input = document.querySelector('input')
const mainContainer = document.querySelector('.container-main')
// get value from input
console.log(input);
input.addEventListener('keypress', function (e) {
  if (e.key === "Enter") e.preventDefault()
  if (e.key === "Enter") {
    mainContainer.textContent = ""
    getCountry(input.value)
    input.value = ''
  }
})


const countryHtmlStructure = (countryInfo, neighbour = "") => {
  return ` 
    <div class="container-country-main-${neighbour}">
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
  // Main Country
  fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
      mainContainer.insertAdjacentHTML('beforeend', countryHtmlStructure(data[0]))
      const borderCountries = data[0].borders.map(border => {
        return fetch(`https://restcountries.com/v2/alpha/${border}`).then(response => response.json());
      });
      return Promise.all(borderCountries)
    }).then(borderCountries => {
      borderCountries.forEach(e => {
        mainContainer.insertAdjacentHTML('beforeend', countryHtmlStructure(e))
      })
    })

}
// getCountry('Poland')
// getCountryTest('POL')



