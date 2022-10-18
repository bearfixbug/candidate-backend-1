const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const mysql = require('mysql');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
// const { forEach } = require('lodash');

app.use(express.static(__dirname + "/"));

app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
env.config();

const server = app.listen(3003, () => {
    console.log('server is running on port 3003')
})

const db = mysql.createConnection({
  host: "localhost",
  user: "YOUR_DATABASE_USER",
  password: "YOUR_DATABASE_PASSWORD",
  database: "candidate"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});


function encToken(keys) {
  var key = process.env.KEY;
  var iv = process.env.IV;
  key = CryptoJS.enc.Hex.parse(key);
  iv = CryptoJS.enc.Hex.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(keys, key, { iv: iv });
  console.log("encrypted", JSON.stringify(encrypted.toString()));
  return encrypted.toString();
}
function decToken(massage) {
  var key = process.env.KEY;
  var iv = process.env.IV;
  key = CryptoJS.enc.Hex.parse(key);
  iv = CryptoJS.enc.Hex.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(massage, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}


function genval(lng) {
    var sql = '';
    for (let i = 0; i < lng; i++) {
      if(i == (lng-1)) sql += '?'
      else sql += '?,'
    }
    return sql
}


function getDateNow() {
    var d = new Date();
    var dy = d.getFullYear();
    var dm = (d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
    var dd = d.getDate() < 10 ? '0'+d.getDate() : d.getDate();

    var th = d.getHours() < 10 ? '0'+d.getHours() : d.getHours();
    var tm = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes();
    var ts = d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds();
    return `${dy}-${dm}-${dd} ${th}:${tm}:${ts}`;
}
    
MD5 = function (e) {
      function h(a, b) {
        var c, d, e, f, g;
        e = a & 2147483648;
        f = b & 2147483648;
        c = a & 1073741824;
        d = b & 1073741824;
        g = (a & 1073741823) + (b & 1073741823);
        return c & d
          ? g ^ 2147483648 ^ e ^ f
          : c | d
            ? g & 1073741824
              ? g ^ 3221225472 ^ e ^ f
              : g ^ 1073741824 ^ e ^ f
            : g ^ e ^ f;
      }
  
      function k(a, b, c, d, e, f, g) {
        a = h(a, h(h((b & c) | (~b & d), e), g));
        return h((a << f) | (a >>> (32 - f)), b);
      }
  
      function l(a, b, c, d, e, f, g) {
        a = h(a, h(h((b & d) | (c & ~d), e), g));
        return h((a << f) | (a >>> (32 - f)), b);
      }
  
      function m(a, b, d, c, e, f, g) {
        a = h(a, h(h(b ^ d ^ c, e), g));
        return h((a << f) | (a >>> (32 - f)), b);
      }
  
      function n(a, b, d, c, e, f, g) {
        a = h(a, h(h(d ^ (b | ~c), e), g));
        return h((a << f) | (a >>> (32 - f)), b);
      }
  
      function p(a) {
        var b = "",
          d = "",
          c;
        for (c = 0; 3 >= c; c++)
          (d = (a >>> (8 * c)) & 255),
            (d = "0" + d.toString(16)),
            (b += d.substr(d.length - 2, 2));
        return b;
      }
      var f = [],
        q,
        r,
        s,
        t,
        a,
        b,
        c,
        d;
      e = (function (a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", d = 0; d < a.length; d++) {
          var c = a.charCodeAt(d);
          128 > c
            ? (b += String.fromCharCode(c))
            : (127 < c && 2048 > c
              ? (b += String.fromCharCode((c >> 6) | 192))
              : ((b += String.fromCharCode((c >> 12) | 224)),
                (b += String.fromCharCode(((c >> 6) & 63) | 128))),
              (b += String.fromCharCode((c & 63) | 128)));
        }
        return b;
      })(e);
      f = (function (b) {
        var a,
          c = b.length;
        a = c + 8;
        for (
          var d = 16 * ((a - (a % 64)) / 64 + 1),
          e = Array(d - 1),
          f = 0,
          g = 0;
          g < c;
  
        )
          (a = (g - (g % 4)) / 4),
            (f = (g % 4) * 8),
            (e[a] |= b.charCodeAt(g) << f),
            g++;
        a = (g - (g % 4)) / 4;
        e[a] |= 128 << ((g % 4) * 8);
        e[d - 2] = c << 3;
        e[d - 1] = c >>> 29;
        return e;
      })(e);
      a = 1732584193;
      b = 4023233417;
      c = 2562383102;
      d = 271733878;
      for (e = 0; e < f.length; e += 16)
        (q = a),
          (r = b),
          (s = c),
          (t = d),
          (a = k(a, b, c, d, f[e + 0], 7, 3614090360)),
          (d = k(d, a, b, c, f[e + 1], 12, 3905402710)),
          (c = k(c, d, a, b, f[e + 2], 17, 606105819)),
          (b = k(b, c, d, a, f[e + 3], 22, 3250441966)),
          (a = k(a, b, c, d, f[e + 4], 7, 4118548399)),
          (d = k(d, a, b, c, f[e + 5], 12, 1200080426)),
          (c = k(c, d, a, b, f[e + 6], 17, 2821735955)),
          (b = k(b, c, d, a, f[e + 7], 22, 4249261313)),
          (a = k(a, b, c, d, f[e + 8], 7, 1770035416)),
          (d = k(d, a, b, c, f[e + 9], 12, 2336552879)),
          (c = k(c, d, a, b, f[e + 10], 17, 4294925233)),
          (b = k(b, c, d, a, f[e + 11], 22, 2304563134)),
          (a = k(a, b, c, d, f[e + 12], 7, 1804603682)),
          (d = k(d, a, b, c, f[e + 13], 12, 4254626195)),
          (c = k(c, d, a, b, f[e + 14], 17, 2792965006)),
          (b = k(b, c, d, a, f[e + 15], 22, 1236535329)),
          (a = l(a, b, c, d, f[e + 1], 5, 4129170786)),
          (d = l(d, a, b, c, f[e + 6], 9, 3225465664)),
          (c = l(c, d, a, b, f[e + 11], 14, 643717713)),
          (b = l(b, c, d, a, f[e + 0], 20, 3921069994)),
          (a = l(a, b, c, d, f[e + 5], 5, 3593408605)),
          (d = l(d, a, b, c, f[e + 10], 9, 38016083)),
          (c = l(c, d, a, b, f[e + 15], 14, 3634488961)),
          (b = l(b, c, d, a, f[e + 4], 20, 3889429448)),
          (a = l(a, b, c, d, f[e + 9], 5, 568446438)),
          (d = l(d, a, b, c, f[e + 14], 9, 3275163606)),
          (c = l(c, d, a, b, f[e + 3], 14, 4107603335)),
          (b = l(b, c, d, a, f[e + 8], 20, 1163531501)),
          (a = l(a, b, c, d, f[e + 13], 5, 2850285829)),
          (d = l(d, a, b, c, f[e + 2], 9, 4243563512)),
          (c = l(c, d, a, b, f[e + 7], 14, 1735328473)),
          (b = l(b, c, d, a, f[e + 12], 20, 2368359562)),
          (a = m(a, b, c, d, f[e + 5], 4, 4294588738)),
          (d = m(d, a, b, c, f[e + 8], 11, 2272392833)),
          (c = m(c, d, a, b, f[e + 11], 16, 1839030562)),
          (b = m(b, c, d, a, f[e + 14], 23, 4259657740)),
          (a = m(a, b, c, d, f[e + 1], 4, 2763975236)),
          (d = m(d, a, b, c, f[e + 4], 11, 1272893353)),
          (c = m(c, d, a, b, f[e + 7], 16, 4139469664)),
          (b = m(b, c, d, a, f[e + 10], 23, 3200236656)),
          (a = m(a, b, c, d, f[e + 13], 4, 681279174)),
          (d = m(d, a, b, c, f[e + 0], 11, 3936430074)),
          (c = m(c, d, a, b, f[e + 3], 16, 3572445317)),
          (b = m(b, c, d, a, f[e + 6], 23, 76029189)),
          (a = m(a, b, c, d, f[e + 9], 4, 3654602809)),
          (d = m(d, a, b, c, f[e + 12], 11, 3873151461)),
          (c = m(c, d, a, b, f[e + 15], 16, 530742520)),
          (b = m(b, c, d, a, f[e + 2], 23, 3299628645)),
          (a = n(a, b, c, d, f[e + 0], 6, 4096336452)),
          (d = n(d, a, b, c, f[e + 7], 10, 1126891415)),
          (c = n(c, d, a, b, f[e + 14], 15, 2878612391)),
          (b = n(b, c, d, a, f[e + 5], 21, 4237533241)),
          (a = n(a, b, c, d, f[e + 12], 6, 1700485571)),
          (d = n(d, a, b, c, f[e + 3], 10, 2399980690)),
          (c = n(c, d, a, b, f[e + 10], 15, 4293915773)),
          (b = n(b, c, d, a, f[e + 1], 21, 2240044497)),
          (a = n(a, b, c, d, f[e + 8], 6, 1873313359)),
          (d = n(d, a, b, c, f[e + 15], 10, 4264355552)),
          (c = n(c, d, a, b, f[e + 6], 15, 2734768916)),
          (b = n(b, c, d, a, f[e + 13], 21, 1309151649)),
          (a = n(a, b, c, d, f[e + 4], 6, 4149444226)),
          (d = n(d, a, b, c, f[e + 11], 10, 3174756917)),
          (c = n(c, d, a, b, f[e + 2], 15, 718787259)),
          (b = n(b, c, d, a, f[e + 9], 21, 3951481745)),
          (a = h(a, q)),
          (b = h(b, r)),
          (c = h(c, s)),
          (d = h(d, t));
  
      return (p(a) + p(b) + p(c) + p(d)).toLowerCase();
};
  
app.post('/des', (req, res) => {
  var token = _.get(req, ["body","token"]);
  var Json = JSON.parse(decToken(token))
  console.log('Json',Json)

})

app.post('/v1/auth/register', (req, res) => {
  var fullName = _.get(req, ["body","fullName"]);
  var username = _.get(req, ["body","username"]);
  var password = _.get(req, ["body","password"]);

  try {
    if(fullName && username && password) {
      var register_time = new Date().getTime()
      var cusid = crypto.randomUUID()
      db.query(`insert into tb_user (cusid,fullname,username,password,doingtime,doingtimemil) values (${genval(6)}) `,[
        cusid, 
        fullName,
        username,
        MD5(password + '@candidateOfBearbug'),
        getDateNow(),
        register_time
      ], (err2,res2) => {
        if(!err2) {
          const token = encToken(
            `{"fullname":"${fullName}","signin_time":"${register_time}","cusid":"${cusid}","role":"customer"}`
          );

          return res.status(200).json({
            RespCode: 200,
            RespMessage: 'success',
            Result: {
              Token: token
            }
          })
        }
        else {
          console.log(err2)
          return res.status(400).json({
            RespCode: 400,
            RespMessage: 'bad : system error' ,
            Log: 2
          })
        }
      })
    }
    else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: 'bad : invalid request' ,
        Log: 1
      })
    }
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      RespCode: 500,
      RespMessage: 'bad : system error' ,
      Log: 0
    })
  }
})

