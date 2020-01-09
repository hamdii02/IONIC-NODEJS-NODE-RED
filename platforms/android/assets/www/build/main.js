webpackJsonp([5],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    endpoint: "https://localhost:8443"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__addUser_addUser__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__streamfeed_streamfeed__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__firesensors_firesensors__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_modify__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(_service2, _service, socket, nav, popoverCtrl, toastCtrl) {
        this._service2 = _service2;
        this._service = _service;
        this.socket = socket;
        this.nav = nav;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.WindowsSensors = [];
        this.DoorsSensors = [];
        this.refresh = true;
        this.Home = {
            Alarm: ""
        };
        this.Mono = 0;
        this.Duo = 0;
        this.Temp = 0;
        this.alarm = false;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.isToggled = false;
        this.socket.connect();
        this.Power = JSON.parse(localStorage.getItem("userData")).permissionLevel.toString();
        if (this.Power === "1") {
            this.alarm = true;
        }
        var that = this;
        this.socket.on(JSON.parse(localStorage.getItem("userData")).homeId.toString(), function (msg) {
            that.WindowsSensors = [];
            that.DoorsSensors = [];
            var position = 0;
            var position2 = 0;
            for (var i in JSON.parse(msg.payload)) {
                if (i.endsWith("Window")) {
                    that.WindowsSensors.push([
                        i,
                        JSON.parse(msg.payload)[i],
                        JSON.parse(msg.payload)[i] == 0,
                        position
                    ]);
                    position++;
                }
                else if (i.endsWith("Door")) {
                    that.DoorsSensors.push([
                        i,
                        JSON.parse(msg.payload)[i],
                        JSON.parse(msg.payload)[i] == 0,
                        position2
                    ]);
                    position2++;
                }
            }
            _this.Home.Alarm = JSON.parse(msg.payload).Alarm;
            if (_this.refresh) {
                if (_this.Home.Alarm.toString() === "0") {
                    _this.isToggled = false;
                }
                else {
                    _this.isToggled = true;
                }
            }
            _this.Mono = JSON.parse(msg.payload).CarbonMonoxide;
            _this.Duo = JSON.parse(msg.payload).CarbonDioxide;
            _this.Temp = JSON.parse(msg.payload).Temp;
        });
        var that = this;
        setInterval(function () {
            if (localStorage.getItem("userData")) {
                that._service.RefreshToken().subscribe(function (d) { });
            }
        }, 900000);
    };
    // to go account page
    HomePage.prototype.goToStreamFeed = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__streamfeed_streamfeed__["a" /* StreamfeedPage */]);
    };
    HomePage.prototype.goTostats = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__firesensors_firesensors__["a" /* FiresensorsPage */], {
            mono: this.Mono,
            duo: this.Duo,
            temp: this.Temp
        });
    };
    // go to register page
    HomePage.prototype.addUser = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_0__addUser_addUser__["a" /* AddUserPage */]);
    };
    HomePage.prototype.notify = function () {
        this.refresh = false;
        var a = JSON.parse(localStorage.getItem("userData")).homeId.toString() + "_alarm";
        this._service2
            .PostValue({ NewValue: Number(this.isToggled).toString(), change: a }, JSON.parse(localStorage.getItem("userData")).accessToken)
            .subscribe(function (d) { });
        var that = this;
        setTimeout(function () {
            that.refresh = true;
        }, 2000);
    };
    HomePage.prototype.useToast = function (msg, time) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: "top",
            cssClass: "dark-trans",
            closeButtonText: "OK",
            showCloseButton: true
        });
        toast.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: "page-home",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/home/home.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="secondary">\n    <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n    <ion-title> <p>Smart Car</p> </ion-title>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label *ngIf="isToggled">Alert Activated</ion-label>\n      <ion-label *ngIf="!isToggled">Alert Desactivated</ion-label>\n      <ion-toggle\n        [(ngModel)]="isToggled"\n        (ionChange)="notify()"\n        disabled="{{ alarm }}"\n      ></ion-toggle>\n    </ion-item>\n  </ion-list>\n  <div cards>\n    <div class="grid-full">\n      <ion-row>\n        <ion-col>\n          <img\n            class="image"\n            (click)="goToStreamFeed()"\n            src="assets/img/cameras.png"\n          />\n\n          <div class="image">check location</div>\n        </ion-col>\n\n        <ion-col>\n          <img\n            class="image"\n            (click)="goTostats()"\n            src="assets/img/fire.png"\n          />\n          <div class="image">sleeping stats</div>\n        </ion-col>\n\n       \n\n      \n      </ion-row>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__services_modify__["a" /* ModifyService */],
        __WEBPACK_IMPORTED_MODULE_6__services_login__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__["Socket"],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = (function () {
    function LoginPage(navParams, nav, forgotCtrl, menu, toastCtrl, loading, _service) {
        this.navParams = navParams;
        this.nav = nav;
        this.forgotCtrl = forgotCtrl;
        this.menu = menu;
        this.toastCtrl = toastCtrl;
        this.loading = loading;
        this._service = _service;
        this.pageTitle = "Login";
        this.user = {};
        this.menu.swipeEnable(false);
        var that = this;
        if (localStorage.getItem("userData")) {
            this._service.CheckUser().subscribe(function (result) {
                that.validToken = result.ValidJWT;
                if (localStorage.getItem("userData") && that.validToken === "True") {
                    that.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                }
                else if (!localStorage.getItem("UserId") &&
                    !navParams.get("willingly")) {
                    that.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
                }
            });
        }
        else {
            if (localStorage.getItem("userData") && that.validToken === "True") {
                that.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }
            else if (!localStorage.getItem("UserId") &&
                !navParams.get("willingly")) {
                that.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
            }
        }
    }
    LoginPage.prototype.ionViewDidLoad = function () { };
    LoginPage.prototype.loadingCreate = function () {
        this.loader = this.loading.create({
            content: "Loading..."
            //duration : 1500
        });
        return this.loader.present();
    };
    LoginPage.prototype.onSubmit = function () {
        var _this = this;
        this.loadingCreate().then(function () {
            _this.validateUser();
        });
    };
    LoginPage.prototype.validateUser = function () {
        var _this = this;
        this._service.ValidateUser(this.user).subscribe(function (d) {
            _this.r = _this.confirmResponse(d);
            if (_this.r) {
                _this.loader.dismiss();
                localStorage.setItem("userData", JSON.stringify(d));
                localStorage.setItem("UserId", "true");
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
            }
            else {
                _this.loader.dismiss();
                _this.useToast("Your Credentials are incorrect, Please verify it !", 5000);
            }
        });
    };
    LoginPage.prototype.confirmResponse = function (data) {
        if (data.accessToken) {
            return true;
        }
        else {
            return false;
        }
    };
    // go to register page
    LoginPage.prototype.register = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    // login and go to home page
    LoginPage.prototype.login = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.useToast = function (msg, time) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: "top",
            cssClass: "dark-trans",
            closeButtonText: "OK",
            showCloseButton: true
        });
        toast.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: "page-login",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/login/login.html"*/'<!-- -->\n\n<ion-content padding class="animated fadeIn login auth-page">\n  <div class="login-content">\n    <!-- Logo -->\n    <div text-center class="animated fadeInDown">\n      <div class="logo"></div>\n      <h2 ion-text class="text-primary"><strong>Welcome!</strong></h2>\n    </div>\n\n    <!-- Login form -->\n    <form #userLoginForm="ngForm" class="list-form">\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n          Email\n        </ion-label>\n        <ion-input\n          type="email"\n          #Email="ngModel"\n          [(ngModel)]="user.email"\n          [ngModelOptions]="{ standalone: true }"\n          required\n        ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n          Password\n        </ion-label>\n        <ion-input\n          type="password"\n          #Password="ngModel"\n          [(ngModel)]="user.password"\n          [ngModelOptions]="{ standalone: true }"\n          required\n        ></ion-input>\n      </ion-item>\n    </form>\n\n    <div>\n      <button\n        ion-button\n        icon-start\n        block\n        color="dark"\n        tappable\n        (click)="onSubmit()"\n      >\n        <ion-icon name="log-in"></ion-icon>\n        LOG IN\n      </button>\n    </div>\n\n    <!-- Other links -->\n    <div text-center margin-top>\n      <span ion-text color="primary" tappable (click)="register()"\n        >Not a user? <strong>Register here!</strong></span\n      >\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_0__services_login__["a" /* LoginService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiresensorsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_highcharts_highcharts_more__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_highcharts_highcharts_more___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_highcharts_highcharts_more__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





