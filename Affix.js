const database = require('./database');

const Affix = {
    async readAll(req, res) {
      try {
        const readAllQuery = 'SELECT * FROM affix';
        const { rows } = await database.query(readAllQuery);
        return res.send({ rows });
      } catch (error) {
        return res.send(error);
      }
    },

    async insert(req, res, key, variations, meaning, meaningEn) {
      try {
        const insertQuery = `INSERT INTO affix (key, variations, meaning, meaning_en) VALUES (
              '${key}',
              '${variations}',
              '${meaning}',
              '${meaningEn}');`
        await database.query(insertQuery);
      } catch (error) {
        return res.send(error);
      }
    }
  };
  
  module.exports = Affix;