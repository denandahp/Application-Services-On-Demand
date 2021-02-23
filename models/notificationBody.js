
exports.orderfoodtodriver = (data) => {
    var payload = {
        notification: {
          title: 'ORDER MAKANAN!',
          body: 'pesanan anda dengan nomor pesanan ' + data.id
        }
      };
      
      // Set the message as high priority and have it expire after 24 hours.
      var options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24
      };
      
    return {"payload" : payload, "options" : options};
}

