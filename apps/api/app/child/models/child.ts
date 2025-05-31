import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, column, hasMany } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import Activity from '#activities/models/activity'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Child extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare nickname: string | null

  @column()
  declare birthDate: DateTime

  @column()
  declare userId: number

  @attachment({ preComputeUrl: false, serializeAs: null })
  declare avatar: Attachment

  @column()
  declare avatarUrl: string | null

  // other logic like friends, levels, etc.

  @hasMany(() => Activity)
  declare activities: HasMany<typeof Activity>

  @beforeFetch()
  static async preComputeAvatarUrl(child: Child) {
    if (child.avatar && !child.avatarUrl) {
      child.avatarUrl = await child.avatar.getUrl()
    }
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
