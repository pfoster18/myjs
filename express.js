const fetch = require('node-fetch');
var DomParser = require('dom-parser');
var parser = new DomParser();
fetch('https://genius.com/songs/7069323/embed.js')
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
   }
   );