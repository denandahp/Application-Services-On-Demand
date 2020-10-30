const { Client } = require('pg');

const schema = '"public"';
const table = '"users"'
const dbTable = schema + '.' + table;

let user = ['denanda', 'hendra', 'aden21', '1121997', 'denanda@gmail.com', 'sleman', '082335506673', '', ' ', ' ','Medan','Driver',12313,'1','2020-2-12','2020-2-12'];
let user = [data.namadepan, data.namabelakang, data.username, data.password, data.email, data.origin, data.phone, data.foto_stnk, data.foto_sim, data.photo, data.kota, data.role, randomOTP, 1, data.user_date, data.user_lastdate];


(async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jatproject',
    password: 'postgres',
    port: 5432
  });
  
  try{
    await client.connect();
    console.log("Connected Successfully!");
    let res =  await pool.query('INSERT INTO ' + dbTable + ' (namadepan, namabelakang, username, password, email, origin, phone, foto_stnk, foto_sim, photo, kota, role, otp, is_verified, user_date, user_lastdate )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING username,id,phone,email,otp;', user);
    const res = await client.query('SELECT * from '+ dbTable);
    console.table(res.rows);
    //console.log(res);
    //console.table(results.rows)
  
  }
  
  catch (ex){
    console.log('Enek seng salah iki ' + ex)
  }

  finally{
    await client.end();
  }

})().catch(console.error);