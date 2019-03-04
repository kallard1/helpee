export let up = async (knex: any) => {
  await knex.schema.createTable("blog_categories", (table: any) => {
    table.uuid("uuid").notNull().defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("label", 75).notNullable();
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
    table.primary(["uuid"]);
  });

  await knex.schema.createTable("blog_posts", (table: any) => {
    table.uuid("uuid").notNull().defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("blog_category_uuid").notNullable();
    table.string("title", 95).notNullable();
    table.text("content").notNullable();
    table.boolean("is_published").nullable().defaultTo(true);
    table.dateTime("published_at").nullable();
    table.boolean("is_deleted").nullable().defaultTo(false);
    table.boolean("can_comment").nullable().defaultTo(true);
    table.uuid("user_uuid").notNullable();
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
    table.primary(["uuid"]);
    table.index(["blog_category_uuid", "user_uuid"]);
    table.foreign("blog_category_uuid").references("uuid").inTable("blog_categories").onDelete("CASCADE").onUpdate("CASCADE");
    table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  });

  await knex.schema.createTable("blog_comments", (table: any) => {
    table.uuid("uuid").notNull().defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("user_uuid").notNullable();
    table.uuid("blog_post_uuid").notNullable();
    table.text("content").notNullable();
    table.boolean("is_published").nullable().defaultTo(true);
    table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
    table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
    table.primary(["uuid"]);
    table.index(["user_uuid", "blog_post_uuid"]);
    table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    table.foreign("blog_post_uuid").references("uuid").inTable("blog_posts").onDelete("CASCADE").onUpdate("CASCADE");
  });
};

export let down = async (knex: any) => {
  await knex.schema.table("blog_posts", (table: any) => {
    table.dropForeign("blog_category_uuid");
    table.dropForeign("user_uuid");
  });

  await knex.schema.table("blog_comments", (table: any) => {
    table.dropForeign("user_uuid");
    table.dropForeign("blog_post_uuid");
  });

  await knex.schema.dropTable("blog_categories");
  await knex.schema.dropTable("blog_posts");
  await knex.schema.dropTable("blog_comments");
};
