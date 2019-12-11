const database = require('./database');

const PreVocab = {
    async readAll(req, res) {
      try {
        const readAllQuery = 'SELECT * FROM  prefix_vocab';
        const { rows } = await database.query(readAllQuery);
        return res.send({ rows });
      } catch (error) {
        return res.send(error);
      }
    },

    async insert(req, res, word, definition, kk, disassemble = null) {
      try {
        const insertQuery = `INSERT INTO prefix_vocab (word, definition, kk, disassemble) VALUES (
              '${word}',
              '${definition.trim()}',
              '${kk.trim()}',
              '${disassemble}');`
        await database.query(insertQuery);
      } catch (error) {
        return res.send(error);
      }
    }
  };
  
  module.exports = PreVocab;