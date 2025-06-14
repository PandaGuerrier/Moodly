import { BaseSeeder } from '@adonisjs/lucid/seeders'
import DefaultActivity from '#activities/models/default_activity'
import Category from '#common/models/category'

export default class extends BaseSeeder {
  async run() {
    const category = await Category.create({
      name: "Activités florales",
      description: "Explore les activités liées aux fleurs et à la nature.",
      icon: "leaf",
      color: "green",
    })

    const activities = await DefaultActivity.createMany([
      {
        name: "Découverte des fleurs",
        description: "Apprends à reconnaître différentes fleurs et leurs caractéristiques.",
        type: "photo",
        age: 3,
        difficulty: 80
      },
      {
        name: "Création d'un bouquet",
        description: "Compose un joli bouquet avec les fleurs que tu as découvertes.",
        type: "calcul",
        age: 3,
        difficulty: 80
      },
      {
        name: "Dictee florale",
        description: "Écoute et écris les mots liés aux fleurs.",
        type: "calcul",
        age: 3,
        difficulty: 80
      },
      {
        name: "Chanson des fleurs",
        description: "Écoute une chanson sur les fleurs et chante avec.",
        type: "audio",
        age: 3,
        difficulty: 80
      },
    ])

    // Associate the activity with the category
    await category.related('activities').saveMany(activities)
  }
}
