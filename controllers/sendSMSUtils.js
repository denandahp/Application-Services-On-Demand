const { response } = require('express');

const accountSid = 'AC533f974b7e2484c8854e9e7a25d7f675'; 
const authToken = '6bc997bd3f56603f4d599f4d0fca55d2'; 
const client = require('twilio')(accountSid, authToken); 

exports.sendSMSMessage = (userData) => {
        return client.messages 
            .create({ 
                body: 'JANGAN BERIKAN kode ini kepada siapa pun, Termasuk TIM JAT. Untuk MASUK KE AKUN, masukkan kode RAHASIA  ' + userData.otp, 
                from: '+15017122661',       
                to: userData.phone
            }) 
            .then(result => console.log(result.status))
            .done();
}

// exports.sendWAmsg = (userData) => {

//     return client.messages 
//       .create({ 
//          body: 'JANGAN BERIKAN kode ini kepada siapa pun, Termasuk TIM JAT. Untuk MASUK KE AKUN, masukkan kode RAHASIA  ' + userData.otp, 
//          from: 'whatsapp:+14155238886',       
//          to: 'whatsapp:+62' + userData.phone 
//        }) 
//       .then(response => console.log(response.status))
//       .done();

// } 
