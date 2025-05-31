import type { HttpContext } from '@adonisjs/core/http'
import DefaultActivity from '#activities/models/default_activity'

export default class DefaultActivitiesController {
  async index({ response }: HttpContext) {
    const activities = await DefaultActivity.query().where('is_active', true).orderBy('created_at', 'desc');
    return response.status(200).json({
      activities: activities.map(activity => activity.serialize())
    });
  }
}
