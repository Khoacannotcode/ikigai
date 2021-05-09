//hàm chuyển tab
function swichTab(tabname) {
    $(".li-tab").removeClass("active");
    $("." + tabname + "-tab").addClass("active");
    $(".tab-pane").removeClass("in active");
    $("#" + tabname + "-content").addClass("in active");

    if (tabname == "login") $(".auth-featured-image").attr('src', '../../public/images/logo/dangnhap.png');
    else $(".auth-featured-image").attr('src', '../../public/images/logo/dangnhap1.png');
}


// bắt sự kiện enter cho input đăng nhập
function enterToLogin(event, t) {
    if (event.keyCode == 13 && $("#email").val() != null && $("#email").val() != undefined && $("#email").val() != "" &&
        $("#password").val() != null && $("#password").val() != undefined && $("#password").val() != "") {
        $("#login-submit").click();
        return false;
    }
}
//hàm đăng xuất sử dụng ajax
// function logout() {
//     console.log("Đăng xuất");
//     $.get(window.location.origin, function(data, status) {
//         if (data == "success") {
//             location.reload();
//         }
//     });
// }

// các hàm yêu cầu phải load xong dom mới call
$(document).ready(function() {

    //enable tooltip boostrap
    $(function() { $('[data-toggle="tooltip"]').tooltip() })

    //bật autosize
    autosize(document.querySelectorAll('textarea'));
    $("#chiTiet").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#Page_Chitiet").offset().top
        }, 'slow');
    });
    $(".hocphi").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#Page_HocPhi").offset().top
        }, 'slow');
    });
    $(".lotrinh").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#Page_Lotrinh").offset().top
        }, 'slow');
    });
    if ($(window).scrollTop() > 200) {
        $('.go-top').fadeIn();
    } else {
        $('.go-top').fadeOut();
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.go-top').fadeIn();
        } else {
            $('.go-top').fadeOut();
        }
    });

    $('.go-top').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
    /* $(".go-top").click(function() {
         $(document).animate({ scrollTop: 0 }, "slow");
     });*/

    $("#tu-van-jav").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tu-van").offset().top
        }, 'slow');
    });
    $("#tu-van-jav1").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tu-van").offset().top
        }, 'slow');
    });
    $("#tu-van-jav2").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tu-van").offset().top
        }, 'slow');
    });
    //bật menu nav
    $('#nav-icon').click(function() {
        $(this).toggleClass('open');
    });

    //set chiều rộng menu mobile
    $(".col-left-menu").css({
        'width': ($(".khoa-hoc-in-menu").width() + 'px')
    });

    $(".col-right-menu").css({
        'width': ((500 - $(".khoa-hoc-in-menu").width()) + 'px')
    });

});

// Người dùng click vào slider
function pressClick(id) {
    $("#" + id).click();
}
// Register to be supported (send mail)
var isSendEmail = false;

function sendMailForSupport() {

    if (isSendEmail) {
        return;
    }
    isSendEmail = true;

    var name = $('#full_name').val();
    var email = $('#user_email').val();
    var phoneNumber = $('#phone_number').val();
    var courseName = $('#course_name').val();

    // Check empty
    if (!name || !email || !phoneNumber || !courseName) {
        $.fancybox.open('<div class="message"><h2>Lỗi!</h2><p>Vui lòng không để thông tin còn trống!</p></div>');
        isSendEmail = false;
        return;
    }

    if (checkspecialSymbol(name) || checkspecialSymbol(email) || checkspecialSymbol(phoneNumber)) {
        $.fancybox.open('<div class="message"><h2>Lỗi!</h2><p>Thông tin không được chứa ký tự đặc biệt!</p></div>');
        isSendEmail = false;
        return;
    }

    if (!validateEmail(email)) {
        $.fancybox.open('<div class="message"><h2>Lỗi!</h2><p>Email không đúng!</p></div>');
        isSendEmail = false;
        return;
    }
}