const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const temp_status_img = document.getElementById('temp_status_img');



const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    // console.log(cityName.value); //correct
    // console.log(cityVal); //correct


    // console.log("hii");
    if (cityVal === "") {

        city_name.innerText = 'City Name Cant Be Empty';
    } else {
        try {
            let api_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=00a81f2bee5fa98eb421638ae616ea1f`;
            const response = await fetch(api_url);
            // console.log(response); // correct


            //from above console, we are getting the result but in form of readable stream, as JSON data,
            // so we have to convert it to pure JS
            const data = await response.json();
            // console.log(data); //correct

            //converting it to array of objects
            const arrData = [data];
            // console.log(arrData); // correct

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            console.log(city_name.innerText); // correct


            temp.innerText = arrData[0].main.temp;
            // console.log(temp.innerText); // correct



            temp_status.innerText = arrData[0].weather[0].main;

            // console.log(temp_status.innerText); // correct
            if (temp_status == "Clear") {
                temp_status_img.setAttribute("src", "/images/clear.jpg  ");
            } else
            if (temp_status == "Rain") {
                temp_status_img.setAttribute("src", "/images/rain.jpg ");
            } else
            if (temp_status == "Clouds") {
                temp_status_img.setAttribute("src", "/images/cloud.png ");
            } else if (temp_status == "Haze") {
                temp_status_img.setAttribute("src", "/images/haze.png");
            } else {
                temp_status_img.setAttribute("src", "/images/bg4.png");
            }


        } catch {
            city_name.innerText = 'Please enter the city name properly';
        }

    }

}

submitBtn.addEventListener('click', getInfo);