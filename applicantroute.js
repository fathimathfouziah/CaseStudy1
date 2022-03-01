const express=require('express')
const router = express.Router()
const applicant=require('../models/applicant')

router.post('/register', async (req, res) => {
    const { fullname, email,mobileno,jobtype,preferedlocation,DOB } = req.body;
  
    // Simple validation
    if (!fullname || !email || !mobileno || !jobtype || !preferedlocation || !DOB) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user = await applicant.findOne({ email });
      if (user) throw Error('applicant already exists');
  
      
  
      const newapplicant = new applicant({
        fullname,
        email,
        mobileno,
        jobtype,
        preferedlocation,
        DOB
      });
  
      const applicantUser = await newapplicant.save();
      if (!applicantUser) throw Error('Something went wrong saving the user');    
      let applicantlist = await applicant.find({})
      res.status(200).json({
        user:applicantUser,
       userlist:applicantlist
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });
  router.get('/getallapplicant', async (req, res) => {

    try {
        let applicantlist = await applicant.find({})
        res.status(200).json({ status: 'success', data: applicantlist });
    }

    catch (error) {
        res.status(400).json({ error: error.message });
    }
})


  router.post('/editapplicant/:uniqueid', async (req, res) => {
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mobileno = req.body.mobileno;
    let jobtype = req.body.jobtype;
    let uniqueid = req.params.uniqueid;
    let preferedlocation = req.body.preferedlocation;
    let DOB = req.body.DOB;

    
    try {

        const filter = { _id: uniqueid };
        const update = { fullname: fullname, email: email, mobileno: mobileno, jobtype: jobtype, preferedlocation: preferedlocation,DOB: DOB};

        let result = await applicant.findOneAndUpdate(filter, update, { new: true });

        res.status(200).json({ status: 'success', data: result });
    }
    catch (error) {
        res.status(400).json('un success');
    }
})

  module.exports=router