const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

//@desc Show add page
//@route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('/stories/add')
})

//@desc process add form
//@route PIAT /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc Show all stories
//@route GET /stories/add
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('stories/index', {
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//@desc Show edit page
//@route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.find({
            _id: req.params.id
        }).lean()

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            res.render('stories/edit', {
                story,
            })
        }
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})
//@desc Udate story
//@route PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('error / 404')
        }

        if (story.user != req.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
        }
    }
    catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})
//@desc Delete story
//@route DELETE /stories/:ID
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        return res.render('error/500')

    }
})

//@desc User stories
//@route GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
            .populate('user')
            .lean()

    res.render('stories/index'), {
        stories
    }
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router