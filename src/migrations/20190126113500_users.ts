export let up = async (knex: any) => {
  await knex.schema.createTable("users", (table: any) => {
    table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("firstname", 75).notNullable();
    table.string("lastname", 75).notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.boolean("is_verified").defaultTo(false).nullable();
    table.string("verification_token").nullable();
    table.boolean("is_enabled").defaultTo(true).nullable();
    table.boolean("is_banned").defaultTo(false).nullable();
    table.json("role").nullable();
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
    table.dateTime("loggued_at").nullable();
    table.primary(["uuid"]);
  });

  await knex.schema.createTable("informations_users", (table: any) => {
    table.uuid("user_uuid").notNullable();
    table.text("description").nullable();
    table.integer("uev").notNullable().defaultTo("0");
    table.string("address", 75).nullable();
    table.string("address_1", 75).nullable();
    table.string("zip_code", 10).nullable();
    table.string("city").nullable();
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now());
    table.primary(["user_uuid"]);
    table.unique(["user_uuid"]);
    table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  });

  await knex.schema.createTable("orders_users", (table: any) => {
    table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("user_uuid").notNullable();
    table.uuid("transaction_id").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
    table.dateTime("expired_at").notNullable();
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now());
    table.primary(["uuid"]);
    table.index(["user_uuid"]);
    table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  });
};

export let down = async (knex: any) => {
  await knex.schema.table("informations_users", (table: any) => {
    table.dropForeign("user_uuid");
  });

  await knex.schema.table("orders_users", (table: any) => {
    table.dropForeign("user_uuid");
  });

  await knex.schema.dropTable("informations_users");
  await knex.schema.dropTable("orders_users");
  await knex.schema.dropTable("users");
};
