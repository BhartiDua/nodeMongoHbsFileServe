const mongoose = require('mongoose');
const smp = require('./model/sample') ; 
const http = require('http');
const Handlebars = require('handlebars')
const fs = require('fs');
const path = require('path')

mongoose.connect('mongodb://localhost/123',{useNewUrlParser:true,useUnifiedTopology: true})



http.createServer(async function (req, res) {
    if(req.url==='/'){
        const file = await sendFile({firstName:"Bharti"});
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(file);  
        res.end();    
    }
    else if(req.url==='/create'){
        let temp = new smp ({
            _id: new mongoose.Types.ObjectId(),
            firstName: 'Bharti',
            lastName: 'Dua'
        });
        temp.save(function(err) {
            if (err) throw err;
            console.log('Data successfully saved.');
        });
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(`<h1>User created</h1>`);  
        res.end();    
    }


      
}).listen(3000, function(){
    console.log("server start at port 3000"); //the server object listens on port 3000
});

async function sendFile(query){
    return smp.findOne(query).lean().then((doc)=>{

        const templateHtml = fs.readFileSync(path.join(process.cwd(), './html/helloUser.html'), 'utf8');
        let template = Handlebars.compile(templateHtml)
        let compiledHtml =  template({data:doc}) 
        return compiledHtml;
    })
    
}