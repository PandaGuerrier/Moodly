import vine from '@vinejs/vine'

export const createAssignActivityValidator = vine.compile(
  vine.object({
    childId: vine.number(),
    activityId: vine.number()
  })
)

export const createPhotoValidator = vine.compile(
  vine.object({
    photo: vine.object({
      base64: vine.string(),
      type: vine.string(),
      name: vine.string()
    }),
    childId: vine.number()
  })
)
