'use strict';

const APIendpoint = "http://localhost:8765/api";

// ------------
// Utils
// ------------

function removeAllChilds (parentId, callback) {
    // removing all childs from an element
    var element = document.getElementById(parentId);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    callback;
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
        removeAllChilds("hotel-info", displayHotel(hotelId));
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
    // create a new HTML element
    var newElem = document.createElement(elemType);
    // if there is text to create, we create the text node
    if (elemText != undefined || elemText != null) {
        newElem.appendChild(document.createTextNode(elemText)); //add the text node to the newly created div.
    }


    return newElem;
}


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

//--------------------------------------------------------------
// ------------
// End Utils
// ------------
//--------------------------------------------------------------


/*
 * Process the JSON response and creates in the DOM the list of Hotels presenting them as buttons.
 */
function processHotels (response) {
    var element;
    var hotels = JSON.parse(response);
    for (var i = 0; i < hotels.length; i++) {
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


/*
 * Creates the container and the image elements and returns the div created.
 */
function generateHotelImage (response) {
    var div = createHTMLElement("div");
    div.className = "flex-30 margin-20";

    // We create the image that will be inside the div just created

    var imageUrl = createHTMLElement("img");
    imageUrl.className = "hotelImg";
    imageUrl.src = response.imgUrl;

    div.appendChild(imageUrl);

    document.getElementById("hotel-info").appendChild(div);
}


function generateNameAndRating (response) {
    var nameAndRatingDiv = createHTMLElement("div");
    nameAndRatingDiv.className = "flex-100 layout-column";

    // We generate the individual items
    var name = createHTMLElement("span",response.name);
    name.id = "hotelTitle";

    nameAndRatingDiv.appendChild(name);

    var rating = createHTMLElement("span");
    rating.className = "ratings-"+response.rating;

    nameAndRatingDiv.appendChild(rating);

    return nameAndRatingDiv

}


function generateHotelInfoPanel (response) {
    var hotelInfoDiv = createHTMLElement("div");
    hotelInfoDiv.className = "flex-70 margin-right-20 margin-bottom-20 margin-top-20" +
    " layout-column layout-align-start-space-between";

    // We create the div that will contain name and rating of the hotel
    var nameAndRating = generateNameAndRating(response);

    hotelInfoDiv.appendChild(nameAndRating);

    // Now we generate the price div
    var priceDiv = createHTMLElement("div");
    priceDiv.className = "flex-100 layout-column layout-align-end";

    // We generate the price and text spans
    var price = createHTMLElement("span","£"+response.price.toFixed(2));
    price.id = "hotel-price";
    price.className = "lmFont";

    var totalText = createHTMLElement("span","Total hotel stay");
    totalText.className = "detailFont";

    priceDiv.appendChild(price);
    insertAfter(totalText, price);

    hotelInfoDiv.appendChild(priceDiv);

    document.getElementById("hotel-info").appendChild(hotelInfoDiv);
}


function displayHotel (hotelId) {

    loadHotelInfo(hotelId, function(response) {

        // Creating HTML elements that will be displayed
        generateHotelImage(response);
        generateHotelInfoPanel(response);

    });


    // Create element: http://www.w3schools.com/jsref/met_document_createelement.asp
    // Crear elementos HTML leyendo con un loop la response: http://stackoverflow.com/questions/17264182/javascript-efficiently-insert-multiple-html-elements
    // Añadir event handlers para poder clickar los botones creados dinamicamente: https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/

    //

}