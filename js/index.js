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

            let pixelurl = 'http://pixel.uji.es/meteo/api/api.php/stations';

            $.getJSON(pixelurl, function (data) {
                let columns = data.stations.columns;
                let stations = data.stations.records;
                $('#stationList li').remove();
                $.each(stations, function (index, station) {
                    debugger;
                    $("#stationList").append('<li><a href = "details.html"><span class = "ui-li-count">'+ 
                    Math.round(station[6],2) +'/'+Math.round(station[7]) + '</span>'
                    + station[1] + '</a></li>')
                });
                $('#stationList').listview('refresh');
            });
        }
    });
});