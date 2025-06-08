import type { HttpContext } from '@adonisjs/core/http'
import { createAssignActivityValidator, createPhotoValidator } from '#activities/validators/activity'
import DefaultActivity from '#activities/models/default_activity'
import Env from '#start/env'
import groq from '#start/groq'
import { createFileFromBase64 } from '#activities/utils/activity_utils'

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

  async index({ auth, response, params }: HttpContext) {
    const user = await auth.authenticateUsing(['api'])
    const child = await user.related('childs').query().where('id', params.id).firstOrFail()
    await child.load('activities', (query) => {
      query.preload('defaultActivity')
    })

    return response.status(200).json({
      activities: child.activities.map(activity => {
        return {
          id: activity.id,
          isFinished: activity.isFinished,
          isStarted: activity.isStarted,
          defaultActivity: {
            id: activity.defaultActivity.id,
            name: activity.defaultActivity.name,
            description: activity.defaultActivity.description,
            type: activity.defaultActivity.type,
            data: activity.defaultActivity.data,
          },
          data: activity.data,
        }
      })
    })
  }

  async show({ auth, response, params }: HttpContext) {
    const user = await auth.authenticateUsing(['api'])
    const child = await user.related('childs').query().where('id', params.id).firstOrFail()
    await child.load('activities', (query) => {
      query.preload('defaultActivity')
    })

    const activity = child.activities.find(activity => activity.id === params.activityId)
    if (!activity) {
      return response.status(404).json({ message: 'Activity not found' })
    }

    return response.status(200).json({
      activity: {
        id: activity.id,
        isFinished: activity.isFinished,
        isStarted: activity.isStarted,
        defaultActivity: {
          id: activity.defaultActivity.id,
          name: activity.defaultActivity.name,
          description: activity.defaultActivity.description,
          type: activity.defaultActivity.type,
          data: activity.defaultActivity.data,
        },
        data: activity.data,
      }
    })
  }

  /**
   * Handle chat requests for activities.
   * This method processes a photo uploaded by a child and generates a response
   * using the Groq AI model to explain the object in the photo.
   *
   * @param {HttpContext} context - The HTTP context containing request, auth, and response objects.
   * @returns {Promise<Response>} - A JSON response with the AI-generated explanation of the object in the photo.
   */
  async chat({ request, auth, response }: HttpContext) {
    const { photo, childId } = await request.validateUsing(createPhotoValidator)
    const user = await auth.authenticateUsing(['api'])

    const child = await user.related('childs').query().where('id', childId).firstOrFail()
    const fileName = `${Date.now()}-${photo.name}`

    await createFileFromBase64(photo.base64, `storage/uploads/chat/${fileName}`)

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
                "url": `${Env.get("IMAGE_URL")}/uploads/uploads/chat/${fileName}`,
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
}
