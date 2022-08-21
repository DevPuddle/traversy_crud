const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Story = require('../models/Story')

//@desc Login/landing page
//@route GET /
router.get('/', ensureGuest, async (req,res) => {
    try {
        const stories = await Story.find({user: req.user.id})
    } catch (error) {
        
    }
    res.render('login', {
        layout: 'login',
    })
})

//@desc Dashboard
//@route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {
        name: req.user.firstname,
    })
})

module.exports = router