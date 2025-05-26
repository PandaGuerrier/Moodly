import type { HttpContext } from '@adonisjs/core/http'
import { createAppleValidator } from '#auth/validators/auth'
import User from '#auth/models/user'

export default class AuthController {
  async me({ response, auth }: HttpContext) {
    console.log('me auth')
    const user = await auth.authenticateUsing(['api'])
    console.log(user)
    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    await user.load('childs')

    return response.status(200).json({
      user: user,
    })
  }

  async apple({ request, response }: HttpContext) {
    console.log('apple auth')
    const { apple } = await request.validateUsing(createAppleValidator)
    console.log(apple)
    const user = await User.firstOrCreate({
      appleUser: apple.user,
    }, {
      email: apple.email,
      fullName: apple.fullName.givenName ? apple.fullName.givenName : null,
      appleIdToken: apple.identityToken,
      appleAuthorizationCode: apple.authorizationCode,
      appleUser: apple.user,
    })

    if (!user) {
      return response.status(500).json({ message: 'Error creating user' })
    }

    await user.save()

    const token = await User.accessTokens.create(user)

    console.log(token)
    await user.load('childs')

    return response.status(200).json({
      token: token,
      user: user,
    })
  }
}
