
console.log('test')


const urlCountry = "http://api.countrylayer.com/v2/all?access_key=a7c296ec8570570392adcac247888040";
let responseCountry = await fetch(urlCountry)
let jsonObjectCountry= await responseCountry.json()

console.log(responseCountry)
console.log(jsonObjectCountry)



const urlFlag = "https://rapidapi.com/salnazi/api/country-geo-codes/"
let responseFlag = await fetch(urlFlag)
let jsonObjectFlag= await responseCountry.json()

console.log(responseCountry)
console.log(jsonObjectFlag)