# email-util

Send an email via AWS SES

```js
emailUtil.send({
  from: 'you@example.com',
  to: 'to@example.com',
  subject: 'Test email subject',
  body: 'Test email text',
  html: '<b> Test email text </b>'
})
```

Assumes AWS environment vars are set, and SES is configured on us-east-1 for the set key