__WEBPACK_IMPORTED_MODULE_3_highcharts_highcharts_more___default()(__WEBPACK_IMPORTED_MODULE_2_highcharts___default.a);
var FiresensorsPage = (function () {
    function FiresensorsPage(navCtrl, loadingCtrl, socket, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.socket = socket;
        this.navParams = navParams;
        this.data2 = [0, 0];
        this.data = 0;
        this.i = 1;
        this.showImage = true;
        this.data2 = [new Date().getTime(), 0];
        this.carbMono = navParams.get("mono");
        this.carbDuo = navParams.get("duo");
        this.temp = navParams.get("temp");
        this.socket.connect();
        if (localStorage.getItem("userData")) {
            this.socket.on(JSON.parse(localStorage.getItem("userData")).homeId.toString(), function (msg) {
                _this.temp = JSON.parse(msg.payload).Temp;
            });
        }
        if (this.carbMono == 0) {
            var loading_1 = this.loadingCtrl.create({
                spinner: "ios",
                content: "Please wait..."
            });
            loading_1.present();
            setTimeout(function () {
                loading_1.dismiss();
            }, 5000);
        }
        //this.carbMono = 0;
        //this.carbDuo = 0;
    }
    FiresensorsPage.prototype.ionViewDidLoad = function () {
        __WEBPACK_IMPORTED_MODULE_2_highcharts___default.a.chart(this.container.nativeElement, {
            chart: {
                type: "gauge",
                height: "80%",
                backgroundColor: null,
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                style: {
                    fontFamily: "Verdana, sans-serif",
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: "15px"
                },
                text: "distraction Level",
                y: 30
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [
                    {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }
                            //  stops: [[0, "#FFF"], [1, "#333"]]
                        },
                        borderWidth: 0,
                        outerRadius: "109%"
                    },
                    {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }
                            // stops: [[0, "#333"], [1, "#FFF"]]
                        },
                        borderWidth: 1,
                        outerRadius: "107%"
                    },
                    {},
                    {
                        // backgroundColor: "#DDD",
                        borderWidth: 0,
                        outerRadius: "105%",
                        innerRadius: "103%"
                    }
                ]
            },
            // the value axis
            yAxis: {
                min: 0,
                max: 10,
                minorTickInterval: "auto",
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: "inside",
                minorTickColor: "#666",
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: "inside",
                tickLength: 10,
                tickColor: "#666",
                labels: {
                    step: 2,
                    rotation: 0
                },
                title: {
                    text: "KSS"
                },
                plotBands: [
                    {
                        from: 0,
                        to: 4,
                        color: "#55BF3B" // green
                    },
                    {
                        from: 4,
                        to: 8,
                        color: "#DDDF0D" // yellow
                    },
                    {
                        from: 8,
                        to: 10,
                        color: "#DF5353" // red
                    }
                ]
            },
            series: [
                {
                    type: "gauge",
                    name: "CO",
                    data: [this.carbMono],
                    tooltip: {
                        valueSuffix: "KSS"
                    }
                }
            ]
        }, 
        // Add some life
        function (chart) {
            setInterval(function () {
                var _this = this;
                var point = chart.series[0].points[0], newVal;
                if (localStorage.getItem("userData")) {
                    this.socket.on(JSON.parse(localStorage.getItem("userData")).homeId.toString(), function (msg) {
                        _this.carbMono = JSON.parse(msg.payload).CarbonMonoxide;
                    });
                }
                newVal = this.carbMono;
                this.data = newVal;
                point.update(newVal);
            }, 2500);
        });
        __WEBPACK_IMPORTED_MODULE_2_highcharts___default.a.chart(this.container1.nativeElement, {
            chart: {
                type: "gauge",
                height: "80%",
                backgroundColor: null,
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                style: {
                    fontFamily: "Verdana, sans-serif",
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: "15px"
                },
                text: "Drowsiness Level",
                y: 30
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [
                    {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }
                            //  stops: [[0, "#FFF"], [1, "#333"]]
                        },
                        borderWidth: 0,
                        outerRadius: "109%"
                    },
                    {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }
                            // stops: [[0, "#333"], [1, "#FFF"]]
                        },
                        borderWidth: 1,
                        outerRadius: "107%"
                    },
                    {},
                    {
                        // backgroundColor: "#DDD",
                        borderWidth: 0,
                        outerRadius: "105%",
                        innerRadius: "103%"
                    }
                ]
            },
            // the value axis
            yAxis: {
                min: 0,
                max: 10,
                minorTickInterval: "auto",
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: "inside",
                minorTickColor: "#666",
                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: "inside",
                tickLength: 10,
                tickColor: "#666",
                labels: {
                    step: 2,
                    rotation: 0
                },
                title: {
                    text: "KSS"
                },
                plotBands: [
                    {
                        from: 0,
                        to: 4,
                        color: "#55BF3B" // green
                    },
                    {
                        from: 4,
                        to: 8,
                        color: "#DDDF0D" // yellow
                    },
                    {
                        from: 8,
                        to: 10,
                        color: "#DF5353" // red
                    }
                ]
            },
            series: [
                {
                    type: "gauge",
                    name: "CO²",
                    data: [this.carbDuo],
                    tooltip: {
                        valueSuffix: " KSS"
                    }
                }
            ]
        }, 
        // Add some life
        function (chart) {
            setInterval(function () {
                var _this = this;
                var point = chart.series[0].points[0], newVal;
                if (localStorage.getItem("userData")) {
                    this.socket.on(JSON.parse(localStorage.getItem("userData")).homeId.toString(), function (msg) {
                        _this.carbDuo = JSON.parse(msg.payload).CarbonDioxide;
                    });
                }
                newVal = this.carbDuo;
                point.update(newVal);
            }, 2500);
        });
    };
    return FiresensorsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("container", { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], FiresensorsPage.prototype, "container", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("container1", { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], FiresensorsPage.prototype, "container1", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("container2", { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], FiresensorsPage.prototype, "container2", void 0);
FiresensorsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "page-firesensors",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/firesensors/firesensors.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n    <ion-title> <p>Stats of the behaviour of the driver </p> </ion-title>\n   \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h2></h2>\n\n  <div #container></div>\n  <div #container1></div>\n  <div #container2></div>\n</ion-content>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/firesensors/firesensors.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], FiresensorsPage);

//# sourceMappingURL=firesensors.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StreamfeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the StreamfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StreamfeedPage = (function () {
    function StreamfeedPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    StreamfeedPage.prototype.ionViewDidLoad = function () { };
    return StreamfeedPage;
}());
StreamfeedPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "page-streamfeed",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/streamfeed/streamfeed.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="secondary">\n    <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n    <ion-title> <p>Surveillance Cameras</p> </ion-title>\n    <!--     <ion-buttons end>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card>\n    <video style="width: 100%; height: 100%" loop autoplay>\n      <source src="assets/streamfeeds/door.mp4" type="video/mp4" />\n      Your browser does not support playing this Video\n    </video>\n\n    <div class="card-title">Door Camera</div>\n  </ion-card>\n\n  <ion-card>\n    <video style="width: 100%; height: 100%" loop autoplay>\n      <source src="assets/streamfeeds/livingroom.mp4" type="video/mp4" />\n      Your browser does not support playing this Video\n    </video>\n\n    <div class="card-title">Living Room Camera</div>\n  </ion-card>\n\n  <ion-card>\n    <video style="width: 100%; height: 100%" loop autoplay>\n      <source src="assets/streamfeeds/kitchen.mp4" type="video/mp4" />\n      Your browser does not support playing this Video\n    </video>\n\n    <div class="card-title">Kitchen Camera</div>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/streamfeed/streamfeed.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], StreamfeedPage);

