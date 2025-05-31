import type { HttpContext } from '@adonisjs/core/http'
import { createAssignActivityValidator, createPhotoValidator } from '#activities/validators/activity'
import DefaultActivity from '#activities/models/default_activity'
import Groq from 'groq-sdk'
import * as fs from 'fs'
import Env from '#start/env'

export default class ActivitiesController {
  async assign({ request, auth, response }: HttpContext) {
    const { activityId, childId } = await request.validateUsing(createAssignActivityValidator)
    const user = await auth.authenticateUsing(['api'])

    const defaultActivity = await DefaultActivity.query().where('id', activityId).firstOrFail()

    const child = await user.related('childs').query().where('id', childId).firstOrFail()

    const activity = await child.related('activities').create({
      defaultActivityId: defaultActivity.id,
      childId: child.id,
      isFinished: false,
      isStarted: true,
      data: {},
    })
    await activity.related('defaultActivity').associate(defaultActivity)
    await activity.load('defaultActivity')

    return response.status(200).json({
      activity: activity,
    })
  }

  async chat({ request, auth, response }: HttpContext) {
    const { photo, childId } = await request.validateUsing(createPhotoValidator)
    const user = await auth.authenticateUsing(['api'])

    const child = await user.related('childs').query().where('id', childId).firstOrFail()
    const fileName = `${Date.now()}-${photo.name}`

    await this.createFileFromBase64(photo.base64, `storage/uploads/${fileName}`)

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || '',
    })
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": `Tu es un assistant pour un enfant qui est né le ${child.birthDate.locale}. Il a ${new Date().getFullYear() - child.birthDate.year} ans et qui s'appelle ${child.firstName} ${child.lastName}, qui a comme surnom ${child.nickname}. Il doit prendre en photo des objets, et tu dois lui expliquer ce que c'est que cet objet, ne fait pas attention a l'arrière plan. Voici la photo :`
        },
        {
          "role": "system",
          "content": `Ne pose aucunes question, Ne dis pas bonjour, va direct au but. Et fait le texte en 100 mots maximum. Explique ce qu'est l'objet, et si c'est une fleur son nom et sa particularité, si c'est un animal son nom et son habitat, si c'est un objet du quotidien son utilité, etc. Ne pose aucune question a la fin.`
          },
        {
          "role": "user",
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": `${Env.get("IMAGE_URL")}/uploads/uploads/${fileName}`,
              }
            }
          ]
        }
      ],
      "model": "meta-llama/llama-4-scout-17b-16e-instruct",
      "temperature": 1,
      "max_completion_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "stop": null
    });

    console.log('Chat completion response:', chatCompletion.choices[0].message.content);
    return response.status(200).json({
      message: chatCompletion.choices[0].message.content,
    })
  }

  async createFileFromBase64(base64: string, filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Extract the Base64 data (if it includes a data URI prefix)
      const base64Data = base64.replace(/^data:.*;base64,/, '');

      // Decode the Base64 string
      const fileBuffer = Buffer.from(base64Data, 'base64');

      // Write the file to the specified path
      fs.writeFile(filePath, fileBuffer, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

}
