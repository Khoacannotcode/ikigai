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

    res.render('pages/Home');
});

app.get('/khoahocN5', function(req, res) {
    res.render('pages/N5');
});
app.get('/khoahocN4', function(req, res) {
    res.render('pages/N4');
});

app.get('/khoahocN3', function(req, res) {
    res.render('pages/N3');
});
app.get('/khoahocN2', function(req, res) {
    res.render('pages/N2');
});
app.get('/khoahocN1', function(req, res) {
    res.render('pages/N1');
});
app.get('/account', function(req, res) {
    res.render('pages/account');
});
app.get('/courses', function(req, res) {
    res.render('pages/courses');
});
app.get('/billing', function(req, res) {
    res.render('pages/billing');
});
app.get('/active', function(req, res) {
    res.render('pages/active');
});
app.get('/buy', function(req, res) {
    res.render('pages/buy');
});
app.get('/buy_login', function(req, res) {
    res.render('pages/buy_login');
});
app.get('/login', function(req, res) {
    res.render('pages/login', { inloi: '' });
});
app.get('/reset', function(req, res) {
    res.render('pages/reset', { inloi: '' });
});
app.listen(port, function() {
    console.log('Connecting to the server...');
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://phungo1243:phungo1243@cluster0.772ha.mongodb.net/dangky01?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.log("Mongo connect err:" + err);
    } else {
        console.log("Mongo connected successful!")
        console.log("use the link: http://localhost:3000/")
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

//dang nhap++++
app.post('/login', async function(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = md5(password);
    console.log(email);
    console.log(hashedPassword);
    inloi = "Sai mật khẩu! Vui lòng đăng nhập lại";

    // console.log(DKTaiKhoan.find({ email: email },'email password'));
    await DKTaiKhoan.find({ email: email, password: hashedPassword }, (err, docs) => {
        if (docs != undefined && docs.length != 0) {
            app.get('/trangchu', function(req, res) {
                nameuser = [];
                nameuser[0] = docs[0].name;
                nameuser[1] = docs[0].email;
                nameuser[3] = docs[0].phone;
                nameuser[2] = docs[0].birthday;
                nameuser[4] = docs[0].japanese_level;
                nameuser[5] = docs[0].country;
                nameuser[6] = docs[0].Images;
                console.log(nameuser);
                res.render('pages/trangchu', { nameuser: nameuser });
            });
            console.log('fail');
            res.redirect('/trangchu'); //render ra trang da dang nhap
            console.log(docs);
            return;

        } else {
            res.render('pages/login', { inloi: inloi });
            return;
        }
    })
});

//dang ky tai khoan
app.get('/dangky', function(req, res) {
    res.render('pages/dangky', { success: '' });
});

app.post("/dangky", function(req, res) {
    success = 'Đăng ký thành công.';
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
        } else if (err) {
            res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
        } else {
            var dangkytaikhoan = DKTaiKhoan({
                name: req.body.txtname,
                email: req.body.eemail,
                password: md5(req.body.password),
                phone: req.body.phone,
                gender: req.body.gender,
                birthday: {
                    month: req.body.birth_month,
                    day: req.body.birth_day,
                    year: req.body.birth_year,
                },
                japanese_level: req.body.japanese_level,
                country: req.body.country,
                Images: req.file.filename
            });
            dangkytaikhoan.save(function(err) {
                if (err) {
                    res.json({ "kq": 0, "errMsg": err });
                } else {
                    // res.redirect('/dangky', { success: success });
                    res.render('pages/dangky', { success: success });
                    return;
                }
            });
        }
    });
});