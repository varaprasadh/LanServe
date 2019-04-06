var os = require('os');
var ifaces = os.networkInterfaces();
var address=null;

if (ifaces['Wi-Fi']){
var wifiobj = ifaces['Wi-Fi'].filter(obj => {
    return obj.family === 'IPv4';
})

address = wifiobj[0].address
}
// console.log(address);

module.exports = address;