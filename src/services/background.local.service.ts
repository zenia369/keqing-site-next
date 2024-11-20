const backgroundData = {
  length: 20,
  data: [
    "/static/background/20220923_185232.webp",
    "/static/background/4DDC91B7-C790-4E07-93A7-482EB4845C2C.webp",
    "/static/background/525AA720-B373-4CCC-95B8-4892D76E006A.webp",
    "/static/background/63CC4542-B8F4-43BD-8A57-C81D72271A8B.webp",
    "/static/background/75888A49-7256-4E60-981D-7566E9A31720.webp",
    "/static/background/8391A176-B684-47CD-B334-314522BE7C19.webp",
    "/static/background/85984123_p0.webp",
    "/static/background/85A5C609-35B7-4876-B706-2DDC0A4B7BE1.webp",
    "/static/background/8DC36528-87FC-47F5-922E-66FC89079A62.webp",
    "/static/background/A917966D-FE1A-4643-B8BE-2C9CA61D4A1E.webp",
    "/static/background/AB864F6D-7FDF-4BE4-BB0F-77F40A1FD690.webp",
    "/static/background/B853708F-035D-40F1-A9D8-83670D8570A8.webp",
    "/static/background/C8546258-01E2-4EC0-A389-DBDA3258CB3C.webp",
    "/static/background/CA6B3FA3-4AB5-43A0-BDD7-37B236110C5E.webp",
    "/static/background/D0162435-4056-48A7-9F0A-D01431E62EEE.webp",
    "/static/background/D8DCCD7A-88D8-46AE-9109-6BE0FC2C5C56.webp",
    "/static/background/E76F87DA-58A2-43E8-A96E-9AFE65862C31.webp",
    "/static/background/F4121976-1AD7-4924-BDF2-A4CB65C9EAAD.webp",
    "/static/background/FaSaEg6VEAA4AbJ.webp",
    "/static/background/IMG_20220827_034830_003.webp",
    "/static/background/Raiden_Genshin_Impact_Genshin_Impact_Yae_Genshin_Impact_6960844.webp",
  ],
};

export const getProfileBackground = async (): Promise<string> => {
  const randomNumber = Math.floor(Math.random() * backgroundData.length);

  return backgroundData.data[randomNumber] ?? backgroundData.data[0];
};
