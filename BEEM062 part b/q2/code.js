//regular private / public key generation
var privKey = bsv.PrivateKey.fromRandom();
var pubKey = bsv.PublicKey.fromPrivateKey(privKey);
var address = bsv.Address.fromPublicKey(pubKey);
var addressCode = 'bitcoinsv:' + address;
        
var y = document.querySelector("#pubKey");
y.innerHTML = pubKey.toString();
        
var z = document.querySelector("#addressText");
z.innerHTML = address.toString();

//qr code generator
new QRCode(document.getElementById("qrcode"), addressCode);

// balance code
var config = {
    method: 'get',
    url: "https://api.whatsonchain.com/v1/bsv/main/address/" +
    address + "/balance",
};

axios(config).then((response) => {
      let data = JSON.stringify(response.data);
      const dataList = data.split(',');
      let c = document.getElementById("balance_confirmed");
      const c_balance =  dataList[0].split(':');
      c.innerHTML = c_balance[1];
      let u = document.getElementById("balance_unconfirmed");
      const u_balance =  dataList[1].split(':');
      u.innerHTML = u_balance[1].slice(0, -1);
    })


// Hierarchical Deterministic Key system, with mnemonic

var bsvMnemonic = window.bsvMnemonic;
var words = bsvMnemonic.fromRandom();
    
var hdPrivateKey = bsv.HDPrivateKey.fromSeed(words.toSeed())
var privateKey = hdPrivateKey.deriveChild("m/44'/0'/0'").privateKey;
var hdAddress = bsv.Address.fromPrivateKey(privateKey).toString();

var p = document.querySelector('#Mnemonic');
p.innerHTML = words.toString();
    
var p = document.querySelector("#Text2");
p.innerHTML = address.toString();
    
new QRCode(document.getElementById("hdqrcode"), "bitcoinsv:" + address.toString());
    