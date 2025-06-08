import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Activity from '#activities/models/activity'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Child extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nickname: string

  @column()
  declare birthDate: DateTime

  @column()
  declare userId: number

  @column()
  declare avatar: string

  // other logic like friends, levels, etc.

  @hasMany(() => Activity)
  declare activities: HasMany<typeof Activity>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
