import { useState } from "react";
import "./App.css";
import imgWeather_1 from "./assets/01n.png";
import imgWeather_2 from "./assets/02n.png";
import imgWeather_3 from "./assets/03n.png";
import imgWeather_4 from "./assets/04n.png";
import imgWeather_5 from "./assets/09n.png";
import imgWeather_6 from "./assets/10n.png";
import imgWeather_7 from "./assets/11n.png";
import imgWeather_8 from "./assets/13n.png";
import imgWeather_9 from "./assets/50n.png";

function App() {
  // const api_key = "b52d8ff316ffedb5ca3dd4d1969f104b";
  const api_key = "4beeb46467524704aac214319230110";
  const [city, setCity] = useState('Sin Ciudad')
  const [temp, setTemp] = useState('0')
  const [flag, setFlag] = useState('https://flagsapi.com/BE/shiny/64.png')
  const [wind, setWind] = useState('0')
  const [windG, setWindG] = useState('0')
  const [windDir, setwindDir] = useState('N')
  const [humidity, setHumidity] = useState('0')
  const [cloud, setCloud] = useState('0')
  const [pressure, setPressure] = useState('0')
  const [estate, setEstate] = useState('0')


  const imgWeather = {
    "01n": imgWeather_1,
    "02n": imgWeather_2,
    "03n": imgWeather_3,
    "04n": imgWeather_4,
    "09n": imgWeather_5,
    "10n": imgWeather_6,
    "11n": imgWeather_7,
    "13n": imgWeather_8,
    "50n": imgWeather_9,
    "01d": imgWeather_1,
    "02d": imgWeather_2,
    "03d": imgWeather_3,
    "04d": imgWeather_4,
    "09d": imgWeather_5,
    "10d": imgWeather_6,
    "11d": imgWeather_7,
    "13d": imgWeather_8,
    "50d": imgWeather_9
  }
  
  const [weather, setWeather] = useState(imgWeather["01n"])

  const search = async (e) => {
    if (e.key == 'Enter') {
      const valCity = e.target.value
      let URL = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${valCity}&days=5&lang=es`
      // let URL_contries = `https://flagsapi.com/${}/shiny/64.png`
      let response = await fetch(URL)
      let data = await response.json()

      let selectFlag = data.location.country.substring(0,2).toUpperCase()

      setCity(data.location.name +'/'+ data.location.region)
      setFlag(`https://flagsapi.com/${selectFlag}/shiny/64.png`)
      setTemp(data.current.temp_c)
      setWind(data.current.wind_kph)
      setWindG(data.current.wind_degree)
      setwindDir(data.current.wind_dir)
      setHumidity(data.current.humidity)
      setCloud(data.current.cloud)
      setPressure(data.current.pressure_in)
      setEstate(data.current.condition.text)
    }
  };

  return (
    <>
      <div className="container">
        <section className="big">
          <label htmlFor="search" className="box-search">
            <input
              type="text"
              id="search"
              placeholder="Ciudad/Pais"
              onKeyDown={(e) => {
                search(e);
              }}
            />
          </label>

          <div className="box-weather">
            <div className="data">
              <div className="location">
                <h2>{city}</h2>
                <figure>
                  <img src={flag} alt="flag" />
                </figure>
              </div>
              <h3>Pais/Ciudad</h3>
              <span>{temp} °C</span>
            </div>
            <div className="img">
              <figure className="figure">
                <img src={weather} alt="imagen estado del clima" />
              </figure>
            </div>
          </div>

          <article className="box-today">
            <span>Clima de hoy</span>
            <div></div>
          </article>

          <article className="box-wind">
            <span>Condiciones de viento</span>
            <div className="content">
              <div className="condition">
                <h2>Condición</h2>
                <span>{estate}</span>
              </div>
              <div className="wind">
                <div>
                  <h2>Velocidad</h2>
                  <span>{wind} Km/h</span>
                </div>
                <div>
                  <h2>Dirección</h2>
                  <span>{windG}° Grados</span>
                </div>
                <div>
                  <h2>Dirección °</h2>
                  <span>{windG}° Grados</span>
                </div>
              </div>
              <div className="box-brujula">
                <h2>Dirección en brujula</h2>
                <div className="data">
                  <span>{windDir}</span>
                  <svg class="pl" viewBox="0 0 160 160" width="160px" height="160px" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#000"></stop>
              <stop offset="100%" stop-color="#fff"></stop>
            </linearGradient>
            <mask id="mask1">
              <rect x="0" y="0" width="160" height="160" fill="url(#grad)"></rect>
            </mask>
            <mask id="mask2">
              <rect x="28" y="28" width="104" height="104" fill="url(#grad)"></rect>
            </mask>
          </defs>
          
          <g>
            <g class="pl__ring-rotate">
              <circle class="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(223,90%,55%)" stroke-width="16" stroke-dasharray="452.39 452.39" stroke-dashoffset="452" stroke-linecap="round" transform="rotate(-45,80,80)"></circle>
            </g>
          </g>
          <g mask="url(#mask1)">
            <g class="pl__ring-rotate">
              <circle class="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(193,90%,55%)" stroke-width="16" stroke-dasharray="452.39 452.39" stroke-dashoffset="452" stroke-linecap="round" transform="rotate(-45,80,80)"></circle>
            </g>
          </g>
          
          <g>
            <g stroke-width="4" stroke-dasharray="12 12" stroke-dashoffset="12" stroke-linecap="round" transform="translate(80,80)">
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
            </g>
          </g>
          <g mask="url(#mask1)">
            <g stroke-width="4" stroke-dasharray="12 12" stroke-dashoffset="12" stroke-linecap="round" transform="translate(80,80)">
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
              <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
            </g>
          </g>
          
          <g>
            <g transform="translate(64,28)">
              <g class="pl__arrows" transform="rotate(45,16,52)">
                <path fill="hsl(3,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
                <path fill="hsl(223,10%,90%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
              </g>
            </g>
          </g>
          <g mask="url(#mask2)">
            <g transform="translate(64,28)">
              <g class="pl__arrows" transform="rotate(45,16,52)">
                <path fill="hsl(333,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
                <path fill="hsl(223,90%,80%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
              </g>
            </g>
          </g>
                  </svg>
                </div>
              </div>
              <div className="wind">
                <div>
                  <h2>Humedad</h2>
                  <span>{humidity} %</span>
                </div>
                <div>
                  <h2>Porcentaje de nuves</h2>
                  <span>{cloud} %</span>
                </div>
                <div>
                  <h2>Presión</h2>
                  <span>{pressure} Pulgadas</span>
                </div>
              </div>
              <div></div>
            </div>
          </article>
        </section>

        <section className="mid">
          <span>Clima de la semana</span>
        </section>
      </div>
    </>
  );
}

export default App;
