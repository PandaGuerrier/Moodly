import router from '@adonisjs/core/services/router'
import ActivitiesController from '#activities/controllers/activities_controller'
import DefaultActivitiesController from '#activities/controllers/default_activities_controller'

router.group(() => {
  router.get('/', [DefaultActivitiesController, 'index'])
}).prefix('/activities/default')

router.group(() => {
  router.post('/assign', [ActivitiesController, 'assign'])
  router.post('/chat', [ActivitiesController, 'chat'])
  router.get('/:id', [ActivitiesController, 'index'])
  router.get('/:id/:activityId', [ActivitiesController, 'show'])
}).prefix('/activities')

