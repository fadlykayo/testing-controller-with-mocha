var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/auth', function (req, res, next) {
  res.send({
    endpoints: [
      '/auth/register',
      '/auth/login',
      '/auth/logout',
      '/auth/users',
      '/auth/users/:id'
    ]
  })
})

router.post('/auth/register', userController.createUser)

router.post('/auth/login', userController.verifyUser)

router.get('/auth/users', userController.getUsers)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

router.get('/auth/logout', userController.logout)

module.exports = router
