const Router = require('express').Router();
const wilayah = require('../controllers/wilayah.js');

Router.get('/provinsi', wilayah.provinsi)
      .get('/kab_kota/:kodeprov', wilayah.kab_kota)
      .get('/kecamatan/:kodeprov', wilayah.kecamatan)
      .get('/kelurahan/:kodeprov', wilayah.kelurahan);

module.exports = Router;