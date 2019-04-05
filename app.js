const express=require('express');
const app=express();
const path=require('path');
const port= process.env.PORT||8080;
const fs=require('fs');
const os=require('os');
const url=require('url');

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/',(req,res)=>{
   var rootlist=fs.readdirSync(__dirname);
   var resolvedPath='';
   res.render('index',{ rootpath:resolvedPath, rootlist,home:true});
}) 

//focus here ..
app.get(/(\/\w)*\/\w+/,(req,res)=>{
    var reqUrl=url.parse(req.url);
    // console.log(reqUrl);
    var relPath = reqUrl.path;
    console.log(relPath);
    var resolvedPath=relPath.replace('/',path.sep);
   console.log("resolved"+resolvedPath);

    var state = fs.statSync(path.join(__dirname,resolvedPath));
    console.log(state);
    
    if(state.isDirectory()){
             var rootlist=fs.readdirSync(path.join(__dirname,resolvedPath));
              res.render('index', {
                  rootpath: relPath,
                  rootlist,
                  home:false
              });
    }
    else{
       var rs=fs.createReadStream(path.join(__dirname,resolvedPath));
       rs.pipe(res)
        }
  
})
app.listen(port, "192.168.0.12", () => {
    console.log(`server started in ${path.basename(__dirname)}`);
})
