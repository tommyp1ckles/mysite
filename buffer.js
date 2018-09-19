https = require('http');
fd = require('fs');

//const resume_url = 'https://s3-us-west-2.amazonaws.com/toms-web/resume_master.pdf';
const resume_url = 'http://localhost:8080/static/stuff.pdf'
let data = '';
https.get(resume_url, (resp) => {
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    console.log(">",data);
  });
});