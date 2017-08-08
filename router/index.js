const express=require('express');
const router=express.Router();
const re=require('../moudle/index');
const formidable = require('formidable');
const fs=require('fs');
const path=require('path')

router.post('/admin',function (req,res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./upload";
    form.parse(req, (err, fields, files)=> {
        console.log(fields,JSON.stringify(files));
        if(fields.createdir!=null) {
            fs.mkdirSync('upload/' + fields.createdir + '');
            res.render('admin',{dirs:re.getdir()});
            return;
        }
        if(fields.uploaddir!=null){
            let uploaddir=fields.uploaddir;
            let randomname=Math.floor(Math.random()*10000+9999);
            let filename=files.upload.path;
            let extname=path.extname(files.upload.name);
            let newpath=path.normalize(__dirname + "/../upload/" + uploaddir + "/" + randomname + extname);
            if(files.upload.size==0){
                fs.unlink(files.upload.path)
                res.render('index',{title:'主页',dirs:re.getdir()})
            }
            fs.rename(filename,newpath,function (err,files) {
                res.render('index',{title:'主页',dirs:re.getdir()})
            });
        }
    });
});

router.get('/',function (req,res) {
    res.render('index',{title:'主页',dirs:re.getdir()})
});

router.get('/admin',function (req,res) {
    res.render('admin',{dirs:re.getdir()});
});

router.get('/:dir',function (req,res) {
    res.render('dir',{url:req.params.dir,files:re.gefile(req,res)})
});


module.exports=router;