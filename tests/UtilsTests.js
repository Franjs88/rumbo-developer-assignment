var expect = chai.expect;
var endpoint = "http://localhost:8765/api";

describe("Testing Utils", function() {

    // HTTP GET Function
    describe("Function Get", function() {

        var server = [];
        var fakeData = [{
            "1": {
                "name": "Hotel Sunny Palms",
                "imgUrl": "images/sunny.jpg",
                "rating": 5,
                "price": 108.00,
                "id": 1
            },
            "2": {
                "name": "Hotel Snowy Mountains",
                "imgUrl": "images/snowy.jpg",
                "rating": 4,
                "price": 120.00,
                "id": 2
            },
            "3": {
                "name": "Hotel Windy Sails",
                "imgUrl": "images/windy.jpg",
                "rating": 3,
                "price": 110.00,
                "id": 3
            },
            "4": {
                "name": "Hotel Middle of Nowhere",
                "imgUrl": "images/nowhere.jpg",
                "rating": 4,
                "price": 199.00,
                "id": 4
            }
        }]

        before(function () {
            server = sinon.fakeServer.create();
            server.respondWith(
                "GET",
                "http://localhost:8765/api/hotels",
                [200, { "Content-Type": "application/json" }, JSON.stringify(fakeData)]
            );
        });

        it("should pass if the endpoint url is well written", function(done) {
            var url = endpoint + "/hotels";

            get(url).then(function(response) {
                expect(response).to.exist;
                expect(JSON.parse(response)).to.be.instanceof(Object);
                done()
            }, function(error) {
                done(error)
            });
            server.respond();
        });

        after(function () { server.restore(); });


        it("should fail if req.status isnt HTTP 200 OK", function(done) {
            var url = endpoint + "/hotels/99";

            get(url).then(function(response) {
                console.log("Funciona la url");
                expect(response).to.not.exist;
                done()
            }, function(error) {
                expect(error).to.exist;
                done()
            });
            server.respond();
        });

        after(function () { server.restore(); });
    });

});