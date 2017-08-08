const express=require('express');
const app=express();
const path=require('path');
const index=require('./router/index');

app.use(express.static('./static'));
app.use(express.static('./upload'));

app.set('view engine','jade');
app.set('views',path.join(__dirname,'views'));

app.use(index);

app.use(function (req,res) {
    res.render('notfind')
});

app.listen(3000);
