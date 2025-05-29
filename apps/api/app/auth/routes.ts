import router from '@adonisjs/core/services/router'

import AuthController from '#auth/controllers/auth_controller'

router.group(() => {
  router.post('/apple', [AuthController, 'apple'])
  router.post('/email', [AuthController, 'email'])
  router.get('/me', [AuthController, 'me'])
}).prefix('/auth')
