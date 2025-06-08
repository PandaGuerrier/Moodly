import type { HttpContext } from '@adonisjs/core/http'
import { createChildValidator } from '#child/validators/child'
import { DateTime } from 'luxon'

export default class ChildController {
  async add({ response, auth, request }: HttpContext) {
    console.log('me auth')
    const data = await request.validateUsing(createChildValidator)
    console.log(data)
    const user = await auth.authenticateUsing(['api'])
    console.log(user)
    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    const child = await user.related('childs').create({
      nickname: data.nickname,
      birthDate: DateTime.fromISO(data.birthDate, { zone: 'utc' }),
      avatar: data.avatar || 'sanglier', // Default avatar if not provided
    })

    return response.status(200).json({
      user: user,
      child: child,
    })
  }

  async delete({ response, auth, params }: HttpContext) {
    const user = await auth.authenticateUsing(['api'])
    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    const childId = params.id
    const child = await user.related('childs').query().where('id', childId).first()

    if (!child) {
      return response.status(404).json({ message: 'Child not found' })
    }

    await child.delete()

    return response.status(200).json({
      message: 'Child deleted successfully',
      user: user,
    })
  }

  async getAll({ response, auth }: HttpContext) {
    const user = await auth.authenticateUsing(['api'])
    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    const childs = await user.related('childs').query()

    return response.status(200).json({
      user: user,
      childs: childs,
    })
  }
}
