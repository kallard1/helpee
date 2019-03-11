export let up = async (knex: any) => {
  await knex.schema.alterTable("users", (table: any) => {
    table.unique("email");
  });
};

export let down = async (knex: any) => {
  await knex.schema.table("users", (table: any) => {
    table.dropUnique("email");
  });
};
