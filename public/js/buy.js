var paymentVue = new Vue({
    el: '.main-payment',
    data: {

        url: window.location.origin,

        steps: 1,



        changeName: false,
        changePhone: false,
        errorName: '',
        errorPhone: '',

        //step1 
        customerEmail: userEmail,
        customerName: userName,
        customerPhone: userPhone,
        customerAddress: userAddress,


        //
        customerError: false,


    },

    methods: {

        //ìnof
        printInfo: function(value) {
            if (value == null || value == '') return '<span class="empty-info">Chưa có thông tin</span>';
            else return value;
        },

        printType: function(type) {
            if (type == 'course') return "Khoahoc";
            return "";
        },

        //In ra tổng tiền
        formatNumber: function(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        },

        //tải lại trang thông tin
        refresh: function() {
            location.reload();
        },

        //show
        showEditer: function(field) {

            var vm = this;
            switch (field) {

                case 'name':
                    vm.changeName = true;
                    break;
                case 'phone':
                    vm.changePhone = true;
                    break;
                default:
                    break;
            }
        },

        //Đóng
        hideEditer: function(field) {

            var vm = this;
            switch (field) {
                case 'name':
                    vm.changeName = false;
                    break;
                case 'phone':
                    vm.changePhone = false;
                    break;
                default:
                    break;
            }
        },


        //Chỉnh sửa
        hideError: function() {

            this.customerError = false;
            this.deliveryError = false;
            this.errorName = '';
            this.errorPhone = '';
        },

        // tiếp tục
        nextSteps: function() {

            console.log("tiếp tục");
            vm = this;

            //
            if (vm.customerName == '' || vm.customerEmail == '' || vm.customerPhone == '') {

                vm.customerError = true;

            } else {

                vm.steps = 2;
            }

        },
        // trở lại
        prevStep: function() {

            console.log("trở lại");
            vm = this;
            vm.steps = 1;
        },
        // đặt hàng khóa học này
        clickBuy: function() {
            console.log("đặt hàng khóa học này");
            vm = this;
        },


    }
});