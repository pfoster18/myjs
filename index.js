const fetch = require('node-fetch');
const DomParser = require('dom-parser');
const parser = new DomParser();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
    const url = request.query.url;
    fetch(url)
   .then(res => res.text())
   .then(body => {
      var html = 1;
      function skipp(data) {
         return 1;
      }
      function guess(data) {
         html = data;
      }
      var t = 0;
      body = body.replace(/document.write/g, function (match) {
         t++;  
         return (t === 2) ? "guess" : match;
      });
      body = body.replace(/document.write/g, 'skipp');
      body = body.replace(/document.getElementById/g, 'skipp');
      eval(body);
      var dom = parser.parseFromString(String(html));
      var res = dom.getElementsByClassName('rg_embed_body')[0].innerHTML.trim();
      console.log(res);
      return res;
   }
   ).then(res=> {
    console.log(res)
    response.send(res)
   }).catch(err=>{
       response.send("error")
   })
   ;
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});