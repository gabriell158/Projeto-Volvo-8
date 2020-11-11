
exports.up = function(knex) {
    return knex.schema.createTable('vehicles',function(table) {
        table.increments();
        table.string('vehicleName').notNullable();
        table.string('description').notNullable();
        table.string('equipList').notNullable();
        table.string('userId').notNullable();
        table.foreign('userId').references('id').inTable('users')
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicles');
};