app.post('/v1/auth/signin', (req, res) => {
  var username = _.get(req, ["body","username"]);
  var password = _.get(req, ["body","password"]);

  try {
    if(username && password) {
      db.query(`select * from tb_user where username = ?`,[
        username
      ], (err2,res2) => {
        if(res2 && res2[0]) {
          password = MD5(password + '@candidateOfBearbug')
          if(res2[0].password == password) {
            var signin_time = new Date().getTime()
            const token = encToken(
              `{"fullname":"${res2[0].fullname}","signin_time":"${signin_time}","cusid":"${res2[0].cusid}","role":"customer"}`
            );
            return res.status(200).json({
              RespCode: 200,
              RespMessage: 'success',
              Result: {
                Token: token
              }
            })
          }
          else {
            return res.status(400).json({
              RespCode: 400,
              RespMessage: 'bad : invalid user' ,
              Log: 3
            })
          }
        }
        else {
          console.log(err2)
          return res.status(400).json({
            RespCode: 400,
            RespMessage: 'bad : invalid user' ,
            Log: 2
          })
        }
      })
    }
    else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: 'bad : invalid request' ,
        Log: 1
      })
    }
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      RespCode: 500,
      RespMessage: 'bad : system error' ,
      Log: 0
    })
  }
})

app.get('/v1/services', (req, res) => {

  try {
    
    db.query(`select _id,name,price,picture,description from tb_services order by id desc`,(err2,res2) => {
      if(res2 && res2[0]) {
        return res.status(200).json({
          RespCode: 200,
          RespMessage: 'success',
          Result: {
            Services: res2
          }
        })
      }
      else {
        console.log(err2)
        return res.status(400).json({
          RespCode: 400,
          RespMessage: 'bad : not found data' ,
          Log: 2
        })
      }
    })
    
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      RespCode: 500,
      RespMessage: 'bad : system error' ,
      Log: 0
    })
  }
})

