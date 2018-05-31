'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }

});

app.get('/webhook', (req, res) => {

  let VERIFY_TOKEN = "EAAIR4BeZBZAxoBAHPNxC6qeZC6dQXmWZAqZBqAZCm5NqZA7xVd75SCZCGpQ6cuCBi1Nt0ZBb7POUZAYUzqCe5Bdlao7PdgHroYoug62tHZCuaDwc0ZC96Gg8XnDnkvjsOpua4PeMHFNk8qrYfHZC3LQR1VIWt2g9NjnZBJu67AmhuXZBK8k9mZAizTLaObVj"
    
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  if (mode && token) {

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      res.sendStatus(403);      
    }
  }
});