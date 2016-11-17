'use strict';

function getHotels() {
// Definimos la URL que vamos a solicitar via Ajax
    var ajax_url = "http://localhost:8765/api/hotels/";

// Creamos un nuevo objeto encargado de la comunicación
    var ajax_request = new XMLHttpRequest();

// Definimos como queremos realizar la comunicación
    ajax_request.open( "GET", ajax_url, true );

//Enviamos la solicitud
    ajax_request.send();
}

function getHotelInfo(id) {
// Definimos la URL que vamos a solicitar via Ajax
    var ajax_url = "http://localhost:8765/api/hotels/";

// Añadimos los parámetros a la URL
    ajax_url += id;

// Creamos un nuevo objeto encargado de la comunicación
    var ajax_request = new XMLHttpRequest();

// Definimos como queremos realizar la comunicación
    ajax_request.open( "GET", ajax_url, true );

//Enviamos la solicitud
    ajax_request.send();
}
