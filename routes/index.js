const express = require('express')
const router = express.Router()

//@desc Login/landing page
//@routes GET /
router.get('/', (req,res) => {
    res.render('login')
})

//@desc Dashboard
//@routes GET /dashboard
router.get('/dashboard', (req,res) => {
    res.render('dashboard')
})

module.exports = router