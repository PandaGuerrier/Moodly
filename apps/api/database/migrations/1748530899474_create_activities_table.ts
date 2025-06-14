import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('default_activity_id').unsigned().notNullable()
      table.foreign('default_activity_id').references('id').inTable('default_activities').onDelete('CASCADE')
      table.integer('child_id').unsigned().notNullable()
      table.foreign('child_id').references('id').inTable('children').onDelete('CASCADE')
      table.boolean('is_finished').defaultTo(false)
      table.boolean('is_started').defaultTo(true)
      table.json('data').notNullable().defaultTo('{}')
      table.timestamp('started_at').nullable()
      table.timestamp('finished_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
