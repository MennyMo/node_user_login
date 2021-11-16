const express = require('express')
const router = express.Router()
const { validateUser, getWeatherReport, verifyToken, checkUser } = require('../middleware')
const { createNewUser, loginUser } = require('../controller/index')
const { createIncidentReport, fetchAllIncidents, fetchUserIncidents } = require('../controller/incident')
const { createUserSchema, loginUserSchema, createIncidentSchema } = require('../validation')


router.post(
    '/api/create-user',
    validateUser(createUserSchema, 'body'),
    checkUser('signup'),
    createNewUser
)

router.post(
    '/api/login-user',
    validateUser(loginUserSchema, 'body'),
    checkUser('login'),
    loginUser
 )

router.post(
    '/api/user-incident-report',
    verifyToken,
    validateUser(createIncidentSchema, 'body'),
    getWeatherReport,
    createIncidentReport
)

router.get(
    '/api/incident-reports',
    fetchAllIncidents
)

router.get(
    '/api/user-incident-report',
    verifyToken,
    fetchUserIncidents
)

module.exports = router