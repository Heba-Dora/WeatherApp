import React, {useState} from 'react';



const WeatherApp = () => {
    const [weather, setWeather] = useState({})
    const [qry, setQry] = React.useState('')


   

const iconUrl = "http://openweathermap.org/img/wn/" + `${weather.weather ? weather?.weather[0].icon:null}` + ".png"


    const searchbar = event => {
        if (event.key === "Enter") {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${qry}&units=metric&APPID=39e826f4f99dbd91c25f72e6b40753f7`
            fetch(url)
            .then(res => res.json())
            .then(result => {
                
                setWeather(result);
                setQry('');
                console.log(result)
            })
        }
    }


    const dateFinder = (dt) => {
        let months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December", 
        ]
        let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
         "Thursday", "Friday", "Saturday", 
        ]


        let day = days[dt.getDay()];
        let date = dt.getDate();
        let month = months[dt.getMonth()]
        let year = dt.getFullYear();

        return `${day} ${date} ${month} ${year}`
}


    return(
        <div>
            
         
        

            <div className='searchField'>
                <input className="searchBar" type="text" placeholder="Get Weather" onChange={e => setQry(e.target.value)} value={qry} onKeyPress={searchbar}/>
            </div> 
            {(typeof weather.main != "undefined") ? (
                <div>
                    <div className="weather-text">
                        <div className="country">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dateFinder(new Date())}</div>
                        <div className="temperature">{Math.round(weather.main.temp)}°C</div>
                         <h5 className="minmax">
                            <span className="min">{Math.round(weather.main.temp_min)}°C</span> 
                            <span className="max">{Math.round(weather.main.temp_max)}°C</span> 
                        </h5>
                        <div className="weather">{weather.weather[0].main}</div>
                        <img className="image" src={iconUrl} alt= ""/>
                        </div>
                        
                </div>

            ): ('')}          
            
        
        </div>
        
    )

}

export default WeatherApp;