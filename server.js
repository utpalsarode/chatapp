const { app } = require('./src/App');

app.listen(app.get('port'), function () {
    console.log("Chat app " + process.env.NODE_ENV + " started on Port No. ", app.get('port'));
});