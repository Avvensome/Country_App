// Select all elements and inputs
const body = document.querySelector('body')
const header = document.querySelector('header')
// Country Container
const mainContainer = document.querySelector('.container-main')
const containerCountry = document.querySelector('.container-country-main-')
// Header
const logo = document.querySelector('.app-logo')
const input = document.querySelector('input')
const colorSwitcher = document.querySelector('header button')
// Pop-up-window
const filterIcon = document.querySelector('.filter-icon')
const popupWindow = document.querySelector('.pop-up-window ')
const checkBoxes = document.querySelectorAll('.pop-up-window input[type="checkbox"]')
// Local Storage
let theme = localStorage.getItem('theme') || "light"
// get value from input
// buttons,inputs
input.addEventListener('keypress', function (e) {
  if (e.key === "Enter") e.preventDefault()
  if (e.key === "Enter") {
    mainContainer.textContent = ""
    getCountry(input.value)
    input.value = ''
  }
})
// Logo
logo.addEventListener('click', () => window.location.reload())
// Pop-up window
filterIcon.addEventListener('click', () => popupWindow.classList.toggle('pop-up-window-hide'))
window.addEventListener('click', (event) => {
  if (!popupWindow.contains(event.target) && !event.target.matches('.filter-icon')) {
    popupWindow.classList.add('pop-up-window-hide');
  }
});
// Local Storage Color Theme
colorSwitcher.addEventListener('click', () => {
  if (theme === "dark") {
    body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    mainContainer.classList.remove('dark-mode');
    theme = "light"
    filterIcon.src = `Icons/pngegg.png`
  } else {
    body.classList.add('dark-mode');
    header.classList.add('dark-mode');
    mainContainer.classList.add('dark-mode');
    theme = "dark"
    filterIcon.src = `Icons/pngegg_w.png`
  }
  localStorage.setItem('theme', theme)
})
if (theme === "dark") {
  body.classList.add('dark-mode');
  header.classList.add('dark-mode');
  mainContainer.classList.add('dark-mode');
}
// Main Structure
const countryHtmlStructure = (countryInfo) => {
  return ` 
    <div class="container-country-main-" id="country-main">
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
        <p class="languages">💬 ${countryInfo.languages[0].name}</p>
        <p class="currencies">💰 ${countryInfo.currencies[0].code}</p>
        <p class="population">👬 ${(countryInfo.population / 1000000).toFixed(2)} M</p>
        <p class="capital">🏙️ ${countryInfo.capital}</p>
        <p class="timezones">⏱${countryInfo.timezones[0]}</p>
        <p class="map-info">🗺️<${(countryInfo.latlng[0].toFixed(0))},${(countryInfo.latlng[1].toFixed(0))}></p>
      </div >
    </div >
  </div > `
}
// Render Main Structure
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
      // Render Neigboour 
    }).then(borderCountries => {
      borderCountries.forEach(e => { mainContainer.insertAdjacentHTML('beforeend', countryHtmlStructure(e)) })
    })

}
getCountry('Poland')



checkBoxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', (e) => {
    const data = checkbox.id
    const i = index
    const containerCountryLowerSection = document.querySelectorAll('.country-info-container')
    if (containerCountryLowerSection.length = 0) return
    if (containerCountryLowerSection.length > 1) {
      containerCountryLowerSection.forEach((e) => e.children[i].style.display = "none")
    }
  });
})


