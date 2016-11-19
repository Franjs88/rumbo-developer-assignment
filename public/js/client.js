'use strict';

const APIendpoint = "http://localhost:8765/api";


// Init config
// document.body.onload = addElement("div1", "div", "Hola mundo!");

// ------------
// Utils
// ------------

function removeAllChilds (parentId) {
    // removing all childs from an element
    var element = document.getElementById(parentId);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/*
 * This function has the opposite effect of Javascript's insertBefore function:
 * inserts an element after a node of the DOM.
 * Params:
 * newNode: new node created that must be inserted after.
 * referenceNode: node that will be the parent of the new node.
 */
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/*
 * This function inject an HTML element inside another element, for example, a div:
 * Params:
 * parentId: the node id of the parent element we want to inject into.
 * element: the HTML element we want to inject.
 * hotelId: the hotel id for the onclick function.
 */
function injectHotel(parentId, element, hotelId) {
    element.onclick = function() {
        displayHotel(hotelId);
//        loadHotelInfo(hotelId);
    }; // Adding function onclick with the hotel id.

    document.getElementById(parentId).appendChild(element);
}


/*
 * This function adds an element to the DOM
 * Params:
 * id: id of the HTML element that will be used as a reference node.
 * elemType: Type of HTML element that will be injected.
 * OPTIONAL:: elemText: String with the text that the element should contain.
 */
function addElement (id, elemType, elemText) {
    // create a new div element, and give it some content
    var newElem = document.createElement(elemType);
    newElem.appendChild(document.createTextNode(elemText)); //add the text node to the newly created div.

    // add the newly created element and its content into the DOM
    insertAfter(newElem, document.getElementById(id));
}

/*
 * Given a elemType and elemText, creates a HTML element.
 * Returns the created element.
 */
function createHTMLElement (elemType, elemText) {
    // create a new div element, and give it some content
    var newElem = document.createElement(elemType);
    // if there is text to create, we create the text node
    if (elemType != undefined || elemType != null) {
        newElem.appendChild(document.createTextNode(elemText)); //add the text node to the newly created div.
    }


    return newElem;
}


// ------------
// End Utils
// ------------


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


/*
 * Process the JSON response and creates in the DOM the list of Hotels presenting them as buttons.
 */
function processHotels (response) {
    var element;
    var hotels = JSON.parse(response);
    console.log(hotels);
    for (var i = 0; i < hotels.length; i++) {
        console.log(hotels[i]);
        element = createHTMLElement("button",hotels[i].name);
        injectHotel("hotels-list", element,hotels[i].id);
    }
}

function loadHotels () {
    get(APIendpoint+"/hotels").then(function(response) {
        processHotels(response);
    }, function(error) {
        console.error("Failed!", error);
    })
}

function loadHotelInfo (id, callback) {
    get(APIendpoint+"/hotels/"+id).then(function(response) {
        callback(JSON.parse(response));

    }, function(error) {
        console.error("Failed!", error);
    }
    )
}

function displayHotel (hotelId) {
    removeAllChilds("hotel-info");

    loadHotelInfo(hotelId, function(response) {

        console.log("JSON del hotel: ", response);
        var rating = response.rating;

        // Creating HTML elements that will be displayed
        var imageUrl = createHTMLElement("img");
        imageUrl.id = "hotel-img";
        imageUrl.src = response.imgUrl;

        var name = createHTMLElement("span",response.name);
        name.id = "hotel-name";

        var price = createHTMLElement("span",response.price);
        price.id = "hotel-price";

        document.getElementById("hotel-info").appendChild(imageUrl);
        document.getElementById("hotel-info").appendChild(name);
        document.getElementById("hotel-info").appendChild(price);

    });


    // Create element: http://www.w3schools.com/jsref/met_document_createelement.asp
    // Crear elementos HTML leyendo con un loop la response: http://stackoverflow.com/questions/17264182/javascript-efficiently-insert-multiple-html-elements
    // Añadir event handlers para poder clickar los botones creados dinamicamente: https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

    //

}
