import vine from '@vinejs/vine'

export const createChildValidator = vine.compile(
  vine.object({
    nickname: vine.string(),
    birthDate: vine.string(),
    avatar: vine.string().optional(),
  })
)
