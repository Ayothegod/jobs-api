const Job = require('../models/Job.js')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}
const getJob = async (req,res) => {
    const { user:{userId},params:{id:jobId}} = req

    const job = await Job.findOne({
        _id:jobId,createdBy:userId
    })
    if(!job){
        throw new NotFoundError('no job with id found')
    }
    res.json({job})
}
const createJob = async (req,res) => {
    // const {} = req.body
    req.body.createdBy = req.user.userId
    console.log(req.body);
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req,res) => {
    res.send('Update job')
}
const deleteJob = async (req,res) => {
    res.send('delete job')
}


module.exports = {getAllJobs, getJob, createJob, deleteJob, updateJob}
