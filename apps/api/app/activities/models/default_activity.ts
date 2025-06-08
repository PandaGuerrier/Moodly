import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import groq from '#start/groq'
import * as fs from 'node:fs'

export default class DefaultActivity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare type: 'photo' | 'calcul' | 'dictee' | 'audio'

  @column()
  declare isActive: boolean

  @column({
    serializeAs: 'data',
    prepare: (value: any) => JSON.stringify(value),
  })
  declare data: any

  @beforeCreate()
  static async setDefaultValues(activity: DefaultActivity) {
    if (activity.type != 'dictee') {
      return
    }

    const speechFilePath = `storage/uploads/dictee/${activity.name}-speech.wav`;
    const model = "playai-tts";
    const voice = "Fritz-PlayAI";
    const responseFormat = "wav";

    const response = await groq.audio.speech.create({
      model,
      voice,
      response_format: responseFormat,
      input: activity.data.text || activity.description,
    })

    const buffer = Buffer.from(await response.arrayBuffer());
    if (!fs.existsSync('storage/uploads/dictee')) {
      fs.mkdirSync('storage/uploads/dictee', { recursive: true });
    }

    await fs.promises.writeFile(speechFilePath, buffer);

    activity.data.speechFilePath = speechFilePath;
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
