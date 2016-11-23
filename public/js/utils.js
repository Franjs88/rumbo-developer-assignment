'use strict'

// ------------
// Utils for the hotel client
// Use client.js functions
// ------------

/*
 * This function remove all the childs from a parent node of the DOM.
 * Params:
 * parentId: parent node id to take as a reference
 * callback: Function that will be called after removing all childs.
 */
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
 * Given a elemType and elemText, creates a HTML element.
 * Params:
 * elemType: String with the type of HTML element o create p.eg: "div".
 * elemText (Optional): If the element contains text will display this passed string.
 * Return: the created element.
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


/*
 * Makes an AJAX HTTP GET Request against and specified url endpoint
 * Params:
 * url: String with the url of the server
 * param: String with query params for the request if needed
 */
function get(url, param) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        var req_url = url;

        if (param !== undefined || null) {
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