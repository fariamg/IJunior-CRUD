/*
  Warnings:

  - You are about to drop the `_MusicToPlaylist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlaylistCollaborators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `playlists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `countryId` on the `artists` table. All the data in the column will be lost.
  - You are about to drop the column `like_count` on the `musics` table. All the data in the column will be lost.
  - You are about to drop the column `play_count` on the `musics` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_MusicToPlaylist_B_index";

-- DropIndex
DROP INDEX "_MusicToPlaylist_AB_unique";

-- DropIndex
DROP INDEX "_PlaylistCollaborators_B_index";

-- DropIndex
DROP INDEX "_PlaylistCollaborators_AB_unique";

-- DropIndex
DROP INDEX "countries_name_key";

-- DropIndex
DROP INDEX "likes_userId_musicId_key";

-- DropIndex
DROP INDEX "payments_status_idx";

-- DropIndex
DROP INDEX "payments_subscriptionId_key";

-- DropIndex
DROP INDEX "subscriptions_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MusicToPlaylist";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlaylistCollaborators";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "likes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "payments";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "playlists";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "subscriptions";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "new_artists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "bio" TEXT,
    "listeners" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "countryId" INTEGER NOT NULL,
    CONSTRAINT "new_artists_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_artists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "bio" TEXT,
    "listeners" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_artists" ("bio", "createdAt", "id", "listeners", "name", "photo") SELECT "bio", "createdAt", "id", "listeners", "name", "photo" FROM "artists";
DROP TABLE "artists";
ALTER TABLE "new_artists" RENAME TO "artists";
CREATE TABLE "new_musics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "recordDate" DATETIME NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_musics" ("createdAt", "duration", "id", "name", "recordDate") SELECT "createdAt", "duration", "id", "name", "recordDate" FROM "musics";
DROP TABLE "musics";
ALTER TABLE "new_musics" RENAME TO "musics";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_users" ("createdAt", "email", "fullName", "id", "isActive", "password", "photo", "role", "updatedAt") SELECT "createdAt", "email", "fullName", "id", "isActive", "password", "photo", "role", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
