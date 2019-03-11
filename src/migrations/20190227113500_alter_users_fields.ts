export let up = async (knex: any) => {
  await knex.schema.alterTable("users", (table: any) => {
    table.string("role", 25).alter();
  });
};

export let down = async (knex: any) => {
  await knex.schema.table("users", (table: any) => {
    table.json("role").alter();
  });
};
