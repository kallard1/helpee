import Slugify from "../utils/slugify";

export let up = async (knex: any) => {
    await knex.schema.createTable("ads_categories", (table: any) => {
        table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("label", 75).notNullable();
        table.string("slug", 75).notNullable();
        table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
        table.primary(["uuid"]);
    });

    await knex.schema.createTable("ads", (table: any) => {
        table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.uuid("user_uuid").notNullable();
        table.uuid("category_uuid").notNullable();
        table.string("title").notNullable();
        table.string("slug").notNullable();
        table.text("description").notNullable();
        table.boolean("is_enabled").nullable().defaultTo(true);
        table.integer("uev").nullable();
        table.uuid("community_uuid").notNullable();
        table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
        table.primary(["uuid"]);
        table.index(["user_uuid", "category_uuid", "community_uuid"]);
        table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
        table.foreign("category_uuid").references("uuid").inTable("ads_categories").onDelete("CASCADE").onUpdate("CASCADE");
        table.foreign("community_uuid").references("uuid").inTable("communities").onDelete("CASCADE").onUpdate("CASCADE");
    });

    await knex.schema.createTable("ads_pictures", (table: any) => {
        table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.uuid("ad_uuid").notNullable();
        table.string("picture").notNullable();
        table.boolean("default").nullable();
        table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
        table.primary(["uuid"]);
        table.index(["ad_uuid"]);
        table.foreign("ad_uuid").references("uuid").inTable("ads").onDelete("CASCADE").onUpdate("CASCADE");
    });

    await knex.schema.createTable("ads_messages", (table: any) => {
        table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.uuid("ad_uuid").notNullable();
        table.uuid("user_uuid").notNullable();
        table.boolean("is_deleted").defaultTo(false);
        table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
        table.primary(["uuid"]);
        table.index(["ad_uuid", "user_uuid"]);
        table.foreign("ad_uuid").references("uuid").inTable("ads").onDelete("CASCADE").onUpdate("CASCADE");
        table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    });

    await knex.schema.createTable("ads_messages_messages", (table: any) => {
        table.uuid("uuid").notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.uuid("ad_message_uuid").notNullable();
        table.uuid("user_uuid").notNullable();
        table.text("content").notNullable();
        table.boolean("is_deleted").defaultTo(false);
        table.dateTime("created_at").defaultTo(knex.fn.now()).notNullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
        table.primary(["uuid"]);
        table.index(["ad_message_uuid", "user_uuid"]);
        table.foreign("ad_message_uuid").references("uuid").inTable("ads_messages").onDelete("CASCADE").onUpdate("CASCADE");
        table.foreign("user_uuid").references("uuid").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    });

    await knex("ads_categories").insert([
        {label: "Voitures", slug: Slugify.replace("Voitures")},
        {label: "Motos", slug: Slugify.replace("Motos")},
        {label: "Utilitaire", slug: Slugify.replace("Utilitaire")},
        {label: "Vélos", slug: Slugify.replace("Vélos")},
        {label: "Informatique", slug: Slugify.replace("Informatique")},
        {label: "Consoles & jeux", slug: Slugify.replace("Consoles & jeux")},
        {label: "Image & son", slug: Slugify.replace("Image & son")},
        {label: "Électroménager", slug: Slugify.replace("Électroménager")},
        {label: "Jardinage", slug: Slugify.replace("Jardinage")},
        {label: "Bricolage", slug: Slugify.replace("Bricolage")},
        {label: "Vêtements", slug: Slugify.replace("Vêtements")},
        {label: "Équipement bébé", slug: Slugify.replace("Équipement bébé")},
        {label: "Vêtements bébé", slug: Slugify.replace("Vêtements bébé")},
        {label: "DVD / Film", slug: Slugify.replace("DVD / Film")},
        {label: "CD / Musique", slug: Slugify.replace("CD / Musique")},
        {label: "Livres", slug: Slugify.replace("Livres")},
        {label: "Animaux", slug: Slugify.replace("Animaux")},
        {label: "Jeux & jouets", slug: Slugify.replace("Jeux & jouets")},
        {label: "Prestation de services", slug: Slugify.replace("Prestation de services")},
        {label: "Cours particulier", slug: Slugify.replace("Cours particulier")},
        {label: "Co-voiturage", slug: Slugify.replace("Co-voiturage")},
        {label: "Outillage", slug: Slugify.replace("Outillage")},
        {label: "Sport", slug: Slugify.replace("Sport")},
        {label: "Autre", slug: Slugify.replace("Autre")},
    ]);
};

export let down = async (knex: any) => {
    await knex.schema.table("ads", (table: any) => {
        table.dropForeign("user_uuid");
        table.dropForeign("category_uuid");
        table.dropForeign("community_uuid");
    });

    await knex.schema.table("ads_pictures", (table: any) => {
        table.dropForeign("ad_uuid");
    });

    await knex.schema.table("ads_messages", (table: any) => {
        table.dropForeign("ad_uuid");
        table.dropForeign("user_uuid");
    });

    await knex.schema.table("ads_messages_messages", (table: any) => {
        table.dropForeign("ad_message_uuid");
        table.dropForeign("user_uuid");
    });

    await knex.schema.dropTable("ads_categories");
    await knex.schema.dropTable("ads");
    await knex.schema.dropTable("ads_pictures");
    await knex.schema.dropTable("ads_messages");
    await knex.schema.dropTable("ads_messages_messages");
};
