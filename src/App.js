import React from 'react';
import search from './search-solid.svg';
import speaker from './volume-up-solid.svg';
import './App.css';
//importing the weather icons into the app
import clouds from './pics/Cloudy.png';
import thunder from './pics/Thunderstorm.png';
import rain from './pics/Rain.png';
import sun from './pics/Sunny.png';
import wind from './pics/wind.png';


var locationdata = undefined;
var tempreturedata = undefined;
// All the Components states are being set to undefined so they can be set later on
class App extends React.Component {
  state ={
    temp: undefined, //Stores the temp from the api call
    desc: undefined, //Stores the description of weather from api call
    loc: undefined, //Stores the loaction of the api call
    icon: undefined, //Stores the weather icon according to the description
    whatShouldIwear: undefined //Stores the different suggestions of what to wear
  };
  //This is function belonging to react and is executed after the first initial render of the app
  async componentDidMount() {
    //Api call is done here using the javascripts fetch api
    const bigman = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=828ff9d6aee47ba7cc86c7097eb8b918');
    const bigmansdata = await bigman.json();

    //The data is taken from the api and is stored into the Component states
    this.setState({
      temp: bigmansdata.main.temp,
      desc: bigmansdata.weather[0].main,
      loc: bigmansdata.name
    })

    var tempreture = Math.round(bigmansdata.main.temp);
    locationdata = bigmansdata.name;
    tempreturedata = Math.round(bigmansdata.main.temp);
    console.log("locdata = " + locationdata);
    console.log("tempdata = " + tempreturedata);
    console.log(tempreture);
    //Comparisons are made here using the tempreture from api to suggest clothing items for user

    if (tempreture <= 10) {
      this.setState({whatShouldIwear: 'Wear a coat, it is quite cold'})
    }else if (tempreture >= 10) {
      this.setState({whatShouldIwear: 'Consider Wearing A Jacket'})
    }else if (tempreture >= 20) {
      this.setState({whatShouldIwear: 'Wear light clothing'})
    }


    var weatherDesc = bigmansdata.weather[0].main;

    if (weatherDesc === "Thunderstorm") {
      console.log("thunder");
      this.setState({icon: thunder});

    }else if(weatherDesc === "Drizzle"){
      console.log("drizzle")
      this.setState({icon: rain});

    }else if (weatherDesc === "Rain") {
      console.log("Rain")
      this.setState({icon: rain});

    }else if (weatherDesc === "Snow") {
      console.log("Snow")
      this.setState({icon: rain});

    }else if (weatherDesc === "Clear") {
      console.log("clear")
      this.setState({icon: sun});
    }else if(weatherDesc === "Clouds"){
      console.log("Clouds")
      this.setState({icon: clouds});
    }
  }

