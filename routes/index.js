const express = require('express')
const router = express.Router()

//@desc Login/landing page
//@routes GET /
router.get('/', (req,res) => {
    res.send('Login')
})

//@desc Dashboard
//@routes GET /dashboard
router.get('/dashboard', (req,res) => {
    res.send('Dashboard')
})

module.exports = router