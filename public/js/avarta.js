function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            console.log(e);
            $('#user-avatar-preview').attr('src', e.target.result);
            $(".save-avatar").css("display", 'inline');
            $(".save-admin-avatar").css("display", 'inline');
            $(".change-avatar").css("display", 'none');
            $(".clear-preview-upload").css("display", 'inline');
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(".change-avatar").click(function() {
    console.log("change avatar");
    $("#inputAvatar").click();
});