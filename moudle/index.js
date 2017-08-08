const fs=require('fs');

exports.getdir=function () {
    return fs.readdirSync('./upload');
};
exports.gefile=function (req,res) {
   let url=req.params.dir;
   var files=fs.readdirSync('./upload/'+url);
   return files;
};
