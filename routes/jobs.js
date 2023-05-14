const express = require('express')
const router = express.Router()

const { application } = require('express')
const {getAllJobs, getJob, createJob, deleteJob, updateJob} = require('../controllers/jobs.js')

router.get('/',getAllJobs)
router.post('/',createJob)
router.get('/:id',getJob)
router.patch('/:id',updateJob)
router.delete('/:id',deleteJob)

module.exports = router