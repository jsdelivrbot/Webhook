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

  let VERIFY_TOKEN = "EAAIR4BeZBZAxoBAJtfH9uihMEd9ghxqFa0bUBt0KagLkwun480jvbiuZAA8H8Ir4y0tjhGQWkX6nvkkvZCvG0ydaeKIPZCWe2m4R21CUvxi4ihZCmcAC5CagB5Sr4DT2bnbVu9dzBwhRB1LUCWH9sT67LD6Q9ezFch2ZCUgZBgeWrNlf1StQNQjb"
    
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