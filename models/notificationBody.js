
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
        click_action: 'ORDER_IN'      }
    },
    token: result.rows[0].token_notification
  };
      
    return {"payload" : message};
}

exports.orderfood_customertomerchant = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
    },
    notification: {
      title: 'Pesanan Masuk',
      body: 'Pesanan JFOOD dibuat atas nama ' + data.name,
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_merchant
  };
      
    return {"payload" : message};
}

exports.rejectedfood_merchanttocustomer = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id : data.restaurant_id
    },
    notification: {
      title: 'Pesanan Ditolak ',
      body: 'Pesanan JFOOD ditolak oleh restaurant ',
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_customer
  };
      
    return {"payload" : message};
}

exports.orderfood_merchanttodriver = (data, result) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
      driver_id: result.rows[0].id
    },
    notification: {
      title: 'Orderan JFOOD Masuk',
      body: 'Pesanan JFOOD dibuat atas nama ' + data.name,
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.rows[0].token_notification
  };
      
    return {"payload" : message};
}

exports.orderfood_drivertomerchant = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
      driver_id : data.driver_id
    },
    notification: {
      title: 'JFOOD',
      body: 'Driver sedang menuju ke resto, atas nama ' + data.name + ' no pesanan ' + data.kode,
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_merchant
  };
      
    return {"payload" : message};
}

exports.orderfood_drivertocustomer = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
      driver_id : data.driver_id
    },
    notification: {
      title: 'JFOOD',
      body: 'Driver sedang menuju ke resto untuk memesan makanan'
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_customer
  };
      
    return {"payload" : message};
}

exports.processfood_drivertocustomer = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
      driver_id : data.driver_id
    },
    notification: {
      title: 'Driver sudah di resto',
      body: 'Pesanan sedang dibuat oleh resto'
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_customer
  };
      
    return {"payload" : message};
}

exports.processfood_merchanttodriver = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
      driver_id : data.driver_id
    },
    notification: {
      title: 'Pesanan Selesai',
      body: 'Driver bisa mengambil pesanannya'
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_driver
  };
      
    return {"payload" : message};
}

exports.deliverfood_drivertocustomer = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
      driver_id : data.driver_id
    },
    notification: {
      title: 'Pesanan Selesai diBuat',
      body: 'Driver sedang menuju ke lokasi anda'
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_customer
  };
      
    return {"payload" : message};
}

exports.arrivedfood_drivertocustomer = (data) => {
  
  var message = {
    data: {
      kodePemesanan: data.kode,
      user_id: data.user_id,
      restaurant_id: data.restaurant_id,
      driver_id : data.driver_id
    },
    notification: {
      title: 'Orderan Sampai',
      body: 'Driver sudah sampai dilokasi anda'
    },
    android: {
      notification: {
        click_action: 'ORDER_IN'      }
    },
    token: data.token_customer
  };
      
    return {"payload" : message};
}
