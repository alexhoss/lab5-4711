let  express  =  require('express')  
let  app  =  express()  
let path = require('path');
let router = express.Router();
let bodyParser = require('body-parser')
let fs = require('fs');

const artistfilePath = (path.join(__dirname + '/artists.json'));

app.get('/',   (req,  res)  =>  {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/addArtist', function(req, res) {

    fs.readFile(artistfilePath, (err, data) => {
        var objArr = JSON.parse(data);
        objArr.artists.push(req.body);

        fs.writeFile(artistfilePath, JSON.stringify(objArr, null, 2), (err) => {
            if (err) throw err;

        });

        if (err) throw err;
        res.end();
    })



    res.redirect('/');
})

app.post('/del', function(req, res) {
    var nameToDel = req.body.name;

    fs.readFile(artistfilePath, (err, currData) => {
        var objArr = JSON.parse(currData);


        for (var i in objArr.artists) {
            if (objArr.artists[i].name == nameToDel) {
                objArr.artists.splice(i, 1);
                console.log(objArr);
                break;

            }
        }

        fs.writeFile(artistfilePath, JSON.stringify(objArr, null, 2), (err) => {
            if (err) throw err;

        });
        if (err) throw err;
        res.end();

    })


    res.redirect('/');
})

app.get('/artists', (req, res) => {
    let data = require(artistfilePath);
    res.json(data);

})


app.use("/js", express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));
//app.use('/', router);



app.listen(process.env.PORT || 4000,   ()  =>  console.log('Server ready')) 