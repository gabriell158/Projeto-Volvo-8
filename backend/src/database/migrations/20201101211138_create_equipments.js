
exports.up = function(knex) {
    return knex.schema.createTable('equipments',function(table) {
        table.increments();
        table.string('equipName').notNullable();
        table.string('description').notNullable();
        table.string('quantity').notNullable();
        table.string('location').notNullable();
        table.string('userId').notNullable();
        table.foreign('userId').references('id').inTable('users')
    });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('equipments');
};