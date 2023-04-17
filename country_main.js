const getCountry = (countryName) => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            console.log(data[0].capital);
        })
}

getCountry('poland')