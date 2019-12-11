const database = require('./database');

const Vocab = {
    async readAll(req, res) {
      try {
        const readAllQuery = 'SELECT * FROM vocab';
        console.log(readAllQuery);
        const { rows } = await database.query(readAllQuery);
        console.log('test');
        return res.send({ rows });
      } catch (error) {
        return res.send(error);
      }
    },

    async insert(req, res, word, definition, kk, disassemble = null) {
      try {
        const insertQuery = `INSERT INTO vocab (word, definition, kk, disassemble) VALUES (
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
  
  module.exports = Vocab;