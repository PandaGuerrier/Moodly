import type { HttpContext } from '@adonisjs/core/http'
import Category from '#common/models/category'

export default class DefaultActivitiesController {
  async index({ response }: HttpContext) {
    const categories = await Category.query()
      .preload('activities', (query) => {
        query.where('isActive', true).orderBy('difficulty', 'desc')
      })
      .orderBy('name', 'asc');


    return response.status(200).json({
      categories: categories.map((category: Category) => category.serialize()),
    });
  }
}
