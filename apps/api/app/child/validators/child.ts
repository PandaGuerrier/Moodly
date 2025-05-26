import vine from '@vinejs/vine'

export const createChildValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    nickname: vine.string().optional(),
    birthDate: vine.string(),
  })
)
