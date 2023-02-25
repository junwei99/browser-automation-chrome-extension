(async () => {

  function dynamicallyLoadScript(url) { 
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        resolve()
      }
      script.onerror = () => {
        reject()
      }
      document.head.appendChild(script);
    })
  }

  if (!console.image) {
    console.image = function (url, size = 100) {
      var image = new Image();
      image.onload = function () {
        var style = [
          'font-size: 1px;',
          'padding: ' + this.height / 100 * size + 'px ' + this.width / 100 * size + 'px;',
          'background: url(' + url + ') no-repeat;',
          'background-size: contain;'
        ].join(' ');
        console.log('%c ', style);
      };
      image.src = url;
    };
  }

  if (typeof axios === "undefined") {
    // load script might be slow need to click again, add loaded callback later
    await dynamicallyLoadScript('https://bookmarklet.com/lib/axios.min.js')
  }

  const supergw = 'alipay.plus.test.dl.alipaydev.com'

  axios({
    url: `http://${supergw}/isupergw/alipay/intl/acquiring/offline/precreate.htm`,
    method: 'POST',
    headers: {
      "client-id": "385XSH66SG02E900",
      "signature": "algorithm=RSA256, keyVersion=2, signature=testing_signature",
      "request-time": "2019-01-01T12:08:56+08:00",
      "route_group": "",
      "original_host": "open-sea.alipay.com"
    },
    data: {
      "request": {
        "head": {
          "clientId": "385XSH66SG02E900",
          "function": "alipay.intl.acquiring.offline.preCreate",
          "reserve": "fromBizCC",
          "reqTime": "2019-11-26T16:57:12+08:00",
          "version": "2.0.4",
          "signType": "RSA2",
          "reqMsgId": "47d1ec04-262f-462b-92d30-1ec575e481b8"
        },
        "body": {
          "settleContractId": "TEST",
          "merchantRedirectUrl": "http://globaltool.inc.alipay.net/intltool/tools",
          "productCode": "OFFLINE_PAY",
          "merchantId": "2188120000415527",
          "riskInfo": {
            "userInfo": {
              "lastLoginTime": "2001-07-04T12:08:56+05:30",
              "signupTime": "2001-07-04T12:08:56+05:30",
              "merchantUserId": "user0001"
            },
            "orderInfos": [{
              "productSubCategory": "smart phone",
              "itemPrice": {
                "currency": "JPY",
                "value": 100
              },
              "productName": "iPhone 7",
              "productCategory": "Phone"
            }],
            "riskExtendInfo": "{}",
            "deviceInfo": {
              "systemLanguage": "EN",
              "idfa": "5D08BADB6-B7D1-46DE-BDAB-B66468A1EFCC",
              "wirelessNetwork": "china unicom",
              "isJailbreaked": true,
              "timeZone": "UTC+11",
              "sessionId": "26daf780047938bf8d5b7ea8906003e9",
              "osName": "ios",
              "deviceName": "Mike's iPhone",
              "flightMode": "enabled",
              "serialNo": "f0c0ec9a",
              "terminalType": "APP",
              "latitudeLongitude": "39.9151190000,116.4039630000",
              "fingerPrintEnabled": "enabled",
              "macAddress": "8c:be:be:71:1f:34",
              "osVersion": "9.1.1",
              "deviceBootTime": "2001-07-04T12:08:56+05:30",
              "clientIp": "121.0.29.220",
              "wirelessCarrier": "china unicom",
              "imei": "863360020885012",
              "deviceModel": "iPhone 7 Plus",
              "lastUnlockTime": "2001-07-04T12:08:56+05:30",
              "screenResolution": "1024*768",
              "deviceBrand": "APPLE"
            }
          },
          "sceneType": "THIRDPARTYQRCODE",
          "merchantTransId": "ac_order_code_" + parseInt(new Date().getTime() / 1000) + "_" + Math.round(Math.random() * 10000),
          "notifyUrl": "http://notify.com",
          "userAgent": "Mozilla/5.0 (Linux; U; Android 10; zh-CN; HD1910 Build/QKQ1.190716.003) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 UWS/3.21.0.69 Mobile Safari/537.36 UCBS/3.21.0.69_191205100431 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:4G,ws:411|0|3.5,ac:sp) AliApp(AP/10.1.80.8050) AlipayClientHK/10.1.80.8050 Language/zh-Hans useStatusBar/true isConcaveScreen/false Region/CN",
          "extendInfo": "{\"chinaExtraTransInfo\":{\"businessType\":\"5\"}}",
          "order": {
            "seller": {
              "sellerId": "2188120000415527",
              "sellerName": "0",
              "storeName": "Test Merchant",
              "sellerMCC": "5611",
              "storeId": "mxStore02"
            },
            "orderAmount": {
              "currency": "JPY",
              "value": 100
            },
            "orderDetail": "New White Lace Sleeveless Cute Casual Summer Dresses Vestidos roupas femininas WQW10",
            "orderTitle": "Women Summer Dress"
          }
        }
      },
      "signature": "testing_signature"
    }
  }).then(res => {
    const qrURL = res.data.response.body.orderQrCode
    console.log('QR:' + qrURL);
    console.image(`http://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrURL}`, 50)
    alert(qrURL)
  })

})()