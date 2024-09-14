export const cn = (styles: string, options?: Record<string, boolean>): string => {
  if (!options) return styles;

  const styleOptions = Object.entries(options).reduce(
    (acc, option) => (option[1] ? `${acc} ${option[0]}` : acc),
    ""
  );

  return `${styles} ${styleOptions}`;
};

export const loadImage = async (src: string): Promise<Event> => {
  return new Promise((res, rej) => {
    const img = document.createElement("img");

    img.src = src;

    img.addEventListener("load", res);
    img.addEventListener("error", rej);
  });
};