  //This is a second api call method, takes input from the search bar and uses that location for the api call
  getWeather = async (e) =>{
    e.preventDefault();

    //user input is stored into a variable
    const inputU = document.getElementById('searchbar').value;

    console.log(inputU);

    //User input is combined with the api url link
    var url1 = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var url2 = '&units=metric&APPID=828ff9d6aee47ba7cc86c7097eb8b918';
    var finishedurl = url1+inputU+url2;

    //api call is made to the location taken from the user from searchbar
    const api_call = await fetch(finishedurl);
    const data = await api_call.json();
    console.log(data);

    //Componets states weather information is updated to the new location
    this.setState({
      loc: data.name,
      temp: data.main.temp,
      desc: data.weather[0].main
    });

    locationdata = data.name;
    tempreturedata = Math.round(data.main.temp);
    console.log("updated locdata = " + locationdata);
    console.log("updated tempdata = " + tempreturedata);

    var tempreture = Math.round(data.main.temp);
    //Comparisons are made again using the Tempreture
    if (tempreture < 10) {
      this.setState({whatShouldIwear: 'Wear a coat, it is quite cold'})
    }else if (tempreture >= 10) {
      this.setState({whatShouldIwear: 'consider wearing a jacket'})
    }else if (tempreture >= 20) {
      this.setState({whatShouldIwear: 'Wear light clothing'})
    }

    var weatherDesc = data.weather[0].main;

    if (weatherDesc === "Thunderstorm") {
      console.log("thunder");
      this.setState({icon: thunder});

    }else if(weatherDesc === "Drizzle"){
      console.log("drizzle")
      this.setState({icon: rain});

    }else if (weatherDesc === "Rain") {
      console.log("Rain")
      this.setState({icon: rain});

    }else if (weatherDesc === "Snow") {
      console.log("Snow")
      this.setState({icon: rain});

    }else if (weatherDesc === "Clear") {
      console.log("clear")
      this.setState({icon: sun});
    }else if(weatherDesc === "Clouds"){
      console.log("Clouds")
      this.setState({icon: clouds});
    }
  }
  //function used to open the 'what should i wear button'
  openModal(){
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
  }
  //function used to close out the modal of the 'what should i wear'
  closeModal(){
    var modals = document.getElementById('myModal');
    modals.style.display = "none";
  }
  //function used to open the 5day forecast modal and used call the 5day openweather api
  async openForecast(){
    var modals = document.getElementById('Modalday');
    modals.style.display = "block";

    var url1 = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var finalurl = url1 + locationdata + "&units=metric&appid=828ff9d6aee47ba7cc86c7097eb8b918";

    //api call for the 5day Forecast
    const api_call = await fetch(finalurl);
    const data = await api_call.json();

    //taking the id of each element in the modal and assign it a date and tempreture value from the api
    document.getElementById('loc-forecast').innerHTML = locationdata;

    document.getElementById('d1d').innerHTML = new Date(data.list[4].dt_txt.slice(0,10)).toDateString();
    document.getElementById('d1').innerHTML =  "Avg Temperature: " + Math.round(data.list[4].main.temp) + "°";

    document.getElementById('d2d').innerHTML = new Date(data.list[12].dt_txt.slice(0,10)).toDateString();
    document.getElementById('d2').innerHTML ="Avg Temperature: " + Math.round(data.list[12].main.temp) + "°";

    document.getElementById('d3d').innerHTML = new Date(data.list[20].dt_txt.slice(0,10)).toDateString();
    document.getElementById('d3').innerHTML ="Avg Temperature: " + Math.round(data.list[20].main.temp) + "°";

    document.getElementById('d4d').innerHTML = new Date(data.list[28].dt_txt.slice(0,10)).toDateString();
    document.getElementById('d4').innerHTML = "Avg Temperature: " + Math.round(data.list[28].main.temp) + "°";

    document.getElementById('d5d').innerHTML = new Date(data.list[36].dt_txt.slice(0,10)).toDateString();
    document.getElementById('d5').innerHTML = "Avg Temperature: " + Math.round(data.list[36].main.temp) + "°";

      document.getElementById('update-time').innerHTML = "<b>Last Updated<b> "+  new Date().toDateString();
  }
  //function used to close the 5day weather modal
  closeForecast(){
    var modals = document.getElementById('Modalday');
    modals.style.display = "none";
  }

  testerFunction(){
    const msg = new SpeechSynthesisUtterance();
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1.5; // 0 to 2
    msg.text  = "The weather in " + locationdata + " is " + tempreturedata + " degrees celsius";
    var speaks ={"name": "Alex","lang": "en-US"};

    const voice = speaks[0]; //47


    speechSynthesis.speak(msg);

  }

  render() {
    return (
      <div className="App" id="lol">
        {/*Searchbar used to manually search a location*/}
        <div id="search">
          <input type="text" id="searchbar" placeholder="Search"/>
          <a id="search-btn" href="" onClick={this.getWeather}><img alt="" id="s-b" src={search} height="30px" width="30px;"/></a>
        </div>

        {/*Weather icon is displayed here*/}
        <div id="display-icon">

          <img id="pic" src={this.state.icon} width="40%" height="40%" alt=""></img>

        </div>

        {/*Location is displayed here*/}
        <div id="location">
          <h1>{this.state.loc}</h1>
        </div>

        {/*Description is displayed here*/}
        <div id="description">
          <h2>{this.state.desc}</h2>

        </div>

        {/*Tempreture is being displayed here*/}
        <div id="temp">
          <h3>{Math.round(this.state.temp)}°</h3>

        </div>

        {/* What to wear modal*/}
        <div id="What to wear">
          <button onClick={this.openModal} id="b2">What Should I Wear?</button>

          <div id="myModal" className="modal">
            <div className="modal-content">
              <span onClick={this.closeModal} className="close">&times;</span>
              <h1 id="modal-text">{this.state.whatShouldIwear}</h1>
            </div>
          </div>
        </div>

        {/*Buttons at bottom of app, also the 5day forecast modal*/}
        <div id="bottom">
          <button id="b0" onClick={this.openForecast} >5 Day</button>
          <button id="b1" onClick={this.testerFunction}><img src={speaker}width="25%" height="25%"/></button>
            <div id="Modalday" className="modal1">
              <div className="modal-Forecast">
                <span onClick={this.closeForecast} className="close1">&times;</span>

                <h1 id="loc-forecast">location</h1>
                <h1>5 Day Forecast</h1>
                <h2 id="d1d">Day</h2>
                <p id="d1">d1</p>

                <h2 id="d2d">Day</h2>
                <p id="d2">d2</p>

                <h2 id="d3d">Day</h2>
                <p id="d3">d3</p>

                <h2 id="d4d">Day</h2>
                <p id="d4">d4</p>

                <h2 id="d5d">Day</h2>
                <p id="d5">d5</p>

                <p id="update-time">time</p>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
