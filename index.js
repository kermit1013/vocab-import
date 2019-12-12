const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const SuffixVocab = require('./SuffixVocab');
const PrefixVocab = require('./PrefixVocab');
const RootVocab = require('./RootVocab');


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', SuffixVocab.readAll);

app.post('/importSuffix', (req, res) => {
    req.body.forEach(vocab => {
        vocab.prss.sort(function(a, b){
            var keyA = a.id,
                keyB = b.id;
    
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });


        if (vocab.subs.length > 0) {
            if(vocab.prss.length > 1 && hasPrefix(vocab.prss)) {
                SuffixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, hasPrefix(vocab.prss).key.trim()+' + '+vocab.subs[0].word.trim()+' + '+vocab.prss[1].key.trim())
                return;
            }
            SuffixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, vocab.subs[0].word.trim() + ' + ' + vocab.prss[0].key.trim())
            SuffixVocab.insert(req, res, vocab.subs[0].word, vocab.subs[0].dictionary.definition, vocab.subs[0].dictionary.kk)
            
        } else if(vocab.prss.length === 1) {
            SuffixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, vocab.prss[0].key.trim())
            
        } else {
            var apart = ""
            vocab.prss.forEach(element=> {
                apart += " + " + element.key.trim()
            });
            SuffixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, apart.substring(3, apart.length))
        }   
    });
  
    res.send('Success');
});

app.post('/importPrefix', (req, res) => {
    req.body.forEach(vocab => {
        vocab.prss.sort(function(a, b){
            var keyA = a.id,
                keyB = b.id;
    
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });

        if (vocab.subs.length > 0) {
            if(vocab.prss.length > 1 && hasPrefix(vocab.prss)) {
                PrefixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, hasPrefix(vocab.prss).key.trim()+' + '+vocab.subs[0].word.trim()+' + '+vocab.prss[1].key.trim())
                return;
            }

            PrefixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, vocab.prss[0].key.trim() + ' + ' + vocab.subs[0].word.trim())
            PrefixVocab.insert(req, res, vocab.subs[0].word, vocab.subs[0].dictionary.definition, vocab.subs[0].dictionary.kk)
            
        } else if(vocab.prss.length === 1) {
            PrefixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, vocab.prss[0].key.trim())
            
        } else {
            var apart = ""
            vocab.prss.forEach(element=> {
                apart += " + " + element.key.trim()
            });
            PrefixVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, apart.substring(3, apart.length))
        }   
    });
  
    res.send('Success');
});

app.post('/importRoot', (req, res) => {
    req.body.forEach(vocab => {
        vocab.prss.sort(function(a, b){
            var keyA = a.id,
                keyB = b.id;
    
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });


        if (vocab.subs.length > 0) {
            if(vocab.prss.length > 1 && hasPrefix(vocab.prss)) {
                RootVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, hasPrefix(vocab.prss).key.trim()+' + '+vocab.subs[0].word.trim()+' + '+vocab.prss[1].key.trim())
                return;
            }
            if(vocab.prss.length === 0) {
                RootVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, vocab.subs[0].word.trim())
                RootVocab.insert(req, res, vocab.subs[0].word, vocab.subs[0].dictionary.definition, vocab.subs[0].dictionary.kk)
                return;
            }
            RootVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk,  vocab.subs[0].word.trim() + ' + ' + vocab.prss[0].key.trim())
            RootVocab.insert(req, res, vocab.subs[0].word, vocab.subs[0].dictionary.definition, vocab.subs[0].dictionary.kk)
            
        } else if(vocab.prss.length === 1) {
            RootVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, vocab.prss[0].key.trim())
            
        } else {
            var apart = ""
            vocab.prss.forEach(element=> {
                apart += " + " + element.key.trim()
            });
            RootVocab.insert(req, res, vocab.word, vocab.dictionary.definition, vocab.dictionary.kk, apart.substring(3, apart.length))
        }   
    });
  
    res.send('Success');
});

function hasPrefix (array) {
    // not sure 100
    return array.find(element => element.id <= 100)
}

app.listen(port, () => console.log(`listening on port ${port}!`))