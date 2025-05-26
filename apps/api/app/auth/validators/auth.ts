import vine from '@vinejs/vine'

export const createAppleValidator = vine.compile(
  vine.object({
    apple: vine.object({
      email: vine.string().email().optional(),
      fullName: vine.object({
        familyName: vine.string().optional(),
        givenName: vine.string().optional(),
      }),
      identityToken: vine.string(),
      authorizationCode: vine.string(),
      user: vine.string(),
    }),
  })
)
