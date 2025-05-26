import router from '@adonisjs/core/services/router'

import ChildController from '#child/controllers/child_controller'

router.group(() => {
  router.get('/get/all', [ChildController, 'getAll'])
  router.post('/', [ChildController, 'add'])
}).prefix('/child')
