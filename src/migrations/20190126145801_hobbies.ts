export let up = async (knex: any) => {
    await knex.schema.createTable("hobbies", (table: any) => {
        table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name", 75).notNullable();
        table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
        table.unique(["name"]);
        table.primary(["uuid"]);
    });

    await knex.schema.createTable("hobbies_users", (table: any) => {
        table.uuid("user_uuid").notNullable();
        table.uuid("hobby_uuid").notNullable();
        table.index(["user_uuid", "hobby_uuid"]);
        table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
        table.foreign("hobby_uuid").references("uuid").inTable("hobbies").onDelete("CASCADE").onUpdate("CASCADE");
    });
};

export let down = async (knex: any) => {
    await knex.schema.table("hobbies_users", (table: any) => {
        table.dropForeign("hobby_uuid");
        table.dropForeign("user_uuid");
    });

    await knex.schema.dropTable("hobbies_users");
    await knex.schema.dropTable("hobbies");
};
