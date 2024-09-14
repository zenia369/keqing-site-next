-- CreateEnum
CREATE TYPE "KqsElementalTypes" AS ENUM ('Electro');

-- CreateTable
CREATE TABLE "KqsPassword" (
    "hash" TEXT NOT NULL,
    "profileId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "KqsProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "card" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "element" "KqsElementalTypes" NOT NULL,

    CONSTRAINT "KqsProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsStandCharacter" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "element" "KqsElementalTypes" NOT NULL,

    CONSTRAINT "KqsStandCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "photoId" TEXT NOT NULL,

    CONSTRAINT "KqsFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsUser" (
    "id" TEXT NOT NULL,

    CONSTRAINT "KqsUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsResource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "KqsResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsCharacterVideo" (
    "id" TEXT NOT NULL,
    "characterId" TEXT,
    "path" TEXT NOT NULL,

    CONSTRAINT "KqsCharacterVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsCharacterPhoto" (
    "id" TEXT NOT NULL,
    "characterId" TEXT,
    "path" TEXT NOT NULL,

    CONSTRAINT "KqsCharacterPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsCharacter" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "previewName" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "KqsCharacter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsPicturePhoto" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "KqsPicturePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsPictureFilter" (
    "id" TEXT NOT NULL,
    "picturePhotoId" TEXT,
    "name" TEXT NOT NULL,
    "values" TEXT[],

    CONSTRAINT "KqsPictureFilter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsPassword_profileId_key" ON "KqsPassword"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "KqsProfile_userId_key" ON "KqsProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KqsProfile_email_key" ON "KqsProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KqsResource_name_key" ON "KqsResource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "KqsCharacter_slug_key" ON "KqsCharacter"("slug");

-- AddForeignKey
ALTER TABLE "KqsPassword" ADD CONSTRAINT "KqsPassword_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "KqsProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KqsProfile" ADD CONSTRAINT "KqsProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KqsStandCharacter" ADD CONSTRAINT "KqsStandCharacter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KqsFavorite" ADD CONSTRAINT "KqsFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KqsCharacterVideo" ADD CONSTRAINT "KqsCharacterVideo_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "KqsCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KqsCharacterPhoto" ADD CONSTRAINT "KqsCharacterPhoto_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "KqsCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KqsCharacter" ADD CONSTRAINT "KqsCharacter_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "KqsResource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KqsPictureFilter" ADD CONSTRAINT "KqsPictureFilter_picturePhotoId_fkey" FOREIGN KEY ("picturePhotoId") REFERENCES "KqsPicturePhoto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
