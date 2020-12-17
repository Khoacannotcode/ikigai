var user = new Vue({

    el: '#user-info',
    data: {

        currentField: "",
        changeName: false,
        changePass: false,
        changeBirthday: false,
        changePhone: false,
        changeNihongo: false,
        changeAddress: false,
        changeCountry: false,
        japaneseLevel: "",
        country: "",
        allowPress: true,



        //thÃ´ng tin ngÆ°á»i dÃ¹ng
        user: {

            name: "",
            password: "",
            birthday: "",
            phone: "",
            nihongo: "",
            address: "",
            country: "",
        },

        errors: [],

        birthday: {
            day: "",
            month: "",
            year: ""
        }
    },

    methods: {

        printInfo: function(value) {
            if (value == null || value == '') return '<span class="empty-info">Chưa có thông tin</span>';
            else return value;
        },

        printCountry: function(value) {
            if (value == null || value == '') {
                return '<span class="empty-info">Chưa có thông tin</span>';
            }
            switch (value) {
                case '230':
                    return "Viá»‡t Nam";
                case '107':
                    return "Nháº­t Báº£n";
            }
            return "KhÃ¡c"
        },




        //hiá»‡n trÆ°á»ng cáº§n chá»‰nh sá»­a
        showEditer: function(field) {

            var vm = this;
            vm.errors = [];
            vm.currentField = field;
            switch (field) {
                case 'name':
                    vm.changeName = true;
                    break;
                case 'password':
                    vm.changePass = true;
                    break;
                case 'birthday':
                    vm.changeBirthday = true;
                    break;
                case 'phone':
                    vm.changePhone = true;
                    break;
                case 'nihongo':
                    vm.changeNihongo = true;
                    break;
                case 'address':
                    vm.changeAddress = true;
                    break;
                case 'country':
                    vm.changeCountry = true;
                    break;
                default:
                    break;
            }
        },

        //áº©n trÆ°á»ng cáº§n chá»‰nh sá»­a
        hideEditer: function(field) {

            var vm = this;
            vm.errors = [];
            vm.currentField = '';
            switch (field) {
                case 'name':
                    vm.changeName = false;
                    break;
                case 'password':
                    vm.changePass = false;
                    vm.errors = [];
                    break;
                case 'birthday':
                    vm.changeBirthday = false;
                    break;
                case 'phone':
                    vm.changePhone = false;
                    break;
                case 'nihongo':
                    vm.changeNihongo = false;
                    break;
                case 'address':
                    vm.changeAddress = false;
                    break;
                case 'country':
                    vm.changeCountry = false;
                    break;
                default:
                    break;
            }
        },

        //báº¯t sá»± kiá»‡n lÆ°u thay Ä‘á»•i
        saveChange: function(field) {

            var vm = this;

            // kiá»ƒm tra táº¥n cÃ´ng báº¥m submit liÃªn tá»¥c
            if (!vm.allowPress) {
                return;
            }
            vm.errors = [];
            vm.currentField = field;
            switch (field) {
                case 'name':
                    vm.ajaxSaveChange('name', 'account-name');
                    break;
                case 'birthday':
                    vm.ajaxSaveChange('birthday', '');
                    break;
                case 'phone':
                    vm.ajaxSaveChange('phone', 'account-phone');
                    break;
                case 'nihongo':
                    vm.ajaxSaveChange('nihongo', 'account-nihongo');
                    break;
                case 'address':
                    vm.ajaxSaveChange('address', 'account-address');
                    break;
                case 'country':
                    vm.ajaxSaveChange('country', 'account-country');
                    break;
                case 'password':
                    vm.ajaxChangePassWord();
                    break;
                default:
                    break;
            }
        },

        //hÃ m thay Ä‘á»•i, láº¥y tham sá»‘ lÃ  tÃªn trÆ°á»ng vÃ  id input cá»§a trÆ°á»ng cáº§n Ä‘á»•i 
        ajaxSaveChange: function(field, idField) {

            var vm = this;
            var token = $('#csrf_token').val();

            // láº¥y data
            if (field === 'nihongo') {
                newValue = vm.japaneseLevel;
            } else if (field === 'country') {
                newValue = vm.country;
            } else if (field === 'birthday') {
                var day = parseInt(vm.birthday.day);
                vm.birthday.day = (day < 10) ? ('0' + day) : day;
                var month = parseInt(vm.birthday.month);
                vm.birthday.month = (month < 10) ? ('0' + month) : month;
                vm.user.birthday = vm.birthday.day + "-" + vm.birthday.month + "-" + vm.birthday.year;
                newValue = vm.birthday.year + "-" + vm.birthday.month + "-" + vm.birthday.day;
                var temp = new Date(newValue);
                // xÃ¡c thá»±c ngÃ y thÃ¡ng nÄƒm
                if (temp.getFullYear() != parseInt(vm.birthday.year) && temp.getMonth() != parseInt(month) && temp.getDate() != parseInt(day)) {
                    vm.errors = [];
                    vm.errors.push("Không thành công! Vui lòng kiểm tra lại");
                    return;
                }
            } else {
                newValue = $("#" + idField).val();
            }

            if (newValue == undefined || newValue == null || newValue == "") {

                // xÃ¡c thá»±c thÃ´ng tin trá»‘ng
                $(".error-list").css("color", "red");
                vm.errors = [];
                vm.errors.push("Không có thông tin");
                return;
            }
            if (checkspecialSymbol(newValue)) {

                // xÃ¡c thá»±c kÃ½ tá»± Ä‘áº·c biá»‡t
                $(".error-list").css("color", "red");
                vm.errors = [];
                vm.errors.push("Không thành công! Vui lòng kiểm tra lại");
                return;
            }

            var data = {
                '_token': token,
                'field': field,
                'value': newValue
            };
            //console.log(data);
            vm.allowPress = false;
            $.ajax({
                url: window.location.origin + "/account",
                type: "POST",
                data: data,
                async: true,
                beforeSend: function(xhr) { if (token) return xhr.setRequestHeader('X-CSRF-TOKEN', token); },
                error: function() {
                    $(".error-list").css("color", "red");
                    vm.errors = [];
                    vm.errors.push("Không thành công. Vui lòng kiểm tra lại (Lưu ý: Thông tin không được để trống và không được chứa ký tự đặc biệt)");
                    vm.allowPress = true;
                    return false;
                },

            });
        },



        // update Japanese lavel
        updateJapaneseLevel: function(newValue) {
            this.japaneseLevel = newValue;
        },

        // update country
        updateCountry: function(newValue) {
            this.country = newValue;
        },


    },

    mounted: function() {

        //looad háº¿t dá»¯ liá»‡u
        var vm = this;
        vm.user.name = user_name;
        vm.user.birthday = user_birthday;
        vm.user.phone = user_phone;
        vm.user.nihongo = user_nihongo;
        vm.user.address = user_address;
        vm.user.country = user_country;

        //sau khi load dá»¯ liá»‡u sáº½ hiá»ƒn thá»‹
        $("#user-info-table").css('display', 'table');
    }
});
//# sourceMappingURL=profile.js.map