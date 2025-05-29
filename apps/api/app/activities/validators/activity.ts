import vine from '@vinejs/vine'

export const createChildValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    nickname: vine.string().optional(),
    birthDate: vine.string(),
  })
)

export const createPhotoValidator = vine.compile(
  vine.object({
    photo: vine.object({
      base64: vine.string(),
      type: vine.string(),
      name: vine.string()
    })
  })
)
