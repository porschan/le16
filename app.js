//app.js

let apiURL = require('/common/data/apiURL.js');

App({
  onLaunch: function () {
    //获取本地内存中是否存在jwt
    let jwt = wx.getStorageSync("jwt");
    let jwt_boo = jwt.length == 0 ? true : false;
    let failTimestamp = wx.getStorageSync("jwt_failTimestamp");

    let failTime_boo = failTimestamp != null && failTimestamp > 0 && failTimestamp < this.gainNowTimestamp() ? true : false;
    if (jwt_boo || failTime_boo) {
      this.wxLogin();
    }
  },

  //微信登录
  wxLogin() {
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          // console.log('获取用户登录凭证：' + code);

          // --------- 发送凭证 ------------------
          // wx.request({
          //   url: apiData.api_data.postLogin,
          //   data: {},
          //   method: "POST",
          //   header: {
          //     'content-type': 'application/x-www-form-urlencoded',
          //     'wechat-code': code
          //   },
          //   success: (data) => {
          //     console.info(data);
          //     // if (data.data.isSuccess) {
          //     //   //存储jwt
          //     //   wx.setStorage({
          //     //     key: 'jwt',
          //     //     data: data.data.result.jwt,
          //     //   });
          //     //   wx.setStorage({
          //     //     key: 'jwt_failTimestamp',
          //     //     data: data.data.result.jwt_failTimestamp,
          //     //   });
          //     // }
          //   }, fail(data) {
          //     // console.info("fail");
          //   }
          // })
          // ------------------------------------

        } else {
          // console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },

  //获取当前时间
  gainNowTimestamp() {
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp
  }

})