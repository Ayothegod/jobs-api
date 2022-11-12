


const getAllJobs = async (req,res) => {
    res.send('get all jobs')
}
const getJob = async (req,res) => {
    res.send('get single job')
}
const createJob = async (req,res) => {
    res.send('create job')
}
const updateJob = async (req,res) => {
    res.send('Update job')
}
const deleteJob = async (req,res) => {
    res.send('delete job')
}


module.exports = {getAllJobs, getJob, createJob, deleteJob, updateJob}
