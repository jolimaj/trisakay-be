exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("terms").del();
  await knex("terms").insert([
    {
      title: "Term 1",
      description:
        "Ang Tri Sakay application ay nagbibigay ng madaling paraan para sa transportasyon.",
    },
    {
      title: "Term 2",
      description:
        "Sa pamamagitan ng paggamit ng Tri Sakay application, kailangang buksan ng mga user ang lokasyon para makita nila ang real time na lokasyon.",
    },
    {
      title: "Term 3",
      description:
        "Maaaring magbago ang rate ng pamasahe sa Tri Sakay batay sa presyo ng gasolina.",
    },
    {
      title: "Term 4",
      description:
        "Ang impormasyon ng mga gumagamit ng Tri sakay ay ise-save lamang sa application.",
    },
    {
      title: "Term 5",
      description:
        "Para sa gumagamit na pasahero, tinutulungan ka ng application na maghatid ng madaling transportasyon.",
    },
    {
      title: "Term 6",
      description:
        "Para sa gumagamit na Tricycle Drivers, ang application ay maaaring makatulong sa iyo na maghanap at pumili ng pasahero, ibig sabihin, ang linya ng tricycle sa bawat terminal ay hindi pinapansin sa application na ito.",
    },
    {
      title: "Term 7",
      description:
        "Sa pamamagitan ng pag-click sa Agree sa ibaba, ipinapahiwatig mo na tinatanggap mo at nauunawaan mo ang mga tuntunin at kundisyon ng aplikasyon ng Tri Sakay",
    },
  ]);
};
