let express = require('express')
let router = express.Router()
let user = require('./API/user')
let attr = require('./API/attraction')

router.get('/user/get', user.get)
router.get('/user/reg', user.reg)
router.get('/user/updfav', user.updfav)

router.get('/attr/submit_req', attr.submit_req)
router.get('/attr/get_fav', attr.get_fav)

module.exports = router