//# sourceMappingURL=streamfeed.js.map

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);


var ErrorService = (function () {
    function ErrorService() {
        this.urlAPI = __WEBPACK_IMPORTED_MODULE_0__environment__["a" /* environment */].endpoint;
    }
    ErrorService.prototype.handleError = function (error) {
        alert(error.json().error || "Cannot Establish Connection with Server");
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(error.json().error || "Cannot Establish Connection with Server");
    };
    return ErrorService;
}());

//# sourceMappingURL=error.js.map

/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/addUser/addUser.module": [
		745,
		4
	],
	"../pages/doors/doors.module": [
		746,
		3
	],
	"../pages/firesensors/firesensors.module": [
		747,
		2
	],
	"../pages/streamfeed/streamfeed.module": [
		748,
		1
	],
	"../pages/windows/windows.module": [
		749,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 322;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = (function () {
    function RegisterPage(nav, forgotCtrl, toastCrtl, loading, _service) {
        this.nav = nav;
        this.forgotCtrl = forgotCtrl;
        this.toastCrtl = toastCrtl;
        this.loading = loading;
        this._service = _service;
        this.pageTitle = "Registration";
        this.user = {};
        this.registerForm = {};
        this.registerForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            homeId: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            userName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            address: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(10),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5)
            ]))
        });
    }
    // register and go to home page
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (this.ValidateUser() === "allclear") {
            this.loadingCreate().then(function () {
                _this._service.RegisterUser(_this.user).subscribe(function (d) {
                    _this.r = _this.confirmResponse(d);
                    _this.loader.dismiss();
                    if (_this.r) {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
                    }
                });
            });
        }
        else {
            this.useToast(this.ValidateUser(), 5000);
        }
    };
    RegisterPage.prototype.ValidateUser = function () {
        if (this.registerForm.controls.homeId.invalid)
            return "Home Code is Invalid!";
        else if (this.registerForm.controls.address.invalid)
            return "Address is Invalid!";
        else if (this.registerForm.controls.userName.invalid)
            return "Username is Invalid!";
        else if (this.registerForm.controls.email.invalid)
            return "Email is Invalid!";
        else if (this.registerForm.controls.password.invalid)
            return "Password is Invalid!";
        else {
            this.user = {
                userName: this.registerForm.controls.userName.value,
                email: this.registerForm.controls.email.value,
                password: this.registerForm.controls.password.value,
                address: this.registerForm.controls.address.value,
                homeId: this.registerForm.controls.homeId.value
            };
            return "allclear";
        }
    };
    RegisterPage.prototype.login = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */], { willingly: true });
    };
    RegisterPage.prototype.useToast = function (msg, time) {
        var toast = this.toastCrtl.create({
            message: msg,
            duration: time,
            position: "top",
            cssClass: "dark-trans",
            closeButtonText: "OK",
            showCloseButton: true
        });
        toast.present();
    };
    RegisterPage.prototype.loadingCreate = function () {
        this.loader = this.loading.create({
            content: "Loading..."
        });
        return this.loader.present();
    };
    RegisterPage.prototype.confirmResponse = function (data) {
        if (data.id) {
            this.useToast("Register was successful", 5000);
            localStorage.setItem("UserId", data);
            return true;
        }
        else {
            this.useToast(data.err, 5000);
            return false;
        }
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        selector: "page-register",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/register/register.html"*/'<!-- -->\n<ion-content class="auth-page">\n  <div class="login-content">\n\n    <!-- Logo -->\n    <div text-center class="animated fadeInDown">\n        <div class="logo-chico"></div>\n        <h4 ion-text class="text-primary">\n          <strong>Register Your Home</strong>\n        </h4>\n      </div>\n\n    <!-- Login form -->\n    <div class="list-form" [formGroup]="registerForm">\n\n        <ion-item>\n            <ion-label floating>\n              <ion-icon name="code" item-start class="text-primary"></ion-icon>\n              Home Code*\n              </ion-label>\n            <ion-input type="text" formControlName="homeId"></ion-input>\n        </ion-item>\n\n      <ion-item>\n          <ion-label floating>\n            <ion-icon name="home" item-start class="text-primary"></ion-icon>\n            Street Address*\n            </ion-label>\n          <ion-input type="text" formControlName="address"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="person" item-start class="text-primary"></ion-icon>\n          Username*\n        </ion-label>\n        <ion-input type="text" formControlName="userName"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n          Email*\n        </ion-label>\n        <ion-input type="email" formControlName="email" class="form-control"></ion-input>\n      </ion-item>\n      <!--<div class="validation-errors">\n          <ng-container *ngFor="let validation of validation_messages.email" >\n            <div class="error-message" *ngIf="validations_form.get(\'email\').hasError(validation.type) && (validations_form.get(\'email\').dirty || validations_form.get(\'email\').touched)">\n          {{ validation.message }}\n            </div>\n          </ng-container>\n        </div>-->\n\n      <ion-item>\n        <ion-label floating>\n          <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n          Password (Min 5 Character)\n        </ion-label>\n        <ion-input type="password" formControlName="password"></ion-input>\n      </ion-item>\n\n    </div>\n\n    <div margin-top>\n      <button ion-button block color="dark" tappable (click)="register()">\n        SIGN UP\n      </button>\n\n    </div>\n\n    <!-- Other links -->\n    <div text-center margin-top padding-bottom>\n      <span ion-text color="primary" tappable (click)="login()">You already have an account ?</span>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/register/register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1__services_login__["a" /* LoginService */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DoorsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_modify__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DoorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DoorsPage = (function () {
    function DoorsPage(navCtrl, socket, loadingCtrl, navParams, _service, _service2) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this._service = _service;
        this._service2 = _service2;
        this.refresh = true;
        this.modify = false;
        this.DoorsSensors = [];
        if (JSON.parse(localStorage.getItem("userData")).permissionLevel.toString() === "1") {
            this.modify = true;
        }
        this.isToggled = true;
        this.DoorsSensors = navParams.get("DoorsSensors");
        this.socket.connect();
        var that = this;
        this.socket.on(JSON.parse(localStorage.getItem("userData")).homeId.toString(), function (msg) {
            if (_this.refresh) {
                var DoorSensors = [];
                var position = 0;
            }
            for (var i in JSON.parse(msg.payload)) {
                if (i.endsWith("Door")) {
                    if (_this.refresh) {
                        DoorSensors.push([
                            i,
                            JSON.parse(msg.payload)[i],
                            JSON.parse(msg.payload)[i] == 0,
                            position
                        ]);
                    }
                    position++;
                }
            }
            if (_this.refresh) {
                _this.DoorsSensors = DoorSensors;
            }
        });
        var loading = this.loadingCtrl.create({
            spinner: "ios",
            content: "Please wait..."
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 2000);
    }
    DoorsPage.prototype.ionViewDidLoad = function () { };
    DoorsPage.prototype.changeDoor = function (door, value, position) {
        this.DoorsSensors[position] = [door, !value, value == 1, position];
        this.refresh = false;
        var a = JSON.parse(localStorage.getItem("userData")).homeId.toString() +
            "_" +
            door.toString();
        this._service2
            .PostValue({ NewValue: Number(!value).toString(), change: a }, JSON.parse(localStorage.getItem("userData")).accessToken)
            .subscribe(function (d) { });
        var that = this;
        setTimeout(function () {
            that.refresh = true;
        }, 2000);
    };
    return DoorsPage;
}());
DoorsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "page-doors",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/doors/doors.html"*/'<!--\n  Generated template for the DoorsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="secondary">\n    <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n    <ion-title> <p>Doors Status</p> </ion-title>\n   \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let item of DoorsSensors">\n      <ion-label *ngIf="item[1] == 1"\n        >{{ item[0].split("_")[0] }} {{ item[0].split("_")[1] }}\n        {{ item[0].split("_")[2] }} is unlocked</ion-label\n      >\n      <ion-label *ngIf="item[1] == 0"\n        >{{ item[0].split("_")[0] }} {{ item[0].split("_")[1] }}\n        {{ item[0].split("_")[2] }} is locked</ion-label\n      >\n      <ion-toggle\n        [ngModel]="!item[2]"\n        (ionChange)="changeDoor(item[0], item[1], item[3])"\n        disabled="{{ modify }}"\n      ></ion-toggle>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/doors/doors.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__services_login__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_4__services_modify__["a" /* ModifyService */]])
], DoorsPage);

