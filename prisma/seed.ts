import { KqsElementalTypes, PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";

import { createRandomUserStandCharacter } from "@/services/user.service";

async function loadModule(path: string): Promise<any> {
  return import(path);
}

const prisma = new PrismaClient();

async function seedToDevelopment() {
  const characters = await loadModule("../data/characters.json");
  const pictures = await loadModule("../data/pictures.json");
  const standCharacters = await loadModule("../data/standCharacters.json");
  const users = await loadModule("../data/users.json");

  for await (const character of characters) {
    await prisma.kqsCharacter.upsert({
      where: {
        slug: character.slug,
      },
      update: {},
      create: {
        description: character.description,
        name: character.name,
        photo: character.photo,
        previewPhoto: character.previewPhoto,
        previewName: character.previewName,
        slug: character.slug,
        videos: {
          create: character.videos.map((path: string) => ({ path })),
        },
        photos: {
          create: character.images.map((image: { smallImage: string; bigImage: string }) => ({
            small: image.smallImage,
            default: image.bigImage,
          })),
        },
        resource: {
          connectOrCreate: {
            where: {
              name: character.resource.name,
            },
            create: {
              name: character.resource.name,
              link: character.resource.link,
              photo: character.resource.photo,
            },
          },
        },
      },
    });
  }

  for await (const character of standCharacters) {
    await prisma.kqsStandCharacters.upsert({
      where: {
        name: character.name,
      },
      update: {
        name: character.name,
        background: character.background,
        element: character.element as KqsElementalTypes,
        images: {
          update: character.images,
        },
      },
      create: {
        name: character.name,
        background: character.background,
        element: character.element as KqsElementalTypes,
        images: {
          create: character.images,
        },
      },
    });
  }

  for await (const filter of pictures.filteres) {
    for await (const filterItems of filter.items) {
      await prisma.kqsPictureFilter.upsert({
        where: {
          value: filterItems,
        },
        update: {},
        create: {
          value: filterItems,
          pictureLabel: {
            connectOrCreate: {
              where: {
                value: filter.name,
              },
              create: {
                value: filter.name,
              },
            },
          },
        },
      });
    }
  }

  await prisma.kqsPicturePhoto.deleteMany({});
  for await (const photo of pictures.photos) {
    const { id: photoId } = await prisma.kqsPicturePhoto.create({
      data: {
        path: photo.path,
      },
    });

    for await (const filter of [...photo.regions, ...photo.labes]) {
      await prisma.kqsPicturePhoto.update({
        where: {
          id: photoId,
        },
        data: {
          filters: {
            connectOrCreate: {
              where: {
                value: filter,
              },
              create: {
                value: filter,
              },
            },
          },
        },
      });
    }
  }

  const userStandCharacters = await createRandomUserStandCharacter();

  await prisma.kqsUser.deleteMany();
  for await (const user of users) {
    await prisma.kqsUser.create({
      data: {
        profile: {
          create: {
            name: user.name,
            avatar: user.avatar,
            background: user.background,
            city: user.city,
            element: KqsElementalTypes.Electro,
          },
        },
        stand: {
          connect: userStandCharacters.map(({ id }) => ({ id })),
        },
        identity: {
          create: {
            email: user.email,
            identityId: user.identityId,
          },
        },
      },
    });
  }
}

async function seedToProduction() {}

invariant(process.env?.DB_MODE, "Env DB_MODE should be provided");

const isDevMode = process.env?.DB_MODE !== "production";
const runSeed = isDevMode ? seedToDevelopment : seedToProduction;

runSeed()
  .then(() => {
    console.log(`Database has been seeded. 🌱`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
