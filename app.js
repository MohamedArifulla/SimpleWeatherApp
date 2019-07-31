window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let degreeSection = document.querySelector(".degree-section");
    let degreeSpan = document.querySelector(".degree-section span");
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/3e0086306ea17bdab990a7d5f9e31048/${lat},${long}`;
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, summary,icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                let celsius = (temperature - 32) / 1.8 ;
                setIcons(icon,document.querySelector(".icon"));

                degreeSection.addEventListener('click',()=>{
                    if(degreeSpan.textContent === 'F'){
                        degreeSpan.textContent = 'C';
                        return temperatureDegree.textContent =  Math.floor(celsius);
                        
                    }
                    else{
                        degreeSpan.textContent = 'F';
                        return temperatureDegree.textContent =  temperature;
                    }
                });
            })
        });
    }
    function setIcons(icon, iconID){
    console.log(icon,iconID);
    
    let skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);
    }
})