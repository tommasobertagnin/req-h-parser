var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
  const ipaddress = req.get('x-forwarded-for') || req.connection.remoteAddress ||
                      req.socket.remoteAddress || req.connection.socket.remoteAddress;

  const language = req.get('Accept-Language').match(/^([^,]+)/) ?
                     req.get('Accept-Language').match(/^([^,]+)/)[1] : null;

  const software = req.get('User-Agent').match(/\((.+?)\)/) ?
                     req.get('User-Agent').match(/\((.+?)\)/)[1] : null;

  console.log('new request received from ip:', ipaddress);
  res.json({ ipaddress, language, software });
});

app.listen(app.get('port'), () => {
  console.log('Server listening on port', app.get('port'));
});
