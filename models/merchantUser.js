const debug = require('debug')('app:model:merchantUser');
const pool = require('../libs/db');
const { hash } = require('bcrypt');
const encryptPassword = require('../libs/secret').encryptPassword;
const comparePassword = require('../libs/secret').comparePassword;
const compareOTP = require('../libs/secret').compareOTP;
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const schema = '"merchant"';
const table = '"user"'
const dbTable = schema + '.' + table;
const dbRestaurant = 'merchant.restaurant';
const dbOTP = 'utility.otp';
const dbBank = 'utility.bank';


class UserModel {

  async login (username, password) {
    // password = encryptPassword(password, username);

    const res = await pool.query('SELECT id, username, password, role, email, phone from ' + dbTable + ' where username = $1', [username]);
    debug('login %o', res);

    if (res.rowCount <= 0) {
      throw new Error('User tidak ditemukan.');
    } else {
      // if (await comparePassword(password, res.rows[0].password)) {
      if (await password == res.rows[0].password) {
        res.rows[0].password = undefined; //undefined gunanya buat ngilangin di res.rows[0]
        return res.rows[0];
      } else {
        throw new Error('Password salah.');
      }
    }
  }

  async register (data, randomOTP) {
    try{
      let otplimit = 120; // in Second
      var d = new Date(Date.now());
      d.setSeconds(d.getSeconds() + otplimit);
      var dd = d.getDate();var mm = d.getMonth() + 1;var y = d.getFullYear();var hour = d.getHours();var minute = d.getMinutes();var second = d.getSeconds();
      var FormattedDate = y + '-'+ mm + '-'+ dd + ' ' + hour+':'+minute+':'+second;
      console.log(FormattedDate);
      let user = [data.username, data.password, data.email, data.phone, data.role, 1, d, d];
      let res =  await pool.query('INSERT INTO ' + dbTable + ' (username, password, email, phone, role, verification_user_id, created_at, updated_at )'+
                                  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING username, id, phone, email, role, created_at, updated_at;', user);
      let otpdata = ['merchant', 'user', res.rows[0].id, 'registrasi user merchant', randomOTP, FormattedDate, d, d, d];
      let otpdb =  await pool.query('INSERT INTO ' + dbOTP + ' (schema, table_name, table_id, verification_task, otp, limit_otp, the_day, created_at, updated_at)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', otpdata);
      console.log('Cek sini ');
      let datafinal =  await pool.query('UPDATE ' + dbTable + ' SET phone_otp_id = $1 WHERE id = $2 RETURNING *;', [otpdb.rows[0].id, res.rows[0].id]);
      let created = datafinal.rows[0];
      //console.log(created);
      debug('register %o', created);
      return {"user" : created, "otp" : otpdb.rows[0]} ;

    }catch(ex){
      console.log('Enek seng salah iki ' + ex);
      return{"status" : "400", "error" : ex };
    };

  }

  async checkdatauser(data){
    try{
    let status ;
    const res = await pool.query('SELECT * FROM' + dbTable + 'where username = $1 OR email = $2 OR phone = $3 ',[data.username, data.email, data.phone]);
    if (res.rowCount > 0) {
      if (res.rows[0].username == data.username){return {"status":"400", "errors": "username " + data.username + " sudah terdaftar"}}
      else if (res.rows[0].email == data.email){ return {"status":"400", "errors": "email " + data.email + " sudah terdaftar"}}
      else if (res.rows[0].phone == data.phone){ return {"status":"400", "errors": "phone " + data.phone + " sudah terdaftar"}}
      else{return status = '200'}
    } else {
      return status = '200'
    }

  }catch(ex){
    console.log('Enek seng salah iki ' + ex)
  };
  }

  async checkregistrasi(data, randomOTP){
    try{
    let otplimit = 120; // in Second
    var d = new Date(Date.now());
    d.setSeconds(d.getSeconds() + otplimit);
    var dd = d.getDate();var mm = d.getMonth() + 1;var y = d.getFullYear();var hour = d.getHours();var minute = d.getMinutes();var second = d.getSeconds();
    var FormattedDate = y + '-'+ mm + '-'+ dd + ' ' + hour+':'+minute+':'+second;
    let user = [data.username, data.email, data.phone, randomOTP, 1, d, FormattedDate];
    const res = await pool.query('SELECT * FROM' + dbTable + 'where username = $1 AND email = $2 AND phone = $3 AND  verification_user_id = $4 ',[data.username, data.email, data.phone, 1]);
    if (res.rowCount > 0) {
      let otpdata = ['merchant', 'user', res.rows[0].id, 'registrasi user merchant belum verifikasi OTP', randomOTP, FormattedDate, d, d, d];
      let otpdb =  await pool.query('INSERT INTO ' + dbOTP + ' (schema, table_name, table_id, verification_task, otp, limit_otp, the_day, created_at, updated_at)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', otpdata);
      let value = [data.username, data.email, data.phone, otpdb.rows[0].id, 1, d];
      const updateregistrasi = await pool.query('UPDATE' + dbTable + 'SET (username, email, phone, phone_otp_id,  verification_user_id, updated_at) = ($1, $2, $3, $4, $5, $6) WHERE username = $1 RETURNING id, username, email, phone,  verification_user_id, phone_otp_id, updated_at',value);
      let created = updateregistrasi.rows[0];
      console.log(user.length);
      debug('register %o', updateregistrasi);
      return {"data" : created,"otp" : otpdb.rows[0], "status" : '200'};
    } else {
      return { "status" : '400'};;
    }

    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
    };
  }

  async verifikasiotp(kodeOTP, id_user){
    try{
      var d = new Date(Date.now());
      const res = await pool.query('SELECT ' + dbTable + '.id, username, password, role, phone, phone_otp_id, otp,' + dbOTP + '.limit_otp, ' + dbTable +'.updated_at FROM ' + dbTable + ' INNER JOIN '+
                                  dbOTP + ' ON '+ dbTable + '.phone_otp_id = ' + dbOTP +'.id where '+ dbTable +'.id = $1 AND ' + dbOTP + '.otp = $2',[id_user, kodeOTP]);
      console.log(kodeOTP + "    "+ id_user);
      console.log(res.rows[0].limit_otp);
      console.log(d);
      if (res.rowCount <= 0) {
        console.log("cekcasa");
        throw new Error('OTP tidak ditemukan');
      } else {
        if (await kodeOTP == res.rows[0].otp && d <= res.rows[0].limit_otp) {
          const updateVerif = await pool.query('UPDATE' + dbTable + 'SET  verification_user_id = $1 WHERE phone_otp_id = $2 RETURNING id, username, verification_user_id, phone',[2,res.rows[0].phone_otp_id]);
          return updateVerif.rows[0];
        } else {
          throw new Error('OTP salah.');
          // console.log(FormattedDate);
        }
      }
    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
      return{"status": "400", "error": ex};
    };
    
  }

  async rekeningbank(data){
    try{
      let user = [data.id, data.bank, data.no_account, data.is_owner_bank_account, d, data.rekening_state];
      var d = new Date(Date.now());
      const res = await pool.query('SELECT id, username, bank, role, phone, no_account, is_owner_bank_account, rekening_state FROM' + dbTable + 'where id = $1 ',[data.id]);
      if (res.rowCount <= 0) {
        throw new Error('id tidak ditemukan');
      } else {
          const updaterekening = await pool.query('UPDATE' + dbTable + 'SET (bank, no_account, is_owner_bank_account, updated_at, rekening_state) = ($2, $3, $4, $5, $6) WHERE id = $1 RETURNING id, bank, no_account, is_owner_bank_account, rekening_state ',user);
          return updaterekening.rows[0];
      }

    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
    };
  }

  async resendotp (data,randomOTP) {
    try{
      let otplimit = 120; // in Second
      var d = new Date(Date.now());
      d.setSeconds(d.getSeconds() + otplimit);
      var dd = d.getDate();var mm = d.getMonth() + 1;var y = d.getFullYear();var hour = d.getHours();var minute = d.getMinutes();var second = d.getSeconds();
      var FormattedDate = y + '-'+ mm + '-'+ dd + ' ' + hour+':'+minute+':'+second;
      console.log(FormattedDate);
      const res = await pool.query('SELECT id, username, password, role, phone, updated_at, phone_otp_id FROM' + dbTable + 'where id = $1 AND phone = $2',[data.id, data.phone]);
      if (res.rowCount <= 0) {
        throw new Error('User tidak ditemukan');
      } else {
        let otpdata = ['merchant', 'user', res.rows[0].id, 'registrasi user merchant resend OTP', randomOTP, FormattedDate, d, d];
        let otpdb =  await pool.query('INSERT INTO ' + dbOTP + '(schema, table_name, table_id, verification_task, otp, limit_otp, the_day, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', otpdata);  
        let sets = [data.id, data.phone, otpdb.rows[0].id, d];
        let resdata = await pool.query('UPDATE' + dbTable + 'SET (phone_otp_id, updated_at) = ($3, $4)  WHERE id =$1 AND phone = $2 RETURNING id,username, phone, phone_otp_id, updated_at', sets);
        let created = resdata.rows[0];
        
        debug('edit %o', created);
        return {"user" : resdata.rows[0], "otp" : otpdb.rows[0]};
      }
    }catch(ex){
      console.log('Enek seng salah iki ' + ex);
      return{"status": "400", "error": ex};
    };
  }

  async verifikasiUser (data) {
    try{
      let updateVerif, updateResto;
      var d = new Date(Date.now());
      const res1 = await pool.query('SELECT id, username, role,  verification_user_id FROM' + dbTable + 'where id = $1',[data.id]);
      const res2 = await pool.query('SELECT * FROM ' + dbRestaurant + ' where user_id = $1',[data.id]);

      //1 =  not verified , 2 = Pending, 3 = send data, 4 = verified by admin, 5 = activated by user
      if(data.verification_user_id == '5' ){
        updateResto = await pool.query('UPDATE ' + dbRestaurant + ' SET (live_at, verification_restaurant_at, updated_at) = ($2, $3, $4) WHERE user_id = $1 RETURNING live_at, verification_restaurant_at, updated_at, id, user_id ',[data.id, d, d, d]);
        updateVerif = await pool.query('UPDATE ' + dbTable + 'SET  (verification_user_id, updated_at) = ($2, $3) WHERE id = $1 RETURNING id, verification_user_id, username, phone;',[data.id, data.verification_user_id, d]);
      }else{
        updateResto = await pool.query('UPDATE ' + dbRestaurant + ' SET (verification_restaurant_at, updated_at) = ($2, $3) WHERE user_id = $1 RETURNING verification_restaurant_at, updated_at, id, user_id ;',[data.id, d, d]);
        updateVerif = await pool.query('UPDATE ' + dbTable + 'SET (verification_user_id, updated_at) = ($2, $3) WHERE id = $1 RETURNING id, verification_user_id, username, phone;',[data.id, data.verification_user_id, d]);
      }
      debug('edit %o', updateVerif, updateResto);
      console.log(updateResto.rows[0]);
      console.log(updateVerif.rows[0]);
      return {"user": updateVerif.rows[0], "restaurant" : updateResto.rows[0]};
    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
    };
  }

  async edit (data) {
    let sets = [data.id, data.namadepan, data.namabelakang, data.username, data.password, data.email, data.origin, data.phone, data.photo, data.role];
    let res = await pool.query('UPDATE' + dbTable + 'SET (namadepan, namabelakang, username, password, email, origin, phone, photo, role) = ($2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE id = $1 RETURNING id,namadepan,namabelakang, username, email, origin, phone,role', sets);
    
    debug('edit %o', res);
    if (res.rowCount <= 0) {
      throw 'Edit fail';
    } else {
      return res;
    }
  }

  async delete (data) {

    let id = data.id;
    let username = data.username;
    let column = (id === undefined) ? 'username' : 'id';

    const res = await pool.query('DELETE from ' + dbTable + ' where ' + column + ' = $1 RETURNING id, username, phone, role', [(id || username)]);

    debug('delete %o', res);

    return res;
  }

  async get (id) {

    let res;

    if (id === undefined) {
      res = await pool.query('SELECT * from ' + dbTable + ' ORDER BY id ASC')
    } else {
      res = await pool.query('SELECT * from ' + dbTable + ' where id = $1 ORDER BY id ASC', [id]);
    }

    debug('get %o', res);

    return res;
    
  }

  async showAllUser (role,status) {

    let res;
    
    if (role === 'all') {
      res = await pool.query('SELECT * from ' + dbTable + ' ORDER BY id ASC')
    } else {
      if(status == 'all'){
        res = await pool.query('SELECT * from ' + dbTable + ' where role = $1 ORDER BY id ASC', [role]);
      }else {
        res = await pool.query('SELECT * from ' + dbTable + ' where role = $1 AND  verification_user_id = $2 ORDER BY id ASC', [role, status]);
      }
    }
    
    debug('get %o', res);

    return res;
    
  }


  async userstatus (id) {

    let res;

    if (id === undefined) {
      res = await pool.query('SELECT username,email, phone, role,  verification_user_id  from ' + dbTable + ' ORDER BY id ASC')
    } else {
      res = await pool.query('SELECT username,email, phone, role,  verification_user_id from ' + dbTable + ' where id = $1 ORDER BY id ASC', [id]);
    }

    debug('get %o', res);

    return res;
    
  }

  async listbank () {

    let res;
    res = await pool.query('SELECT id, name, code from ' + dbBank + ' ORDER BY id ASC')

    debug('get %o', res);

    return res.rows;
    
  }

  async alldetail (username) {
    try{
    let res;
    if (username === 'all') {
    res = await pool.query('SELECT * from ' + dbTable + ' INNER JOIN ' + dbRestaurant + ' ON ' + dbTable +'.username = ' + dbRestaurant +'.username INNER JOIN ' + 
      dbUsaha + ' ON ' + dbTable +'.username = '+ dbUsaha + '.username ORDER BY user_id ASC')
    } else {
      res = await pool.query('SELECT * from ' + dbTable + ' INNER JOIN ' + dbPemilik + ' ON ' + dbTable +'.username = ' + dbPemilik +'.username INNER JOIN ' + 
      dbUsaha + ' ON ' + dbTable +'.username = '+ dbUsaha + '.username WHERE' + dbTable +'.username = $1 ORDER BY user_id ASC',[username])
    }

    debug('get %o', res);
    return res;
  }catch(ex){
    console.log('Enek seng salah iki ' + ex)
  };
    
  }
}

module.exports = new UserModel();