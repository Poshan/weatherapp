//global variables
let currentStation; //last station touched
let stations; //all the stations


//onclick of refresh button


$(document).on("click", "#refresh", function () {
    //using the ip location
    let access_key = '18d7766cdddd4e41af24b356f41f7bb3';
    let lat, lng;
    $.ajax({
        url: "https://api.ipgeolocation.io/ipgeo?apiKey=" + access_key,
        //dataType: 'jsonp',
        success: function (data) {
            lat = data.latitude;
            lng = data.longitude;
            //alert(lat, lng);
            let baseUrl = "http://api.openweathermap.org/data/2.5/find?";
            baseUrl += "lat=" + lat + "&lon=" + lng + "&appid=d94b05636c5fa575e62383fd8f33dd4a";
            baseUrl += "&units=metric&cnt=20";
            $.getJSON(baseUrl, function (data) {
                // debugger;
                stations = data.list;
                $('#stationList li').remove();
                $.each(stations, function (index, station) {
                    $("#stationList").append('<li><a id = "to_details" href = "#"><span id ="' + index + '"class = "ui-li-count">' +
                        Math.round(station.main.temp_max, 2) + '/' + Math.round(station.main.temp_min) + '</span>' +
                        station.name + '</a></li>')
                });
                $('#stationList').listview('refresh');
            });
        }
    });
});

//navigation to details event
$(document).on('pagebeforeshow', '#page1', function () {
    $(document).on('click', '#to_details', function (e) {

        //not doing the defualt things
        e.preventDefault();
        e.stopImmediatePropagation();
        // debugger;
        //get the current 
        currentStation = stations[e.target.children[0].id];
        //change to the details page
        $.mobile.changePage("#detailsPage",{transition:'slide'});
        //the icon  for the image is in currentStation.weather[0].icon
        //to generate the icon here is the sample url
        //
    });
});

$(document).on('pagebeforeshow', '#detailsPage', function () {
//here check if the pagebeforeshow is working for html pages rather ids.....
let icon = currentStation.weather[0].icon;
let iconURL = `http://openweathermap.org/img/wn/${icon}.png`;
$("#stationIcon").attr({"src":iconURL});
$("#stationName").text(currentStation.name);
$("#stationDescription").text(currentStation.weather[0].description);
$("#stationTemperature").text(`Temperature now is  ${currentStation.main.temp} Maximum temperature ${currentStation.main.temp_max} minimum temp ${currentStation.main.temp_min}`);
$("#stationPressure").text(`Pressure is  ${currentStation.main.pressure}`);
$("#stationPrecipitation").text(`Rainfall is  ${currentStation.rain==null?'N/A':currentStation.rain} and snow is ${currentStation.snow}`);
});