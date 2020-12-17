// load the things we need
var express = require('express');
var routes = require('./routes/index.js');
var app = express();
var port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", "./views");
var md5 = require('md5')

app.use('/public', express.static('public'));


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {

    res.render('pages/home');
});
app.get('/trangchu', function(req, res) {

    res.render('pages/trangchu');
});
app.get('/khoahoc/N5', function(req, res) {
    res.render('pages/N5');
});
app.get('/khoahoc/N4', function(req, res) {
    res.render('pages/N4');
});

app.get('/khoahoc/N3', function(req, res) {
    res.render('pages/N3');
});
app.get('/khoahoc/N2', function(req, res) {
    res.render('pages/N2');
});
app.get('/khoahoc/N1', function(req, res) {
    res.render('pages/N1');
});
app.get('/account', function(req, res) {
    res.render('pages/account');
});
app.get('/account/courses', function(req, res) {
    res.render('pages/courses');
});
app.get('/account/billing', function(req, res) {
    res.render('pages/billing');
});
app.get('/account/active', function(req, res) {
    res.render('pages/active');
});
app.get('/buy', function(req, res) {
    res.render('pages/buy');
});
app.listen(port, function() {
    console.log('3000 is the magic port');
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://phungo1243:phungo1243@cluster0.772ha.mongodb.net/dangky01?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.log("Mongo connect err:" + err);
    } else {
        console.log("Mongo connected successful!")
    }
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var filename; // bien luu path cua image upload

//multer
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        console.log(file);
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("avatar");

var DKTaiKhoan = require("./Models/dangkytaikhoan");

//dang ky tai khoan
//app.get('/pages/dangky', function(req, res) {
// res.render('pages/dangky');
//});

// app.post("/", function(req, res) {
//     upload(req, res, function(err) {
//         if (err instanceof multer.MulterError) {
//             res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
//         } else if (err) {
//             res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
//         } else {
//             var dangkytaikhoan = DKTaiKhoan({
//                 name: req.body.txtname,
//                 email: req.body.eemail,
//                 password: md5(req.body.password),
//                 phone: req.body.phone,
//                 gender: req.body.gender,
//                 birthday: {
//                     month: req.body.birth_month,
//                     day: req.body.birth_day,
//                     year: req.body.birth_year,
//                 },
//                 japanese_level: req.body.japanese_level,
//                 country: req.body.country,
//                 Images: req.file.filename
//             });
//             dangkytaikhoan.save(function(err) {
//                 if (err) {
//                     res.json({ "kq": 0, "errMsg": err });
//                 } else {
//                     res.json({ "kq": 1 });
//                 }
//             });

//         }
//     });
// });

//Danh sach hoc vien
app.get("/list", function(req, res) {
    DKTaiKhoan.find(function(err, data) {
        if (err) {
            res.json({ "kq": 0, "errMsg": err })
        } else {
            res.render("list", { danhsach: data });
        }
    });
});


// xoa hoc vien
app.get("/delete/:id", function(req, res) {
    DKTaiKhoan.deleteOne({ _id: req.params.id }, function(err) {
        if (err) {
            res.json({ "kq": 0, "errMsg": err });
        } else {
            res.redirect("../list");
        }
    });
});

//dang nhap


app.post('/', async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = md5(password);
    console.log(email);
    console.log(hashedPassword);
    // console.log(DKTaiKhoan.find({ email: email },'email password'));
    await DKTaiKhoan.find({ email: email, password: hashedPassword }, (err, docs) => {
        if (docs != undefined && docs.length != 0) {
            console.log('fail');
            res.redirect('/trangchu'); //render ra trang da dang nhap
            console.log(docs);
            return;

        } else {

            //res.send("Dang nhap sai");
            res.redirect(function(req, res) {
                alert("đangkggg");
            });
            //var div = document.getElementById("danger");
            // Gán nội dung ô input vào thẻ div
            // div.innerHTML = input.value;
            //alert("Đăng nhập sai");


        }
    })
});