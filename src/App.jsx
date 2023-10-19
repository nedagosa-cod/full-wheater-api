import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  // const api_key = "b52d8ff316ffedb5ca3dd4d1969f104b";
  const defaultImg = "https://cdn.weatherapi.com/weather/64x64/day/116.png";
  const container = useRef()

  const [icon, setIcon] = useState(defaultImg);
  const [city, setCity] = useState("Sin Ciudad");
  const [temp, setTemp] = useState("0");
  const [flag, setFlag] = useState("https://flagsapi.com/BE/shiny/64.png");
  const [wind, setWind] = useState("0");
  const [windG, setWindG] = useState("0");
  const [windDir, setwindDir] = useState("N");
  const [humidity, setHumidity] = useState("0");
  const [cloud, setCloud] = useState("0");
  const [pressure, setPressure] = useState("0");
  const [estate, setEstate] = useState("0");

  // #region data clima del dia
  const [timeA, setTimeA] = useState("00:00");
  const [condiA, setCondiA] = useState("No hay datos");
  const [imgA, setImgA] = useState(defaultImg);

  const [timeB, setTimeB] = useState("00:00");
  const [condiB, setCondiB] = useState("No hay datos");
  const [imgB, setImgB] = useState(defaultImg);

  const [timeC, setTimeC] = useState("00:00");
  const [condiC, setCondiC] = useState("No hay datos");
  const [imgC, setImgC] = useState(defaultImg);

  const [timeD, setTimeD] = useState("00:00");
  const [condiD, setCondiD] = useState("No hay datos");
  const [imgD, setImgD] = useState(defaultImg);

  const [timeE, setTimeE] = useState("00:00");
  const [condiE, setCondiE] = useState("No hay datos");
  const [imgE, setImgE] = useState(defaultImg);

  // data clima week
  const [timeDayA, setTimeDayA] = useState("00:00");
  const [condiDayA, setCondiDayA] = useState("No hay datos");
  const [imgDayA, setImgDayA] = useState(defaultImg);

  const [timeDayB, setTimeDayB] = useState("00:00");
  const [condiDayB, setCondiDayB] = useState("No hay datos");
  const [imgDayB, setImgDayB] = useState(defaultImg);

  const [timeDayC, setTimeDayC] = useState("00:00");
  const [condiDayC, setCondiDayC] = useState("No hay datos");
  const [imgDayC, setImgDayC] = useState(defaultImg);

  const [timeDayD, setTimeDayD] = useState("00:00");
  const [condiDayD, setCondiDayD] = useState("No hay datos");
  const [imgDayD, setImgDayD] = useState(defaultImg);

  const [timeDayE, setTimeDayE] = useState("00:00");
  const [condiDayE, setCondiDayE] = useState("No hay datos");
  const [imgDayE, setImgDayE] = useState(defaultImg);
  // #endregion


  const search = async (e) => {
    try {
      if (e.key == "Enter") {
        const valCity = e.target.value;
  
        const apiKeyWeather = "4beeb46467524704aac214319230110";
        const apiKeyCityImg = "J7DB6GismTaGJppAIhHIu6UkR0UQXiow6OeKj7MHphBLLZmCPKRAuchf";
        let endPointWeather = `https://api.weatherapi.com/v1/forecast.json?key=${apiKeyWeather}&q=${valCity}&days=6&lang=es`;
        const endPointCityImg = `https://api.pexels.com/v1/search?query=${valCity}`;
  
        let resWeather = await fetch(endPointWeather);
        let data = await resWeather.json();
        
        const resCityImg = await fetch(endPointCityImg, {
          method: "GET",
          headers: {
            Authorization: apiKeyCityImg,
            "Content-Type": "application/json",
          },
        });
        const resDataImg = await resCityImg.json();
        console.log(data)

        // #region asigna valores a variables
        let selectFlag = data.location.country.substring(0, 2).toUpperCase();
        setCity(data.location.name + "/" + data.location.region);
        setIcon(data.current.condition.icon);
        setFlag(`https://flagsapi.com/${selectFlag}/shiny/64.png`);
        setTemp(data.current.temp_c);
        setWind(data.current.wind_kph);
        setWindG(data.current.wind_degree);
        setwindDir(data.current.wind_dir);
        setHumidity(data.current.humidity);
        setCloud(data.current.cloud);
        setPressure(data.current.pressure_in);
        setEstate(data.current.condition.text);
  
        // data clima del dia
        setTimeA(data.forecast.forecastday[0].hour[6].time.split(" ")[1]);
        setCondiA(data.forecast.forecastday[0].hour[6].condition.text);
        setImgA(data.forecast.forecastday[0].hour[6].condition.icon);
  
        setTimeB(data.forecast.forecastday[0].hour[9].time.split(" ")[1]);
        setCondiB(data.forecast.forecastday[0].hour[9].condition.text);
        setImgB(data.forecast.forecastday[0].hour[9].condition.icon);
  
        setTimeC(data.forecast.forecastday[0].hour[12].time.split(" ")[1]);
        setCondiC(data.forecast.forecastday[0].hour[12].condition.text);
        setImgC(data.forecast.forecastday[0].hour[12].condition.icon);
  
        setTimeD(data.forecast.forecastday[0].hour[17].time.split(" ")[1]);
        setCondiD(data.forecast.forecastday[0].hour[17].condition.text);
        setImgD(data.forecast.forecastday[0].hour[17].condition.icon);
  
        setTimeE(data.forecast.forecastday[0].hour[22].time.split(" ")[1]);
        setCondiE(data.forecast.forecastday[0].hour[22].condition.text);
        setImgE(data.forecast.forecastday[0].hour[22].condition.icon);
  
        // data clima de la week
        setCondiDayA(data.forecast.forecastday[1].day.condition.text);
        setTimeDayA(data.forecast.forecastday[1].date);
        setImgDayA(data.forecast.forecastday[1].day.condition.icon);
  
        setCondiDayB(data.forecast.forecastday[2].day.condition.text);
        setTimeDayB(data.forecast.forecastday[2].date);
        setImgDayB(data.forecast.forecastday[2].day.condition.icon);
  
        // setCondiDayC(data.forecast.forecastday[3].day.condition.text);
        // setTimeDayC(data.forecast.forecastday[3].date);
        // setImgDayC(data.forecast.forecastday[3].day.condition.icon);
  
        // setCondiDayD(data.forecast.forecastday[4].day.condition.text);
        // setTimeDayD(data.forecast.forecastday[4].date);
        // setImgDayD(data.forecast.forecastday[4].day.condition.icon);
  
        // setCondiDayE(data.forecast.forecastday[5].day.condition.text);
        // setTimeDayE(data.forecast.forecastday[5].date);
        // setImgDayE(data.forecast.forecastday[5].day.condition.icon);
        // #endregion cierra
        
        container.current.style.backgroundImage = `url(${resDataImg.photos[0].src.original})`;
      }
    } catch (error) {
      console.error(error)
    }

  };

  return (
    <>
      <div className="container" ref={container}>
        <section className="big">
          <label htmlFor="search" className="box-search">
            <input
              type="text"
              id="search"
              placeholder="Bogotá/Roma/Jalisco... Enter para buscar!"
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
                <img src={icon} alt="imagen estado del clima" />
              </figure>
            </div>
          </div>

          <article className="box-today">
            <span>Clima de hoy</span>
            <div className="hours">
              <div className="card">
                <figure>
                  <img src={imgA} alt="clima" />
                </figure>
                <p>{condiA}</p>
                <span>{timeA}</span>
              </div>
              <div className="card">
                <figure>
                  <img src={imgB} alt="clima" />
                </figure>
                <p>{condiB}</p>
                <span>{timeB}</span>
              </div>
              <div className="card">
                <figure>
                  <img src={imgC} alt="clima" />
                </figure>
                <p>{condiC}</p>
                <span>{timeC}</span>
              </div>
              <div className="card">
                <figure>
                  <img src={imgD} alt="clima" />
                </figure>
                <p>{condiD}</p>
                <span>{timeD}</span>
              </div>
              <div className="card">
                <figure>
                  <img src={imgE} alt="clima" />
                </figure>
                <p>{condiE}</p>
                <span>{timeE}</span>
              </div>
            </div>
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
                  <svg
                    className="pl"
                    viewBox="0 0 160 160"
                    width="160px"
                    height="160px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000"></stop>
                        <stop offset="100%" stopColor="#fff"></stop>
                      </linearGradient>
                      <mask id="mask1">
                        <rect
                          x="0"
                          y="0"
                          width="160"
                          height="160"
                          fill="url(#grad)"
                        ></rect>
                      </mask>
                      <mask id="mask2">
                        <rect
                          x="28"
                          y="28"
                          width="104"
                          height="104"
                          fill="url(#grad)"
                        ></rect>
                      </mask>
                    </defs>

                    <g>
                      <g className="pl__ring-rotate">
                        <circle
                          className="pl__ring-stroke"
                          cx="80"
                          cy="80"
                          r="72"
                          fill="none"
                          stroke="hsl(223,90%,55%)"
                          strokeWidth="16"
                          strokeDasharray="452.39 452.39"
                          strokeDashoffset="452"
                          strokeLinecap="round"
                          transform="rotate(-45,80,80)"
                        ></circle>
                      </g>
                    </g>
                    <g mask="url(#mask1)">
                      <g className="pl__ring-rotate">
                        <circle
                          className="pl__ring-stroke"
                          cx="80"
                          cy="80"
                          r="72"
                          fill="none"
                          stroke="hsl(193,90%,55%)"
                          strokeWidth="16"
                          strokeDasharray="452.39 452.39"
                          strokeDashoffset="452"
                          strokeLinecap="round"
                          transform="rotate(-45,80,80)"
                        ></circle>
                      </g>
                    </g>

                    <g>
                      <g
                        strokeWidth="4"
                        strokeDasharray="12 12"
                        strokeDashoffset="12"
                        strokeLinecap="round"
                        transform="translate(80,80)"
                      >
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(-135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(-90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(-45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(0,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,10%,90%)"
                          points="0,2 0,14"
                          transform="rotate(180,0,0) translate(0,40)"
                        ></polyline>
                      </g>
                    </g>
                    <g mask="url(#mask1)">
                      <g
                        strokeWidth="4"
                        strokeDasharray="12 12"
                        strokeDashoffset="12"
                        strokeLinecap="round"
                        transform="translate(80,80)"
                      >
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(-135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(-90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(-45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(0,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(45,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(90,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(135,0,0) translate(0,40)"
                        ></polyline>
                        <polyline
                          className="pl__tick"
                          stroke="hsl(223,90%,80%)"
                          points="0,2 0,14"
                          transform="rotate(180,0,0) translate(0,40)"
                        ></polyline>
                      </g>
                    </g>

                    <g>
                      <g transform="translate(64,28)">
                        <g className="pl__arrows" transform="rotate(45,16,52)">
                          <path
                            fill="hsl(3,90%,55%)"
                            d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"
                          ></path>
                          <path
                            fill="hsl(223,10%,90%)"
                            d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                    <g mask="url(#mask2)">
                      <g transform="translate(64,28)">
                        <g className="pl__arrows" transform="rotate(45,16,52)">
                          <path
                            fill="hsl(333,90%,55%)"
                            d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"
                          ></path>
                          <path
                            fill="hsl(223,90%,80%)"
                            d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"
                          ></path>
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
          <div className="box-card">
            <div className="card">
              <div className="data">
                <span>{condiDayA}</span>
                <p>{timeDayA}</p>
              </div>
              <figure>
                <img src={imgDayA} alt="clima" />
              </figure>
            </div>
            <div className="card">
              <div className="data">
                <span>{condiDayB}</span>
                <p>{timeDayB}</p>
              </div>
              <figure>
                <img src={imgDayB} alt="clima" />
              </figure>
            </div>
            <div className="card">
              <div className="data">
                <span>{condiDayC}</span>
                <p>{timeDayC}</p>
              </div>
              <figure>
                <img src={imgDayC} alt="clima" />
              </figure>
            </div>
            <div className="card">
              <div className="data">
                <span>{condiDayD}</span>
                <p>{timeDayD}</p>
              </div>
              <figure>
                <img src={imgDayD} alt="clima" />
              </figure>
            </div>
            <div className="card">
              <div className="data">
                <span>{condiDayE}</span>
                <p>{timeDayE}</p>
              </div>
              <figure>
                <img src={imgDayE} alt="clima" />
              </figure>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
