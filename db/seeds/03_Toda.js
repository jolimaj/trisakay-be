exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("toda").del();
  await knex("toda").insert([
    { code: "ANTODA", name: "Antipolo" },
    { code: "BALUBALTODA", name: "Balubal" },
    {
      code: "BANAHAW TODA",
      name: "Concepcion Banahaw, Concepcion Pinag bakuran",
    },
    { code: "BUCALTALAAN TODA", name: "Bucal Talaan" },
    { code: "BUCALIMBON TODA", name: "Bucal at Limbon" },
    { code: "CASTODA", name: "Castañas" },
    { code: "CANDATODA", name: "Canda" },
    { code: "HOLYFAMILY TODA", name: "Holy Family Subd." },
    { code: "MOROTODA", name: "Morong" },
    { code: "MATODA", name: "Mamala 1" },
    { code: "MATODA", name: "Mamala 2" },
    { code: "PALASAN TODA", name: "Palasan" },
    { code: "PILTODA", name: "Pili" },
    { code: "POB1 TODA", name: "Poblacion UNO" },
    { code: "POB2 TODA", name: "Poblacion DOS" },
    { code: "POB3 TODA", name: "Poblacion TRES" },
    { code: "POB5 TODA", name: "Poblacion SINGKO" },
    { code: "POB6 TODA", name: "Poblacion SAIS" },
    { code: "SAMBAT TODA", name: "STO. CRISTO, LUTUCAN" },
    { code: "TALTODA", name: "Talaan" },
    { code: "TUM1TODA", name: "Tumbaga UNO" },
    { code: "TUM2TODA", name: "Tumbaga DOS" },
  ]);
};
