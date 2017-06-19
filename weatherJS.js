$(document).ready(function () {

    $.getJSON("https://api.myjson.com/bins/i8run", function (data) {

        //DATE
        var d = new Date();
        document.getElementById("date").innerHTML = d.toDateString();
        //END OF DATE

        var revisedInfoArray = [];

        function makeNewArray(data) {

            $.each(data.list, function () {

                var eachCity = {

                    city: "",
                    weather: "",
                    temp: "",
                    humidity: "",
                    icon: "",
                    windspeed: "",
                    identification: "",
                    maxtemp: "",
                    mintemp: ""
                };

                eachCity.city = this.name;
                eachCity.weather = this.weather[0].description;
                eachCity.temp = this.main.temp;
                eachCity.humidity = this.main.humidity;
                eachCity.icon = this.weather[0].icon;
                eachCity.windspeed = this.wind.speed;
                eachCity.identification = this.id;
                eachCity.maxtemp = this.main.temp_max;
                eachCity.mintemp = this.main.temp_min;


                revisedInfoArray.push(eachCity);
            })
        };
        makeNewArray(data)
            //NEW ARRAY OF DATA HAS BEEN CREATED

        //START CREATING DIVS TO APPEND TO MAIN BODY
        function createPanels(revisedInfoArray) {

            var areaForPanels = $('.mainbody'); //get document by id shizzle

            $.each(revisedInfoArray, function (key, value) {

                //Create the Individual Panels
                var createPanel = $('<div class="panel" id="' + key + '"></div>');
                //ADD THE HTML TO EACH PANEL

                var createTitle = $('<h3 class="thecities">' + this.city + '</h3>');
                var createWeather = $('<h5>' + "<b>Currently:</b> " + this.weather + '</h5>');
                var createTemp = $('<h5>' + "<b>Temp:</b> " + this.temp + "&#8451;" + '</h5>');
                var createHumidity = $('<h5>' + "<b>Humdity:</b> " + this.humidity + '%' + '</h5>');
                var createIcon = $('<img src="' + this.icon + '.png">');

                var moreInfoButton = $('<button type="button" class="btn btn-danger" data-toggle="collapse" data-target="#' + this.identification + '">More Info</button> <div id="' + this.identification + '" class="collapse bottom">' + '<b>Wind Speed: </b>' + this.windspeed + ' mph' + '<br>' + '<b>Max temp: </b>' + this.maxtemp.toFixed(2) + '&#8451;' + '<br>' + '<b>Min temp: </b>' + this.mintemp.toFixed(2) + '&#8451;' + '</div>');


                createPanel.append(createTitle);
                createPanel.append(createIcon);
                createPanel.append(createWeather);
                createPanel.append(createTemp);
                createPanel.append(createHumidity);
                createPanel.append(moreInfoButton);

                areaForPanels.append(createPanel);

            })
        }
        createPanels(revisedInfoArray);









        //NEW SEARCH BAR


        function eventListener() {

            $('#myInput').keyup(runSearch);

        };
        eventListener();


        function runSearch() {

            $.each(revisedInfoArray, function (key, value) {


                var input = $('#myInput');
                
                var input = input.val().toUpperCase();
                var currentCity = this.city.toUpperCase();
                var currentPanel = $('#'+ key);


                if (currentCity.indexOf(input) > -1 ) {
                    
                    $(currentPanel).show(800);

                }else{
                    
                    $(currentPanel).hide(800);
                };

            });

        };
    });




});
