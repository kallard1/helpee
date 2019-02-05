export let up = async (knex: any) => {
    await knex.schema.createTable("communities", (table: any) => {
        table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name", 75).notNullable();
        table.string("slug", 75).notNullable();
        table.text("description").notNullable();
        table.uuid("user_uuid").notNullable();
        table.boolean("is_enabled").defaultTo(true).nullable();
        table.string("zip_code", 10).nullable();
        table.string("city").nullable();
        table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
        table.primary(["uuid"]);
        table.index(["user_uuid"]);
        table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    });

    await knex.schema.createTable("communities_users", (table: any) => {
        table.uuid("user_uuid").notNullable();
        table.uuid("community_uuid").notNullable();
        table.index(["user_uuid", "community_uuid"]);
        table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
        table.foreign("community_uuid").references("uuid").inTable("communities").onDelete("CASCADE").onUpdate("CASCADE");
    });
};

export let down = async (knex: any) => {
    await knex.schema.table("communities", (table: any) => {
        table.dropForeign("user_uuid");
    });

    await knex.schema.table("communities_users", (table: any) => {
        table.dropForeign("user_uuid");
        table.dropForeign("community_uuid");
    });

    await knex.schema.dropTable("communities_users");
    await knex.schema.dropTable("communities");
};
