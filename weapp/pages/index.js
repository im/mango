"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _eventHub = _interopRequireDefault(require('./../common/eventHub.js'));

var _x = require('./../vendor.js')(4);

var _store = _interopRequireDefault(require('./../store/index.js'));

var _test = _interopRequireDefault(require('./../mixins/test.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  hooks: {},
  mixins: [],
  data: {
    systemInfo: {},
    windowHeight: 100,
    foods: ['馒头', '肠粉', '面包', '麻辣烫', '抄手', '石锅饭', '三楼'],
    foodIndex: 0,
    run: false,
    positiveNum: 0
  },
  computed: {},
  methods: _objectSpread({}, (0, _x.mapActions)(['setUserInfo']), {
    getUserInfo: function getUserInfo() {
      var self = this;
      wx.getUserInfo({
        success: function success(res) {
          self.setUserInfo(res.userInfo);
        }
      });
    },
    getSystemInfo: function getSystemInfo() {
      var self = this;
      wx.getSystemInfo({
        success: function success(res) {
          self.systemInfo = res;
        }
      });
    },
    random: function random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    go: function go() {
      if (this.run) return;
      var self = this;
      var foodsLen = this.foods.length;
      var maxTimes = 3000;
      var d = 100;
      var secondary = 0;
      this.run = true;
      var timer = setInterval(function () {
        if (secondary > maxTimes) {
          clearInterval(timer);
          self.run = false;
          self.positiveNum = 0;
        }

        secondary = secondary + d;
        self.foodIndex = self.random(0, foodsLen);
      }, d);
    },
    shake: function shake() {
      var _this = this;

      var self = this;
      var numX = 1;
      var numY = 1;
      var numZ = 0;
      wx.onAccelerometerChange(function (res) {
        if (_this.run) return;

        var _ref = res || {},
            x = _ref.x,
            y = _ref.y,
            z = _ref.z;

        if (x > numX && y > numY) {
          //个人看法，一次正数算摇一次，还有更复杂的
          self.positiveNum++;
          setTimeout(function () {
            self.positiveNum = 0;
          }, 3000); //计时两秒内没有摇到指定次数，重新计算
        }

        if (z > numZ && y > numY) {
          //可以上下摇，上面的是左右摇
          self.positiveNum++;
          setTimeout(function () {
            self.positiveNum = 0;
          }, 3000); //计时两秒内没有摇到指定次数，重新计算
        }

        if (self.positiveNum > 1) {
          _this.go();
        }
      });
    }
  }),
  created: function created() {
    this.getUserInfo();
    this.getSystemInfo();
    this.shake();
  }
}, {info: {"components":{"topBar":{"path":"./../components/topBar/index"}},"on":{}}, handlers: {'7-47': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.go($event);
      })();
    
  }}}, models: {}, refs: undefined });