var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$( function() {
    $( ".draggable" ).draggable();
    $( "#map" ).droppable({
      drop: function( event, ui ) {
        var countryName = $(ui.draggable).text();
        $.ajax({
            type: "GET",
            url: "https://nominatim.openstreetmap.org/search",
            data: {
                q: countryName,
                format: "json",
                limit: 1
            },
            success: function(data) {
                var latitude = parseFloat(data[0].lat);
                var longitude = parseFloat(data[0].lon);
                map.setView([latitude, longitude]);
                map.setZoom(5);
            },
            error: function() {
                alert("Erreur lors de la requête à l'API Nominatim.");
            }

        });
      }
    });
  }
);

