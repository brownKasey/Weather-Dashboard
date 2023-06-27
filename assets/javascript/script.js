let inputEl = document.querySelector("#city-input");
let buttonEl = document.querySelector(".search-button");
let clearButtonEl = document.querySelector(".clear-button");
let prevResult = document.querySelector(".prev-result");
let resultLinkEl = document.querySelector(".resultlink");

let getUserInput = () => {
    //trims the input
    let cityInput = inputEl.value.trim();
    //testing to see if input is grabbed
    //console.log(cityInput);
    if(cityInput){
        getCityCoor(cityInput);
        saveUserInput(cityInput);
        //clears search bar after search
        inputEl.value = '';
    } else {
        window.alert("oopsy whoopsy poopsy, please enter a city name!");
    }

}


let clearResults = () => {
    localStorage.clear();
    prevResult.innerHTML = "";

}
let addLink = (url) =>{
    resultLinkEl.href = url;
}
let saveUserInput = (cityInput,url) =>{
    //console.log('localstorage '+  cityInput);
    localStorage.setItem('City', cityInput);
    prevResult.innerHTML = localStorage.getItem('City');

}
let checkLastResult = () =>{
    if (localStorage.getItem('City') != null){
        localStorage.getItem('City');
        prevResult.innerHTML = localStorage.getItem('City');
    } else {
        prevResult.innerHTML = '';
    }
}
let getCityCoor = () =>{
    let cityInput = inputEl.value.trim();
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput +'&appid=f68ce108c8495538ae1a0107b692b524';
    //console.log(url);
    fetch(url).then(function (response){
          return response.json();
    })
    .then(function (data){
        let latitude = data.coord.lat;
        let longitude = data.coord.lon;
        console.log(latitude);
        console.log(longitude);
        getWeatherData(latitude, longitude);

    })
}

let getWeatherData = (latitude, longitude) =>{
  //  console.log('testing'+ latitude + longitude);
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&' + 'lon=' + longitude + '&appid=f68ce108c8495538ae1a0107b692b524' + '&units=imperial';
   // console.log(url);
    fetch(url)
    .then(function (response){
        if(!response.ok){
           throw Error(response.statusText);
        }{
          return response.json();
        }
    })
    .then(function (data){
       // console.log(data);
        displayWeather(data);
        displayForecast(data);
       // addLink(url);
    })
}

let displayWeather = (data) =>{
    let cityEl = document.querySelector(".city-name");
    let tempEl = document.querySelector(".temp");
    let windEl = document.querySelector(".wind");
    let humidityEl = document.querySelector(".humidity");
    let tempFahr = Math.round(data.list[0].main.temp);
    let date = data.list[0].dt_txt
    date = date.substring(0, date.indexOf(' '));
    cityEl.innerHTML = data.city.name + ' ' + date;
    
    tempEl.innerHTML = tempFahr + "&#176" + "F";
    windEl.innerHTML = data.list[0].wind.speed + " MPH";
    humidityEl.innerHTML = data.list[0].main.humidity + "%";
}
//definitely a better way to do this but oh well :/
let displayForecast = (data) =>{
    //first card
    let tempEl = document.querySelector(".temp-card");
    let windEl = document.querySelector(".wind-card");
    let humidityEl = document.querySelector(".humidity-card");
    let dateEl = document.querySelector(".date");
    let tempFahr = Math.round(data.list[7].main.temp);
    let dateStr = data.list[7].dt_txt;
    dateEl.innerHTML = dateStr.substring(0, dateStr.indexOf(' '));
    tempEl.innerHTML = tempFahr + "&#176" + "F";
    windEl.innerHTML = data.list[7].wind.speed + " MPH";
    humidityEl.innerHTML = data.list[7].main.humidity + "%";
    //second card
    let tempEl2 = document.querySelector(".temp-card2");
    let windEl2 = document.querySelector(".wind-card2");
    let humidityEl2 = document.querySelector(".humidity-card2");
    let dateEl2 = document.querySelector(".date2");
    let tempFahr2 = Math.round(data.list[15].main.temp);
    let dateStr2 = data.list[15].dt_txt;
    dateEl2.innerHTML = dateStr2.substring(0, dateStr2.indexOf(' '));
    tempEl2.innerHTML = tempFahr2 + "&#176" + "F";
    windEl2.innerHTML = data.list[15].wind.speed + " MPH";
    humidityEl2.innerHTML = data.list[15].main.humidity + "%";
    //third card
    let tempEl3 = document.querySelector(".temp-card3");
    let windEl3 = document.querySelector(".wind-card3");
    let humidityEl3 = document.querySelector(".humidity-card3");
    let dateEl3 = document.querySelector(".date3");
    let tempFahr3 = Math.round(data.list[23].main.temp);
    let dateStr3 = data.list[23].dt_txt;
    dateEl3.innerHTML = dateStr3.substring(0, dateStr3.indexOf(' '));
    tempEl3.innerHTML = tempFahr3 + "&#176" + "F";
    windEl3.innerHTML = data.list[23].wind.speed + " MPH";
    humidityEl3.innerHTML = data.list[23].main.humidity + "%";
    //fourth card
    let tempEl4 = document.querySelector(".temp-card4");
    let windEl4 = document.querySelector(".wind-card4");
    let humidityEl4 = document.querySelector(".humidity-card4");
    let dateEl4 = document.querySelector(".date4");
    let tempFahr4 = Math.round(data.list[31].main.temp);
    let dateStr4 = data.list[31].dt_txt;
    dateEl4.innerHTML = dateStr4.substring(0, dateStr4.indexOf(' '));
    tempEl4.innerHTML = tempFahr4 + "&#176" + "F";
    windEl4.innerHTML = data.list[31].wind.speed + " MPH";
    humidityEl4.innerHTML = data.list[31].main.humidity + "%";
    //fifth card
    let tempEl5 = document.querySelector(".temp-card5");
    let windEl5 = document.querySelector(".wind-card5");
    let humidityEl5 = document.querySelector(".humidity-card5");
    let dateEl5 = document.querySelector(".date5");
    let tempFahr5 = Math.round(data.list[39].main.temp);
    let dateStr5 = data.list[39].dt_txt;
    dateEl5.innerHTML = dateStr5.substring(0, dateStr5.indexOf(' '));
    tempEl5.innerHTML = tempFahr5 + "&#176" + "F";
    windEl5.innerHTML = data.list[39].wind.speed + " MPH";
    humidityEl5.innerHTML = data.list[39].main.humidity + "%";




}
window.onload = checkLastResult();

//search button *_^

buttonEl.addEventListener('click', getUserInput);
clearButtonEl.addEventListener('click', clearResults);
//f68ce108c8495538ae1a0107b692b524