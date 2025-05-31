import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DefaultActivity from '#activities/models/default_activity'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => DefaultActivity)
  declare defaultActivity: BelongsTo<typeof DefaultActivity>

  @column()
  declare defaultActivityId: number

  @column()
  declare childId: number

  @column()
  declare isFinished: boolean

  @column()
  declare isStarted: boolean

  @column({
    serializeAs: 'data',
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare data: any

  @column.dateTime({ autoCreate: true })
  declare startedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare finishedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