//# sourceMappingURL=doors.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_modify__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the WindowsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WindowsPage = (function () {
    function WindowsPage(navCtrl, socket, loadingCtrl, navParams, _service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this._service = _service;
        this.refresh = true;
        this.modify = false;
        this.WindowsSensors = [];
        if (JSON.parse(localStorage.getItem("userData")).permissionLevel.toString() === "1") {
            this.modify = true;
        }
        this.isToggled = true;
        this.socket.connect();
        var that = this;
        this.WindowsSensors = navParams.get("WindowsSensors");
        this.socket.on(JSON.parse(localStorage.getItem("userData")).homeId.toString(), function (msg) {
            if (_this.refresh) {
                var WindowSensors = [];
                var position = 0;
            }
            for (var i in JSON.parse(msg.payload)) {
                if (i.endsWith("Window")) {
                    if (_this.refresh) {
                        WindowSensors.push([
                            i,
                            JSON.parse(msg.payload)[i],
                            JSON.parse(msg.payload)[i] == 0,
                            position
                        ]);
                    }
                    position++;
                }
            }
            if (_this.refresh) {
                _this.WindowsSensors = WindowSensors;
            }
        });
        var loading = this.loadingCtrl.create({
            spinner: "ios",
            content: "Please wait..."
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 2000);
    }
    WindowsPage.prototype.ionViewDidLoad = function () { };
    WindowsPage.prototype.changeWindow = function (window, value, position) {
        this.WindowsSensors[position] = [window, !value, value == 1, position];
        this.refresh = false;
        var a = JSON.parse(localStorage.getItem("userData")).homeId.toString() +
            "_" +
            window.toString();
        this._service
            .PostValue({ NewValue: Number(!value).toString(), change: a }, JSON.parse(localStorage.getItem("userData")).accessToken)
            .subscribe(function (d) { });
        var that = this;
        setTimeout(function () {
            that.refresh = true;
        }, 2000);
    };
    return WindowsPage;
}());
WindowsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "page-windows",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/windows/windows.html"*/'<!--\n  Generated template for the DoorsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="secondary">\n    <button ion-button menuToggle><ion-icon name="menu"></ion-icon></button>\n    <ion-title> <p>Windows Status</p> </ion-title>\n  \n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let item of WindowsSensors">\n      <ion-label *ngIf="item[1] == 1"\n        >{{ item[0].split("_")[0] }} {{ item[0].split("_")[1] }}\n        {{ item[0].split("_")[2] }} is unlocked</ion-label\n      >\n      <ion-label *ngIf="item[1] == 0"\n        >{{ item[0].split("_")[0] }} {{ item[0].split("_")[1] }}\n        {{ item[0].split("_")[2] }} is locked</ion-label\n      >\n      <ion-toggle\n        [ngModel]="!item[2]"\n        (ionChange)="changeWindow(item[0], item[1], item[3])"\n        disabled="{{ modify }}"\n      ></ion-toggle>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/windows/windows.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__services_modify__["a" /* ModifyService */]])
], WindowsPage);

