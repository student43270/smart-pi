var rpio = require('rpio');
const express = require('express')
var path    = require("path");

const app = express()


const hostname = '192.168.0.102';
const port = 80;
var gpio7 = 1;

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/on', (req, res) => {
  gpio7=1
  switchRele(7, gpio7)
  res.send('gpio7 - 1')
})
app.get('/off', (req, res) => {
  gpio7=0
  switchRele(7, gpio7)
  res.send('gpio7 - 0')
})
app.get('/s', (req, res) => {
  gpio7 = gpio7==0? 1 : 0
  switchRele(7, gpio7)
  res.send('s')
})

app.listen(80, () => console.log('Example app listening on port 80!'))

function switchRele(port = 7, status = 1){
  if(gpio7!=status)
    return

  rpio.open(port, rpio.OUTPUT, rpio.LOW);
  rpio.write(port, status);
}
//
// for (var i = 0; i < 50; i++) {
//         console.log(gpio7);
//
//         switchRele(7, gpio7)
//         rpio.msleep(500);
// }
