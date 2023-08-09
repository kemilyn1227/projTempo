
const apiKey = 'ca2a57ee7ac2b3da2f0439450a3ed7ff'

const apiCountryURL = 'https://flagsapi.com/flat/64.png'

const cityInput= document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')
const extra = document.querySelector('div #city2')
const extra2= document.querySelector('div #city1')

const weatherContainer = document.querySelector('#wheather-data')

//funcoes

const getWheatherData = async(city)=>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)//fetch devolve a pormessa
    const data = await res.json()

    return data
}

const showWheatherData = async(city)=>{
    
    const data = await getWheatherData(city)

    cityElement.innerHTML = data.name
    tempElement.innerHTML = parseInt(data.main.temp) //tranforma em numero
    descElement.innerHTML = data.weather[0].description
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)

    humidityElement.innerHTML =`${data.main.humidity}%`
    windElement.innerHTML = `${data.wind.speed}km/h`

    weatherContainer.classList.remove('hide')


}

function fun(arg){
    extra.classList.add('hide')
    extra2.classList.add('hide')
    showWheatherData(arg)
}

//eventos

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault() //previne que o evento tente abrir outra pagina
    const city = cityInput.value
    showWheatherData(city)
})

cityInput.addEventListener('keyup',(e)=>{
    if(e.code ==='Enter'){
        const city = e.target.value
        showWheatherData(city)
    }
})
