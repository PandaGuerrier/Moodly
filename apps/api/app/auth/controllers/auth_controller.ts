import type { HttpContext } from '@adonisjs/core/http'
import { createAppleValidator, createEmailValidator } from '#auth/validators/auth'
import User from '#auth/models/user'

export default class AuthController {
  async me({ response, auth }: HttpContext) {
    const user = await auth.authenticateUsing(['api'])

    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    await user.load('childs')

    return response.status(200).json({
      user: user,
    })
  }

  async apple({ request, response }: HttpContext) {
    const { apple } = await request.validateUsing(createAppleValidator)

    const user = await User.firstOrCreate(
      {
        appleUser: apple.user,
      },
      {
        email: apple.email,
        fullName: apple.fullName.givenName ? apple.fullName.givenName : null,
        appleIdToken: apple.identityToken,
        appleAuthorizationCode: apple.authorizationCode,
        appleUser: apple.user,
      }
    )

    if (!user) {
      return response.status(500).json({ message: 'Error creating user' })
    }

    await user.save()

    const token = await User.accessTokens.create(user)

    await user.load('childs')

    console.log('User loaded:', token)

    return response.status(200).json({
      token: token,
      user: user,
    })
  }

  async email({ request, response }: HttpContext) {
    const data = await request.validateUsing(createEmailValidator)

    const user = await User.firstOrCreate(
      {
        email: data.email,
      },
      {
        email: data.email,
        password: data.password,
        fullName: data.fullName.givenName ? data.fullName.givenName : null,
      }
    )

    if (!user) {
      return response.status(500).json({ message: 'Error creating user' })
    }

    await user.save()

    const token = await User.accessTokens.create(user)
    await user.load('childs')

    return response.status(200).json({
      token: token,
      user: user,
    })
  }
}
