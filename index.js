var express = require('express');
app = express();

var bodyParser=require('body-parser');
app.use(bodyParser.json());

var multer = require('multer');


//post request
app.post('/', function(req,res){
    res.send("This is a Post API request");
});


//post URL Query
app.post('/url', function(req,res){
   let favoriteFood= req.query.favoriteFood;
   let favoriteGame= req.query.favoriteGame;

   res.send(favoriteFood+" "+favoriteGame);
});



//Header properties 
app.post('/header', function(req,res){
    let employeeName= req.header("employeeName");
    let employeeAge= req.header("employeeAge");

    res.send("Employee Name:"+ employeeName + " Employee Age: "+ employeeAge)

});


//json body properties (body-Parser npm)

app.post('/body', function(req,res){
    let JSONData= req.body;
    let JSONString= JSON.stringify(JSONData);
    res.send(JSONString);
});


//file upload npm multer
var storage = multer.diskStorage({
    destination: function(req, file, callBack){
        callBack(null,'./uploads');
    },
    filename:function(req, file, callBack){
        callBack(null, file.originalname);
    }
});
var upload = multer({storage:storage}).single('myfile')

app.post('/upload', function(req, res){
    upload(req, res, function(error){
        if (error){
            res.send("File Upload Fail")
        }
        else{
            res.send("File Upload Success")
        }
    })

});


//file download 
app.get('/download', function(req,res){
    res.download("./uploads/express.jpg")
})



app.listen(8000,function(){
    console.log("Server Run Successfully")
})
    
