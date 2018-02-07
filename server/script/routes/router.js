const express = require('express')
var router = express.Router()

//HOME
router.get('/', function (req, res) {
    res.sendfile('./server/html/jeux.html')
    console.log('=> /')
})

module.exports = router