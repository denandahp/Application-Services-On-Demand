
exports.orderfoodtodriver = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      id: {'user_id' : data.user_id, 'restaurant_id' : data.restaurant_id}
    },
    notification: {
      title: 'Orderan Masuk',
      body: 'Pesanan JFOOD dibuat atas nama ' + data.name,
    },
    android: {
      notification: {
        click_action: 'OPEN_ACTIVITY_1'
      }
    },
    token: data.token
  };
      
    return {"payload" : message};
}