app.get('/v1/services/:serviceID', (req, res) => {
  var service_id = req.params.serviceID;
  try {
    
    if(service_id) {
      db.query(`select _id,name,price,picture,description from tb_services where _id = ?`, [service_id],(err2,res2) => {
        if(res2 && res2[0]) {
          return res.status(200).json({
            RespCode: 200,
            RespMessage: 'success',
            Result: {
              Services: res2
            }
          })
        }
        else {
          console.log(err2)
          return res.status(400).json({
            RespCode: 400,
            RespMessage: 'bad : not found data' ,
            Log: 2
          })
        }
      })
    }
    else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: 'bad : invalid request' ,
        Log: 1
      })
    }
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      RespCode: 500,
      RespMessage: 'bad : system error' ,
      Log: 0
    })
  }
})

app.post('/v1/services/:serviceID/booking', (req, res) => {
  var token = _.get(req, ["body","token"]);
  var service_id = req.params.serviceID;

  try {
    if(token && service_id) {
      console.log('token',token)

      var Json = JSON.parse(decToken(token))
      var Jsoncusid = Json.cusid;
      var Jsonfullname = Json.fullname;
      var Jsonsignin_time = Json.signin_time;
      var Jsonrole = Json.role;
      console.log(Jsoncusid, Jsonfullname)

      if(Jsonrole == 'customer') {
        db.query(`select * from tb_user where cusid = ? and fullname = ?`,[
          Jsoncusid, Jsonfullname
        ], (err2, res2) => {
          if(res2 && res2[0]) {
            var bookno = crypto.randomUUID();
            var timetobook = getDateNow();
            var miltobook = new Date(timetobook).getTime()
            db.query(`insert into tb_booking (bookno,cusid,servicesid,createdAt,mil) values (${genval(5)})`,[
              bookno,
              Jsoncusid,
              parseInt(service_id),
              timetobook,
              miltobook
            ], (err3, res3) => {
              if(!err3) {
                return res.status(200).json({
                  RespCode: 200,
                  RespMessage: 'success',
                  Result: {
                    BookingNo: bookno,
                    createdAt: timetobook
                  }
                })
              }
              else {
                return res.status(400).json({
                  RespCode: 400,
                  RespMessage: 'bad : booking fail. please try later' ,
                  Log: 4
                })
              }
            })
          }
          else {
            return res.status(400).json({
              RespCode: 400,
              RespMessage: 'bad : stop to hack !' ,
              Log: 3
            })
          }
        })
      }
      else {
        return res.status(400).json({
          RespCode: 400,
          RespMessage: 'bad : invalid request' ,
          Log: 2
        })
      }
    }
    else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: 'bad : invalid request' ,
        Log: 1
      })
    }
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      RespCode: 500,
      RespMessage: 'bad : system error' ,
      Log: 0
    })
  }
})

