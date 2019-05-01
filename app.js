#!/usr/bin/env node
const express=require('express');
const app=express();
const path=require('path');
const port= process.env.PORT||8080;
const fs=require('fs');
const url=require('url');
const wifihost=require('./wifi_address');
//some 
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/',(req,res)=>{
    var cwd = process.cwd();
    var rootlist = fs.readdirSync(cwd);
   var resolvedPath='';
   res.render('index',{ rootpath:resolvedPath, rootlist,home:true});
}) 

app.get(/(\/\w)*\/\w+/,(req,res)=>{
    var reqUrl=url.parse(req.url);
    // console.log(reqUrl);
    var relPath = reqUrl.path;
    // console.log(relPath);
    var cwd=process.cwd();
    var resolvedPath=relPath.replace('/',path.sep).replace(/%20/g,' ');
   console.log("resolved"+resolvedPath);
    var state = fs.statSync(path.join(cwd,resolvedPath));
    // console.log(state);
    if(state.isDirectory()){
        var rootlist = fs.readdirSync(path.join(cwd,resolvedPath));
              res.render('index', {
                  rootpath: relPath,
                  rootlist,
                  home:false
              });
    }
    else{
        var rs = fs.createReadStream(path.join(cwd,resolvedPath));
       rs.pipe(res)
        }
})
var host = wifihost ? wifihost : 'localhost'
app.listen(port, host , () => {
    console.log(`server started in ${process.cwd()}`);
    console.log(`goto ${host}:${port}`);
})
