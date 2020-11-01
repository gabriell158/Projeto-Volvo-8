
exports.up = function(knex) {
    return knex.schema.createTable('vehicles',function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users')
    });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicles');
};
