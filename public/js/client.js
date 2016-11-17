'use strict';

const APIendpoint = "http://localhost:8765/api";


// Promises by Google: https://developers.google.com/web/fundamentals/getting-started/primers/promises#promisifying_xmlhttprequest

function get(url, param) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();

        var req_url = url;
        if (param != undefined || null) {
            req_url += param;
        }

        req.open('GET', req_url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

function loadHotels() {
    get(APIendpoint+"/hotels").then(function(response) {
        console.log("Success!", response);
    }, function(error) {
        console.error("Failed!", error);
    })
}

function loadHotelInfo(id) {
    get(APIendpoint+"/hotels/"+id).then(function(response) {
        console.log("Success!", response);
    }, function(error) {
        console.error("Failed!", error);
    })
}


function displayHotels () {

    // Create element: http://www.w3schools.com/jsref/met_document_createelement.asp
    // Crear elementos HTML leyendo con un loop la response: http://stackoverflow.com/questions/17264182/javascript-efficiently-insert-multiple-html-elements
    // Añadir event handlers para poder clickar los botones creados dinamicamente: https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

    //

}
