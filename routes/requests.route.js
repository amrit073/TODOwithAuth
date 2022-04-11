const router = require('express').Router()
const {addTask, getTask, updateTask, markTask, deleteTask} = require('../controllers/allreqs')


router.post('/add', addTask)
router.get('/get:gid', getTask)
router.post('/update', updateTask)
router.put('/mark', markTask)
router.post('/delete', deleteTask)



module.exports = router