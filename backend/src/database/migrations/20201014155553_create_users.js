
exports.up = function(knex) {
  return knex.schema.createTable('users',function(table) {
      table.string('id').primary();
      table.string('userName').notNullable();
      table.string('email').notNullable();
      //table.string('whatsapp').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
