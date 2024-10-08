const backgroundData = {
  length: 20,
  data: [
    "/static/background/20220923_185232.jpg",
    "/static/background/4DDC91B7-C790-4E07-93A7-482EB4845C2C.jpg",
    "/static/background/525AA720-B373-4CCC-95B8-4892D76E006A.jpg",
    "/static/background/63CC4542-B8F4-43BD-8A57-C81D72271A8B.jpg",
    "/static/background/75888A49-7256-4E60-981D-7566E9A31720.jpg",
    "/static/background/8391A176-B684-47CD-B334-314522BE7C19.jpg",
    "/static/background/85984123_p0.jpg",
    "/static/background/85A5C609-35B7-4876-B706-2DDC0A4B7BE1.jpg",
    "/static/background/8DC36528-87FC-47F5-922E-66FC89079A62.jpg",
    "/static/background/A917966D-FE1A-4643-B8BE-2C9CA61D4A1E.jpg",
    "/static/background/AB864F6D-7FDF-4BE4-BB0F-77F40A1FD690.jpg",
    "/static/background/B853708F-035D-40F1-A9D8-83670D8570A8.jpg",
    "/static/background/C8546258-01E2-4EC0-A389-DBDA3258CB3C.jpg",
    "/static/background/CA6B3FA3-4AB5-43A0-BDD7-37B236110C5E.jpg",
    "/static/background/D0162435-4056-48A7-9F0A-D01431E62EEE.jpg",
    "/static/background/D8DCCD7A-88D8-46AE-9109-6BE0FC2C5C56.jpg",
    "/static/background/E76F87DA-58A2-43E8-A96E-9AFE65862C31.jpg",
    "/static/background/F4121976-1AD7-4924-BDF2-A4CB65C9EAAD.jpg",
    "/static/background/FaSaEg6VEAA4AbJ.jpg",
    "/static/background/IMG_20220827_034830_003.jpg",
    "/static/background/Raiden_Genshin_Impact_Genshin_Impact_Yae_Genshin_Impact_6960844.jpeg",
  ],
};

export const getProfileBackground = async (): Promise<string> => {
  const randomNumber = Math.floor(Math.random() * backgroundData.length);

  return backgroundData.data[randomNumber] ?? backgroundData.data[0];
};