//# sourceMappingURL=windows.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(388);



// this is the magic wand
Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_modify__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_login_login__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_register_register__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_addUser_addUser__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_http__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularx_qrcode__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_social_sharing__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_screenshot__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_streamfeed_streamfeed__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_firesensors_firesensors__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ng_socket_io__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_doors_doors__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_windows_windows__ = __webpack_require__(382);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


























var config = { url: "https://localhost:8443", options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_addUser_addUser__["a" /* AddUserPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_streamfeed_streamfeed__["a" /* StreamfeedPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_firesensors_firesensors__["a" /* FiresensorsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_doors_doors__["a" /* DoorsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_windows_windows__["a" /* WindowsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_17__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_23_ng_socket_io__["SocketIoModule"].forRoot(config),
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {
                scrollPadding: false,
                scrollAssist: true,
                autoFocusAssist: false
            }, {
                links: [
                    { loadChildren: '../pages/addUser/addUser.module#AccesoPageModule', name: 'AddUserPage', segment: 'addUser', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/doors/doors.module#DoorsPageModule', name: 'DoorsPage', segment: 'doors', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/firesensors/firesensors.module#FiresensorsPageModule', name: 'FiresensorsPage', segment: 'firesensors', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/streamfeed/streamfeed.module#StreamfeedPageModule', name: 'StreamfeedPage', segment: 'streamfeed', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/windows/windows.module#WindowsPageModule', name: 'WindowsPage', segment: 'windows', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                name: "_mdc_HomeSecurity",
                driverOrder: ["indexeddb", "sqlite", "websql"]
            }),
            __WEBPACK_IMPORTED_MODULE_18_angularx_qrcode__["a" /* QRCodeModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_addUser_addUser__["a" /* AddUserPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_streamfeed_streamfeed__["a" /* StreamfeedPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_firesensors_firesensors__["a" /* FiresensorsPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_doors_doors__["a" /* DoorsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_windows_windows__["a" /* WindowsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_1__services_login__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_screenshot__["a" /* Screenshot */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_0__services_modify__["a" /* ModifyService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operators__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error__ = __webpack_require__(266);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginService = (function (_super) {
    __extends(LoginService, _super);
    function LoginService(_http) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        });
        _this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
        return _this;
    }
    LoginService.prototype.ValidateUser = function (IUser) {
        return this._http
            .post(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* environment */].endpoint + "/auth", IUser)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (response) { return response.json(); }), Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["catchError"])(this.handleError))
            .do(function (response) { });
    };
    LoginService.prototype.RefreshToken = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            authorization: "Bearer " +
                JSON.parse(localStorage.getItem("userData")).accessToken.toString()
        });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this._http
            .post(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* environment */].endpoint + "/auth/refresh", {
            refresh_token: JSON.parse(localStorage.getItem("userData")).refreshToken.toString()
        }, options)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (response) {
            var newData = JSON.parse(localStorage.getItem("userData"));
            newData.accessToken = response.json().access_token;
            localStorage.setItem("userData", JSON.stringify(newData));
        }), Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["catchError"])(this.handleError))
            .do(function (response) { });
    };
    LoginService.prototype.RegisterUser = function (IUser) {
        return this._http
            .post(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* environment */].endpoint + "/users", IUser)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (response) { return response.json(); }), Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["catchError"])(this.handleError))
            .do(function (response) { });
    };
    LoginService.prototype.AddUser = function (IUser) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            authorization: "Bearer " +
                JSON.parse(localStorage.getItem("userData")).accessToken.toString()
        });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this._http
            .post(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* environment */].endpoint + "/users/add", IUser, options)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (response) { return response.json(); }), Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["catchError"])(this.handleError))
            .do(function (response) { });
    };
    LoginService.prototype.CheckUser = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            authorization: "Bearer " +
                JSON.parse(localStorage.getItem("userData")).accessToken.toString()
        });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this._http
            .post(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* environment */].endpoint + "/users/check", {}, options)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (response) { return response.json(); }));
    };
    LoginService.prototype.RecoverPassword = function (email) {
        return this._http
            .get(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* environment */].endpoint + "/users/recoverpassword/" + email, this.options)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (response) { return response; }), Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["catchError"])(this.handleError))
            .do(function (response) { });
    };
    return LoginService;
}(__WEBPACK_IMPORTED_MODULE_4__error__["a" /* ErrorService */]));
LoginService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], LoginService);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 707:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 737:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home_home__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_addUser_addUser__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, keyboard, socket, toastCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.keyboard = keyboard;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.admin = "0";
        this.initializeApp();
        this.appMenuItems = [
            { title: "Home", component: __WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */], icon: "home" },
            {
                title: "Local Weather",
                component: "",
                icon: "partly-sunny"
            }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.statusBar.overlaysWebView(false);
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        this.socket.disconnect();
        localStorage.removeItem("userData");
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
    };
    MyApp.prototype.menuPrincipal = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_0__pages_home_home__["a" /* HomePage */]);
    };
    MyApp.prototype.addUser = function () {
        this.admin = JSON.parse(localStorage.getItem("userData")).permissionLevel.toString();
        if (this.admin === "1073741824") {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_8__pages_addUser_addUser__["a" /* AddUserPage */]);
        }
        else {
            this.useToast("You should be admin to add users", 2000);
        }
    };
    MyApp.prototype.useToast = function (msg, time) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: "top",
            cssClass: "dark-trans",
            closeButtonText: "OK",
            showCloseButton: true
        });
        toast.present();
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/app/app.html"*/'<ion-menu side="left" id="authenticated" [content]="content">\n  <ion-header>\n    <ion-toolbar class="user-profile">\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4>\n            <div class="user-avatar">\n              <img src="assets/img/logo-inicio.png" alt="logo-inicio" />\n            </div>\n          </ion-col>\n          <ion-col padding-top col-8>\n            <h2 ion-text class="no-margin bold text-white">\n              Smart Car Security\n            </h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="common-bg-2">\n    <ion-grid>\n      <ion-row no-padding class="other-data">\n        <ion-col no-padding class="column">\n          <button\n            ion-button\n            icon-left\n            small\n            full\n            color="light"\n            menuClose\n            (click)="menuPrincipal()"\n          >\n            <ion-icon name="home"></ion-icon>\n            Home Page\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row no-padding class="other-data">\n        <ion-col no-padding class="column">\n          <button\n            ion-button\n            icon-left\n            small\n            full\n            color="light"\n            menuClose\n            (click)="addUser()"\n          >\n            <ion-icon name="archive"></ion-icon>\n            Login as Administrator\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row no-padding class="other-data">\n        <ion-col no-padding class="column">\n          <button\n            ion-button\n            icon-left\n            small\n            full\n            color="light"\n            menuClose\n            (click)="logout()"\n          >\n            <ion-icon name="log-out"></ion-icon>\n            Logout\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_7_ng_socket_io__["Socket"],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModifyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operators__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environment__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error__ = __webpack_require__(266);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ModifyService = (function (_super) {
    __extends(ModifyService, _super);
    function ModifyService(_http) {
        var _this = _super.call(this) || this;
        _this._http = _http;
        _this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            authorization: "Bearer " +
                JSON.parse(localStorage.getItem("userData")).accessToken.toString()
        });
        _this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: _this.headers });
        return _this;
    }
    ModifyService.prototype.PostValue = function (IUser, token) {
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ authorization: "Bearer " + token.toString() });
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        return this._http
            .post(__WEBPACK_IMPORTED_MODULE_1__environment__["a" /* environment */].endpoint + "/values", IUser, this.options)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["map"])(function (response) { return response; }), Object(__WEBPACK_IMPORTED_MODULE_0_rxjs_operators__["catchError"])(this.handleError))
            .do(function (response) { });
    };
    return ModifyService;
}(__WEBPACK_IMPORTED_MODULE_4__error__["a" /* ErrorService */]));
ModifyService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], ModifyService);

