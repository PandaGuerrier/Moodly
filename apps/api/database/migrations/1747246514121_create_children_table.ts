import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'children'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nickname', 255).nullable()
      table.timestamp('birth_date').notNullable()
      table.string('avatar').defaultTo('sanglier')
      table.integer('intelligence').unsigned().defaultTo(50) // Default intelligence set to 50
      table.integer('level').unsigned().defaultTo(1) // Default level set to 1
      table.double('experience').unsigned().defaultTo(0.0) // Default experience set to 0
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