app.post('/v1/orders', (req, res) => {
  var token = _.get(req, ["body","token"]);

  try {
    if(token) {
      console.log('token',token)

      var Json = JSON.parse(decToken(token))
      var Jsoncusid = Json.cusid;
      var Jsonfullname = Json.fullname;
      var Jsonsignin_time = Json.signin_time;
      var Jsonrole = Json.role;
      console.log(Jsoncusid, Jsonfullname)

      if(Jsonrole == 'customer') {
        db.query(`select * from tb_user where cusid = ? and fullname = ?`,[
          Jsoncusid, Jsonfullname
        ], (err2, res2) => {
          if(res2 && res2[0]) {
            
            db.query(`
            select  bk.bookno as _id,
                    bk.cusid as customer,
                    bk.createdAt as createdAt,
                    sv._id as serviceid,
                    sv.name as servicename,
                    sv.price as serviceprice,
                    sv.picture as servicepicture,
                    sv.description as servicedescription,
                    us.cusid as cusid,
                    us.fullname as cusname,
                    us.username as cususername
            from tb_booking bk
            inner join tb_services sv on bk.servicesid = sv.id
            inner join tb_user us on bk.cusid = us.cusid
            where bk.cusid = ?`,[
              Jsoncusid
            ], (err3, res3) => {
              if(res3 && res3[0]) {
                res3.forEach((data) => {
                  data.service = {
                    _id : data.serviceid,
                    name : data.servicename,
                    price : data.serviceprice,
                    picture : data.servicepicture,
                    description : data.servicedescription
                  };
                  data.customer = {
                    _id : data.cusid,
                    fullName : data.cusname,
                    username : data.cususername
                  };
                  
                  delete data.serviceid;
                  delete data.servicename;
                  delete data.serviceprice;
                  delete data.servicepicture;
                  delete data.servicedescription;

                  delete data.cusid;
                  delete data.cusname;
                  delete data.cususername;
                })

                return res.status(200).json({
                  RespCode: 200,
                  RespMessage: 'success' ,
                  Result: res3
                }) 
              }
              else {
                return res.status(400).json({
                  RespCode: 400,
                  RespMessage: 'bad : ' ,
                  Log: 4
                })
              }
            })
          }
          else {
            return res.status(400).json({
              RespCode: 400,
              RespMessage: 'bad : stop to hack !' ,
              Log: 3
            })
          }
        })
      }
      else {
        return res.status(400).json({
          RespCode: 400,
          RespMessage: 'bad : invalid request' ,
          Log: 2
        })
      }
    }
    else {
      return res.status(400).json({
        RespCode: 400,
        RespMessage: 'bad : invalid request' ,
        Log: 1
      })
    }
  }
  catch(error) {
    console.log(error)
    return res.status(500).json({
      RespCode: 500,
      RespMessage: 'bad : system error' ,
      Log: 0
    })
  }
})