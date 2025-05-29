import router from '@adonisjs/core/services/router'
import ActivityController from '#activities/controllers/activity_controller'

router.group(() => {
  router.post('/chat', [ActivityController, 'chat'])
}).prefix('/activities')
