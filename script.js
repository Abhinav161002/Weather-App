const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata",
  "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Visakhapatnam", "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Varanasi", "Srinagar", "Amritsar", "Allahabad", "Ranchi",
  "Howrah", "Coimbatore", "Jabalpur", "Vijayawada", "Madurai", "Raipur", "Kota",
  "Chandigarh", "Guwahati", "Solapur", "Hubli", "Tiruchirappalli", "Bareilly",
  "Moradabad", "Mysore", "Gurgaon", "Jalandhar", "Bhubaneswar", "Salem", "Guntur",
  "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Jammu", "Kolhapur", "Ujjain",
  "Dehradun", "Tirunelveli", "Malegaon", "Nanded", "Ajmer", "Ambattur", "Bhilai",
  "Tirupati", "Panipat", "Loni", "Noida", "Firozabad", "Cuttack", "Jamshedpur",
  "Nellore", "Gulbarga", "Durgapur", "Siliguri", "Warangal", "Vellore", "Aligarh",
  "Bhavnagar", "Bokaro", "Ratlam", "Kakinada", "Bilaspur", "Jhansi", "Shimla"
];

window.onload = () => {
  const dataList = document.getElementById("cityList");
  indianCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    dataList.appendChild(option);
  });
};

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");
  const errorDiv = document.getElementById("error");

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    errorDiv.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.classList.remove("hidden");
    errorDiv.classList.add("hidden");
  } catch (error) {
    weatherInfo.classList.add("hidden");
    errorDiv.textContent = error.message;
    errorDiv.classList.remove("hidden");
  }
}

