var expect = chai.expect;
var endpoint = "http://localhost:8765/api";

describe("Client", function() {

    // HTTP GET Function

    describe("Function Get", function() {


        it("should pass if the endpoint url is well written", function(done) {
            var url = endpoint + "/hotels";

            get(url).then(function(response) {
                expect(response).to.exist;
                expect(JSON.parse(response)).to.be.instanceof(Object);
                done()
            }, function(error) {
                done(error)
            })
        });



        it("should fail if the endpoint url is bad written", function(done) {
            this.timeout = 3000;
            var url = "http://hotels";

            get(url).then(function(response) {
                expect(response).to.not.exist;
                done()
            }, function(error) {
                expect(error).to.exist;
                done()
            })
        });


        it("should fail if req.status isnt HTTP 200 OK", function(done) {
            var url = endpoint + "/trips";

            get(url).then(function(response) {
                console.log("Funciona la url");
                expect(response).to.not.exist;
                done()
            }, function(error) {
                expect(error).to.exist;
                done()
            })
        });

    });

    //Load Hotels

    describe("Function loadHotels", function() {
        /*
        it("should ", function(done) {


        });
        */

    });
});