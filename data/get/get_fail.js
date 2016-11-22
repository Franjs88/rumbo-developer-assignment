module.exports = {
    path: '/api/trips',
    method: 'GET',
    delay: [200, 1000],
    render: function (req, res){
        // Only for testing intentions
        res.status(201).send();
    }
};