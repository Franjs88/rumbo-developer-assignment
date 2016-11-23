'use strict';

// Use utils.js functions

const APIendpoint = "http://localhost:8765/api";

/*
 * Process the JSON response and creates in the DOM the list of Hotels presenting them as
 * buttons.
 */
function loadHotels () {

    get(APIendpoint+"/hotels").then(function(response) {
        var element;
        var hotels = JSON.parse(response);

        for (var i = 0; i < hotels.length; i++) {
            element = createHTMLElement("button",hotels[i].name);
            injectHotel("hotels-list", element,hotels[i].id);
        }

    }, function(error) {
        throw error;
    })
}


/*
 * Creates the container and the image elements and returns the div created.
 * Params:
 * response: Receives a response JSON object with the hotel data.
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

/*
 * Creates name and rating elements and inserts them into the DOM.
 * Params:
 * response: Receives a response JSON object with the hotel data.
 */
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

/*
 * Creates the hotel information panel elements and inserts them into the DOM.
 * Params:
 * response: Receives a response JSON object with the hotel data.
 */
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

/*
 * Makes an HTTP Request to the server, loads and display the hotel on the HTML.
 * Params:
 * hotelId: the hotel identifier to search for on the server.
 */
function displayHotel (hotelId) {

    get(APIendpoint+"/hotels/"+hotelId).then(function(response) {
            var json = JSON.parse(response);

            // Creating HTML elements that will be displayed
            generateHotelImage(json);
            generateHotelInfoPanel(json);

        }, function(error) {
            throw error;
        }
    )
}