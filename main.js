const cityInput = document.querySelector('.inputField')
const btn = document.querySelector('.btn')
const cities = document.querySelector('.cities')
const key = "b767526cafd8a01595292d3b04d679ef"
const api = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru"

if (localStorage.getItem("default")){
    cities.innerHTML = localStorage.getItem("weather")
}

async function weather(city){
    const response = await fetch( `${api}&appid=${key}&q=${city}`)
    let data = await response.json()
    if (data.cod != 200){
        console.log("0")
        cityInput.value = ""
        cityInput.placeholder="Город не найден, попробуйте еще раз"
        setTimeout(()=>{
            cityInput.placeholder = "Введите город"
        }, 3000)
    }
    else{
        createCard(data)
        console.log(data)
        console.log("1")
        localStorage.setItem('weather', cities.innerHTML)
        cityInput.value = ""

    }
}

cityInput.addEventListener('keyup', event =>{
    if (event.code == 'Enter'){
        let city = cityInput.value
        weather(city)
    }
})

btn.addEventListener('click', function(){
    let city = cityInput.value
    weather(city)
})

function createCard(data){
    let container = document.createElement('div')
    container.setAttribute('class', 'container')
    cities.appendChild(container)

    let card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('draggable', 'true')
    container.appendChild(card)

    let cityName = document.createElement('div')
    cityName.innerHTML = data.name
    cityName.setAttribute('class', 'name')
    card.appendChild(cityName)

    let tempContainer = document.createElement('div')
    tempContainer.setAttribute('class', 'tempContainer')
    card.appendChild(tempContainer)

    let temp = document.createElement('div')
    temp.innerHTML = data.main.temp + "°C"
    setInterval(()=>{
        temp.innerHTML = data.main.temp + "°C"
    }, 1000)
    tempContainer.appendChild(temp)

    let icon = document.createElement('img')
    icon.setAttribute('src', `img/${data.weather[0].main}.png`)
    icon.setAttribute('class', 'icon')
    console.log(`img/${data.weather[0].main}.png`)
    card.appendChild(icon)

    let main = document.createElement('em')
    main.innerHTML = data.weather[0].description
    card.appendChild(main)

    let maxMin = document.createElement('div')
    maxMin.innerHTML = data.main.temp_max + "°C/" + data.main.temp_min + "°C"
    card.appendChild(maxMin)

    let feelsLike = document.createElement('div')
    feelsLike.innerHTML ="ощущается как" + data.main.feels_like + "°C"
    card.appendChild(feelsLike)

    let values = document.createElement('div')
    values.setAttribute('class', 'values')
    card.appendChild(values)

    let wind = document.createElement('div')
    wind.setAttribute('class', 'val')
    values.appendChild(wind)
    let windImg = document.createElement('img')
    windImg.setAttribute('class', 'valIcon')
    windImg.setAttribute('src', 'img/wind.png')
    wind.appendChild(windImg)
    let windData = document.createElement('div')
    windData.innerHTML = data.wind.speed + " м/с"
    wind.appendChild(windData)

    let pressure = document.createElement('div')
    pressure.setAttribute('class', 'val')
    values.appendChild(pressure)
    let pressureImg = document.createElement('img')
    pressureImg.setAttribute('class', 'valIcon')
    pressureImg.setAttribute('src', 'img/pressure.png')
    pressure.appendChild(pressureImg)
    let pressureData = document.createElement('div')
    pressureData.innerHTML = data.main.pressure + " мм."
    pressure.appendChild(pressureData)

    let humidity = document.createElement('div')
    humidity.setAttribute('class', 'val')
    values.appendChild(humidity)
    let humidityImg = document.createElement('img')
    humidityImg.setAttribute('class', 'valIcon')
    humidityImg.setAttribute('src', 'img/humidity.png')
    humidity.appendChild(humidityImg)
    let humidityData = document.createElement('div')
    humidityData.innerHTML = data.main.humidity + "%"
    humidity.appendChild(humidityData)


    let closeBtn = document.createElement('div')
    closeBtn.innerHTML = 'x'
    closeBtn.setAttribute('class', 'close')
    card.appendChild(closeBtn)
    let deleteBtn = document.querySelectorAll('.close')
    deleteBtn.forEach(btn =>{
        btn.addEventListener('click', function() {
            this.parentElement.parentElement.remove()
            localStorage.setItem('weather', cardList.innerHTML)
        })
    })
    //dragAndDrop()
}

let deleteBtn = document.querySelectorAll('.close')
deleteBtn.forEach(btn =>{
    btn.addEventListener('click', function() {
        this.parentElement.parentElement.remove()
        localStorage.setItem('weather', cities.innerHTML)
    })
})

dragAndDrop()

function dragAndDrop() {
    let items = document.querySelectorAll('.card')
    let cells = document.querySelectorAll('.container')
    let lastItem
    let lastCell
    items.forEach(item => {
        item.addEventListener('dragstart', function () {
            setTimeout(() => {
                this.style.display = 'none';
                lastItem = this
                lastCell = this.parentElement
            }, 0)
        })
        item.addEventListener('dragend', function () {
            item.style.display = 'flex'
            localStorage.setItem('default', cardList.innerHTML)
        })
    })

    cells.forEach(cell => {
        cell.addEventListener('dragover', function (e) {
            e.preventDefault()
        })
        cell.addEventListener('dragenter', function () {
            lastCell.appendChild(cell.children[0])
            cell.appendChild(lastItem)
        })
        cell.addEventListener('dragleave', function () {
            lastCell = cell
        })
        cell.addEventListener('drop', function () {
            cell.appendChild(lastItem)
            cell.style.border = '0'
        })
    })
}