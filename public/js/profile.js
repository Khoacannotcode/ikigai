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




        //Thông tin
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
                    return "Việt Nam";
                case '107':
                    return "Nhật Bản";
            }
            return "Khác"
        },



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

        //
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

        //looad
        var vm = this;
        vm.user.name = user_name;
        vm.user.birthday = user_birthday;
        vm.user.phone = user_phone;
        vm.user.nihongo = user_nihongo;
        vm.user.address = user_address;
        vm.user.country = user_country;

        //sau khi load
        $("#user-info-table").css('display', 'table');
    }
});