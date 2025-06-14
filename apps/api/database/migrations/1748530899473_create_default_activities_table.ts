import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'default_activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.enu('type', ['photo', 'calcul', 'dictee', 'audio']).notNullable()
      table.boolean('is_active').defaultTo(true)
      table.json('data').notNullable().defaultTo('{}')
      table.integer('age')
      table.integer('max_age').nullable()
      table.integer('difficulty').unsigned().defaultTo(50) // Default difficulty set to 50

      table.integer('category_id').unsigned().nullable()
      table.foreign('category_id').references('id').inTable('categories').onDelete('SET NULL')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
