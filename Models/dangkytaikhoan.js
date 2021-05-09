var mongoose = require("mongoose");

var schemaDKTaiKhoan = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    birthday: {},
    japanese_level: String,
    country: String,
    Images: String
});

module.exports = mongoose.model("DKTaiKhoan", schemaDKTaiKhoan);
