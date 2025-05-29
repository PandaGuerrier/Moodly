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

export const createEmailValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
    fullName: vine.object({
      familyName: vine.string().optional(),
      givenName: vine.string().optional(),
    }),
  })
)
