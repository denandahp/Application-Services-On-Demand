
exports.orderfoodtodriver = (data, result) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id
    },
    notification: {
      title: 'Orderan Masuk',
      body: 'Pesanan JFOOD dibuat atas nama ' + data.name,
    },
    android: {
      notification: {
        click_action: 'OPEN_ACTIVITY_1'      }
    },
    token: result.rows[0].token_notification
  };
      
    return {"payload" : message};
}

