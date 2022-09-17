const checkbox = document.getElementById('checkbox')
const darkModeIcon = document.getElementById('darkmodeicon')
const link = document.querySelector('a')

checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark')
    darkModeIcon.classList.toggle('dark')       //DARK MODE TOGGLE
    link.classList.toggle('dark')
})

let API_KEY = {
    appID: '951ae4d28175a0f119122e34d7af3d6a'   //API KEY
}

window.addEventListener('load', () => {     //WEATHER FETCHER

    let longitude
    let latitude

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            longitude = position.coords.longitude
            latitude = position.coords.latitude

            //Async / Await and Fetch Function

            async function getWeather(latitude, longitude) {

                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY.appID}&units=metric`)

                response = await response.json()

                // console.log(response)

                let date = new Date()   //DATE

                document.getElementById('city').textContent = `${response.name},`     //City

                document.getElementById('country').textContent = `${response.sys.country}`    //Country

                document.getElementById('date').textContent = `${date.toDateString()}`  //Date

                let temp = Math.floor(response.main.temp)   //Temp
                document.getElementById('temperature').textContent = `${temp}`

                document.getElementById('unit-el').textContent = `°C`

                document.getElementById('desc').textContent = `${response.weather[0].description}`  //Weather Description

                document.getElementById('weather-con-icon').src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png` //Weather Icon

                let windSpeed = Math.floor((response.wind.speed) * (3.6))   //Wind Speed Conversion
                document.getElementById('wind-details').textContent = `Wind: ${windSpeed} km/h` //Wind Speed

                document.getElementById('humidity-details').textContent = `Humidity: ${response.main.humidity} %`   //Humidity

                let feelsLike = Math.floor(response.main.feels_like)    //Feels Like
                document.getElementById('feels-like-details').textContent = `Feels Like: ${feelsLike} °C`

            }

            getWeather(latitude, longitude) //Get Weather Call

        })
    } else {
        window.alert(`Your Browser Version Don't Support`)
    }

})