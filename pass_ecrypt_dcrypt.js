let libby = require('./CULibby/index')

libby.encode('123')
    .then(encode => libby.compare('433', encode))
    .then(res => console.log(res))
    .catch(err => console.log(err));