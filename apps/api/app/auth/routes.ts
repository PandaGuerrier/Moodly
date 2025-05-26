import router from '@adonisjs/core/services/router'

import AuthController from '#auth/controllers/auth_controller'

router.group(() => {
  router.get('/', async () => {
    return {
      hello: 'world',
    }
  })

  router.post('/apple', [AuthController, 'apple'])
  router.get('/me', [AuthController, 'me'])
}).prefix('/auth')
