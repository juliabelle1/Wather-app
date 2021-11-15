const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "a9dda1e4cf73a749f684774240a3472c"
}

const input = document.querySelector('#input');
const button = document.querySelector('.btn');



input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13){
        getInfo(input.value);
        input.value = '';
        input.focus();
    } 
});


button.addEventListener('click',(e)=>{
    e.preventDefault();
    getInfo(input.value);
    input.value = '';
    input.focus();
})




async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`)
    const result = await res.json();

    console.log(result);
    displayResult(result);

    // console.log(result.sys.country)
    // console.log(result.weather[0].icon)
    // console.log(result.weather[0].description)
}

function displayResult(result){
    let city = document.querySelector('#city');
    city.innerText = `${result.name}, ${result.sys.country}`;
    //Date

    getOurDate();


    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°C</span>`;

    let icon = document.querySelector('.icon');
    icon.style.background = `url('https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png')`
    

    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = `<span>Feels like: </span>${Math.round(result.main.feels_like)}<span>°C</span>`;

    let conditions = document.querySelector('#conditions');
    conditions.textContent = `${result.weather[0].main}`;

    let variation = document.querySelector('#variation');
    variation.innerHTML = `<span>Min: </span>${Math.round(result.main.temp_min)}<span>°C Max: </span>${Math.round(result.main.temp_max)}<span>°C</span>`
}


function getOurDate() {
    //todays day
    const myDate = new Date();

    //day 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[myDate.getDay()];
    
    //date
    let todayDate = myDate.getDate();

    //month
    
    let month = months[myDate.getMonth()];

    //year

    let year = myDate.getFullYear();

    let showDate = document.querySelector('#date');
    showDate.textContent = `${day} ${todayDate} ${month} ${year}`;
    // showDate.innerText = `${day}` + ' ' + `${todayDate}` + ' ' + `${month}` + ' ' + `${year}`;
}



// window.addEventListener('load', () => {
//     let lat;
//     let lon;

//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((pos) => {
//         console.log(pos);

//         lat = pos.coords.latitude;
//         lon = pos.coords.longitude;

//         let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;
//         getInfo(url)
//         .then(result => {
//             displayResult(result);
//         })
//         }, (err) => {
//         city.innerText = err.message;
//         console.log(err);
//         })
//     }

// })