var express = require('express');
var router = express.Router();

var volunteer = require('../functions/logic/volunteer');

router.use('/volunteer/getProjects',volunteer.getProjects);

router.use('/volunteer/profile',volunteer.profile);
router.use('/volunteer/editProfile',volunteer.editProfile);


module.exports = router;