import { BaseSeeder } from '@adonisjs/lucid/seeders'
import DefaultActivity from '#activities/models/default_activity'

export default class extends BaseSeeder {
  async run() {
    await DefaultActivity.create({
      name: "Dictée des héros",
      description: "Écoute la dictée et écris les mots entendus. Tu peux écouter plusieurs fois si nécessaire.",
      type: 'dictee',
      isActive: true,
      data: {
        text: "Le chat noir saute sur le toit. Le soleil brille dans le ciel bleu. Les fleurs poussent dans le jardin.",
      }
    })
  }
}