//# sourceMappingURL=modify.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_login__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddUserPage = (function () {
    function AddUserPage(nav, navParams, alertCtrl, toastCtrl, loading, _service) {
        this.nav = nav;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loading = loading;
        this._service = _service;
        this.pageTitle = "AddUser";
        this.visit = {};
        this.user = {};
        this.addUserForm = {};
        this.homeId = JSON.parse(localStorage.getItem("userData")).homeId.toString();
        ;
        this.addUserForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            type: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            userName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            address: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].maxLength(10),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(5)
            ]))
        });
    }
    AddUserPage.prototype.ionViewDidLoad = function () { };
    // to go account page
    /*   goToAccount() {
      this.nav.push(SettingsPage);
    } */
    AddUserPage.prototype.configureUserType = function (type) {
        if (type == 1)
            this.permissionLevel = 32768;
        if (type == 2)
            this.permissionLevel = 1;
    };
    AddUserPage.prototype.loadingCreate = function () {
        this.loader = this.loading.create({
            content: "Loading..."
            //duration : 1500
        });
        return this.loader.present();
    };
    AddUserPage.prototype.CreateUser = function () {
        var _this = this;
        if (this.ValidateUser() === "allclear") {
            this.loadingCreate().then(function () {
                _this._service.AddUser(_this.user).subscribe(function (d) {
                    _this.confirmResponse(d);
                    _this.loader.dismiss();
                });
            });
        }
        else {
            this.useToast(this.ValidateUser(), 5000);
        }
    };
    AddUserPage.prototype.ValidateUser = function () {
        if (this.addUserForm.controls.type.invalid) {
            return "Please specify user type!";
        }
        else if (this.addUserForm.controls.userName.invalid) {
            return "Username is Invalid!";
        }
        else if (this.addUserForm.controls.email.invalid) {
            return "Email is Invalid!";
        }
        else if (this.addUserForm.controls.password.invalid) {
            return "Password is Invalid!";
        }
        else {
            this.user = {
                userName: this.addUserForm.controls.userName.value,
                email: this.addUserForm.controls.email.value,
                password: this.addUserForm.controls.password.value,
                address: JSON.parse(localStorage.getItem("userData")).address,
                homeId: JSON.parse(localStorage.getItem("userData")).homeId,
                permissionLevel: this.permissionLevel
            };
            return "allclear";
        }
    };
    AddUserPage.prototype.useToast = function (msg, time) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: time,
            position: "top",
            cssClass: "dark-trans",
            closeButtonText: "OK",
            showCloseButton: true
        });
        toast.present();
    };
    AddUserPage.prototype.confirmResponse = function (data) {
        this.useToast(data.success.toString(), 10000);
    };
    return AddUserPage;
}());
AddUserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "page-addUser",template:/*ion-inline-start:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/addUser/addUser.html"*/'<ion-header>\n  <ion-navbar color="secondary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <p style="text-align : center">{{ homeId }}</p>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding class="animated fadeIn form-page">\n  <div text-center class="animated fadeInDown">\n    <h5 ion-text class="text-primary"><strong>Add User</strong></h5>\n  </div>\n  <div class="list-form" [formGroup]="addUserForm">\n    <ion-list radio-group formControlName="type">\n      <ion-item>\n        <ion-label>User Type*</ion-label>\n      </ion-item>\n      <ion-item>\n        <ion-label>Resident</ion-label>\n        <ion-radio value="1" (click)="configureUserType(1)" checked></ion-radio>\n      </ion-item>\n      <ion-item>\n        <ion-label>Guest</ion-label>\n        <ion-radio value="2" (click)="configureUserType(2)"></ion-radio>\n      </ion-item>\n\n    </ion-list>\n\n    <ion-item>\n      <ion-label floating>\n        <ion-icon name="person" item-start class="text-primary"></ion-icon>\n        Username*\n      </ion-label>\n      <ion-input type="text" formControlName="userName"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>\n        <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n        Email*\n      </ion-label>\n      <ion-input type="email" formControlName="email" class="form-control"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>\n        <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n        Password (Min 5 Character)\n      </ion-label>\n      <ion-input type="password" formControlName="password"></ion-input>\n    </ion-item>\n\n    <div>\n      <button ion-button icon-start block color="dark" tappable (click)="CreateUser()">\n        <ion-icon name="log-in"></ion-icon>\n        Create User Account\n      </button>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/hamdi/Documents/kaanich/hamdi (copy)/src/pages/addUser/addUser.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__services_login__["a" /* LoginService */]])
], AddUserPage);

//# sourceMappingURL=addUser.js.map

/***/ })

},[383]);
//# sourceMappingURL=main.js.map