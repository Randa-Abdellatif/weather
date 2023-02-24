var formInput = document.querySelector('header form input');
console.log(formInput)
async function getCountry(countryCode)
{
   var apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${countryCode}&days=3`);
   var finalResult = await apiResponse.json();
   // console.log(finalResult)
   // console.log(finalResult.location.name)
   document.getElementById('location').innerHTML = finalResult.location.name;//display temp
   // console.log(finalResult.current.temp_c);
   document.getElementById('temp').innerHTML = finalResult.current.temp_c;
   // console.log(finalResult.current.condition.icon);
   var iconWeather = finalResult.current.condition.icon;//.current => display temp
   displayItems(iconWeather);
   // console.log(finalResult.current.condition.text);
   document.getElementById('textCondition').innerHTML = finalResult.current.condition.text;
   
   var threeDayes =finalResult.forecast.forecastday;//display temp && .date => dateTodaySet
   dateTodaySet(threeDayes);
   nextDays(threeDayes);

   // console.log(threeDayes[1].date)
   // dayTomorrow = threeDayes[1].date;
   // lastDay = threeDayes[2].date;
   // console.log(threeDayes[1].day.condition.icon);
   // var iconWeatherTomrrow = threeDayes[1].day.condition.icon;
   // // console.log(threeDayes[1].day.maxtemp_c);
   // var maxTemp = threeDayes[1].day.maxtemp_c;
   // var minTemp = threeDayes[1].day.mintemp_c;
   // var textCondition = threeDayes[1].day.condition.text;

   // nextDays(iconWeatherTomrrow,maxTemp,minTemp,textCondition);
   

//   iconWeatherTomrrow = threeDayes[2].day.condition.icon;
//    // console.log(threeDayes[2].day.maxtemp_c);
//   maxTemp = threeDayes[2].day.maxtemp_c;
//   minTemp = threeDayes[2].day.mintemp_c;
//   textCondition = threeDayes[2].day.condition.text;

}
getCountry('cairo');
formInput.addEventListener('input',function(){
   getCountry(this.value)
})

function displayItems(iconWeather)
{
    var iconWeather =`<img class="" width="90" src=${iconWeather} alt="">`;
    document.getElementById('iconWeather').innerHTML = iconWeather ;
}

function dateTodaySet(threeDayes){
   const d = new Date();
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   let month = months[d.getMonth()];
   document.getElementById('dateToday').innerHTML = d.getDate()+' '+month;
   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   let day = days[d.getDay()];
   document.getElementById('dayToday').innerHTML = day;
   // let dayTomorrow = days[d.getDay()+1];
   document.getElementById('dayTomorrow').innerHTML = days[new Date(threeDayes[1].date).getDay()];
   // let lastDay = days[d.getDay()+2];
   document.getElementById('lastDay').innerHTML = days[new Date(threeDayes[2].date).getDay()] ;

}

// function nextDays(iconWeatherTomrrow,maxTemp,minTemp,textCondition){
   function nextDays(threeDayes){
      for(i=1;i<=2 ;i++){
   var cartona = `<img src="${threeDayes[i].day.condition.icon}" width="90" alt="">
   <h5 class="card-title fw-bold">${threeDayes[i].day.maxtemp_c}</span><sup>o</sup>C</h5>
   <p class="card-text">${threeDayes[i].day.mintemp_c}</span><sup>o</sup>C</p>
   <p class="card-text"><small class="text-info">${threeDayes[i].day.condition.text}</small></p>`
   if(i==1){
      // console.log(threeDayes[1].day);
   document.getElementById('nextDays').innerHTML = cartona;
   }
   else if(i==2)
      {
         // console.log(threeDayes[2].day);
         document.getElementById('next2ndDays').innerHTML = cartona;
      }
      }
}

