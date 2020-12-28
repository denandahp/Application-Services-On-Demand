const debug = require('debug')('app:model:merchantUser');
const pool = require('../libs/db');
const { hash } = require('bcrypt');
const encryptPassword = require('../libs/secret').encryptPassword;
const comparePassword = require('../libs/secret').comparePassword;
const compareOTP = require('../libs/secret').compareOTP;
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const schema = '"merchant"';
const table = '"users"';
const dbTable = schema + '.' + table;
const dbPemilik = '"merchant.infopemilik"';
const dbUsaha = '"merchant.infousaha"';

class UserModel {

  async login (username, password) {
    // password = encryptPassword(password, username);

    const res = await pool.query('SELECT user_id, username, password, role, email, phone from ' + dbTable + ' where username = $1', [username]);
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
      let user = [data.username, data.password, data.email, data.phone, data.role, randomOTP, 1, d, d, FormattedDate];
      let res =  await pool.query('INSERT INTO ' + dbTable + ' (username, password, email, phone, role, otp, is_verified, user_date, user_lastdate, limit_otp )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING username,user_id,phone,email,user_date,otp,limit_otp;', user);
      let created = res.rows[0];
      //console.log(created);
      debug('register %o', res);
      return created;

    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
      return ex;
    };

  }

  async checkdatauser(data){
    try{
    let status ;
    const res = await pool.query('SELECT * FROM' + dbTable + 'where username = $1 OR email = $2 OR phone = $3',[data.username, data.email, data.phone]);
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

  async verifikasiotp(kodeOTP,username){
    var d = new Date(Date.now());
    const res = await pool.query('SELECT user_id, username, password, role, phone, otp, limit_otp FROM' + dbTable + 'where username = $1 AND otp = $2',[username,kodeOTP]);
    if (res.rowCount <= 0) {
      throw new Error('OTP tidak ditemukan');
      
    } else {
      if (await kodeOTP == res.rows[0].otp && d <= res.rows[0].limit_otp) {
        const updateVerif = await pool.query('UPDATE' + dbTable + 'SET is_verified = $1 WHERE otp = $2 ',[2,kodeOTP]);
        return updateVerif.rows[0];
      } else {
        throw new Error('OTP salah.');
        // console.log(FormattedDate);
      }
    }
  }

  async checkregistrasi(data, randomOTP){
    try{
    let otplimit = 120; // in Second
    var d = new Date(Date.now());
    d.setSeconds(d.getSeconds() + otplimit);
    var dd = d.getDate();var mm = d.getMonth() + 1;var y = d.getFullYear();var hour = d.getHours();var minute = d.getMinutes();var second = d.getSeconds();
    var FormattedDate = y + '-'+ mm + '-'+ dd + ' ' + hour+':'+minute+':'+second;
    let user = [data.username, data.email, data.phone, randomOTP, 1, d, FormattedDate];
    const res = await pool.query('SELECT * FROM' + dbTable + 'where username = $1 AND email = $2 AND phone = $3 AND is_verified = $5 ',user);
    if (res.rowCount > 0) {
      const updateregistrasi = await pool.query('UPDATE' + dbTable + 'SET (username, email, phone, otp, is_verified, user_lastdate, limit_otp) = ($1, $2, $3, $4, $5, $6, $7) WHERE username = $1 RETURNING user_id, username, email, phone, is_verified, otp, user_lastdate, limit_otp',user);
      let created = updateregistrasi.rows[0];
      console.log(user.length);
      debug('register %o', updateregistrasi);
      return {"data" : created, "status" : '200'};
    } else {
      return { "status" : '400'};;
    }

    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
    };
  }

  async rekeningbank(data){
    try{
      let user = [data.username, data.nama_bank, data.no_rekening, data.beda_pemilik, d, data.rekening_state];
      var d = new Date(Date.now());
      const res = await pool.query('SELECT * FROM' + dbTable + 'where username = $1 ',[data.username]);
      if (res.rowCount <= 0) {
        throw new Error('username tidak ditemukan');
        
      } else {
          const updaterekening = await pool.query('UPDATE' + dbTable + 'SET (nama_bank, no_rekening, beda_pemilik, user_lastdate, rekening_state) = ($2, $3, $4, $5, $6) WHERE username = $1 RETURNING username, nama_bank, no_rekening, beda_pemilik, rekeningstate;',user);
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
  
      const res = await pool.query('SELECT user_id, username, password, role, phone, user_lastdate, otp, limit_otp FROM' + dbTable + 'where username = $1 AND phone = $2',[data.username,data.phone]);
      if (res.rowCount <= 0) {
        throw new Error('User tidak ditemukan');
      } else {
  
        let sets = [data.username, data.phone, randomOTP, d, FormattedDate];
        let resdata = await pool.query('UPDATE' + dbTable + 'SET otp = $3, user_lastdate = $4 , limit_otp = $5 WHERE username =$1 AND phone = $2 RETURNING user_id,username,phone,otp,user_lastdate,limit_otp', sets);
        let created = resdata.rows[0];
        
        debug('edit %o', res);
        return created;
      }
    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
    };
  }

  async verifikasiUser (statusUserUpdate) {
    const res = await pool.query('SELECT user_id, username, role, is_verified FROM' + dbTable + 'where username = $1',[statusUserUpdate.username]);
    //1 =  not verified , 2 = Pending, 3 = Verified
    const updateVerif = await pool.query('UPDATE' + dbTable + 'SET is_verified = $1 WHERE username = $2 ',[statusUserUpdate.is_verified,statusUserUpdate.username]);
  }

  async edit (data) {
    let sets = [data.user_id, data.namadepan, data.namabelakang, data.username, data.password, data.email, data.origin, data.phone, data.photo, data.role];
    let res = await pool.query('UPDATE' + dbTable + 'SET (namadepan, namabelakang, username, password, email, origin, phone, photo, role) = ($2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE user_id = $1 RETURNING id,namadepan,namabelakang, username, email, origin, phone,role', sets);
    
    debug('edit %o', res);
    if (res.rowCount <= 0) {
      throw 'Edit fail';
    } else {
      return res;
    }
  }

  async delete (data) {

    let user_id = data.user_id;
    let username = data.username;
    let column = (user_id === undefined) ? 'username' : 'user_id';

    const res = await pool.query('DELETE from ' + dbTable + ' where ' + column + ' = $1 RETURNING user_id, username, phone, role', [(user_id || username)]);

    debug('delete %o', res);

    return res;
  }

  async get (user_id) {
    try{
    let res;

    if (user_id === undefined) {
      res = await pool.query('SELECT * from ' + dbTable + ' ORDER BY user_id ASC')
    } else {
      res = await pool.query('SELECT * from ' + dbTable + ' where user_id = $1 ORDER BY user_id ASC', [user_id]);
    }
    debug('get %o', res);

    return res;
  }catch(ex){
    console.log('Enek seng salah iki ' + ex)
  };
    
  }

  async alldetail (username) {
    try{
    let res;
    if (username === 'all') {
    res = await pool.query('SELECT * from ' + dbTable + ' INNER JOIN ' + dbPemilik + ' ON ' + dbTable +'.username = ' + dbPemilik +'.username INNER JOIN ' + 
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

  async showAllUser (role,status) {

    let res;
    
    if (role === 'all') {
      res = await pool.query('SELECT * from ' + dbTable + ' ORDER BY user_id ASC')
    } else {
      if(status == 'all'){
        res = await pool.query('SELECT * from ' + dbTable + ' where role = $1 ORDER BY user_id ASC', [role]);
      }else {
        res = await pool.query('SELECT * from ' + dbTable + ' where role = $1 AND is_verified = $2 ORDER BY user_id ASC', [role, status]);
      }
    }
    
    debug('get %o', res);

    return res;
    
  }


  async userstatus (user_id) {

    let res;

    if (user_id === undefined) {
      res = await pool.query('SELECT user_id, username,email, phone, role, is_verified  from ' + dbTable + ' ORDER BY user_id ASC')
    } else {
      res = await pool.query('SELECT user_id, username,email, phone, role, is_verified from ' + dbTable + ' where user_id = $1 ORDER BY user_id ASC', [user_id]);
    }

    debug('get %o', res);

    return res;
    
  }
}

module.exports = new UserModel();