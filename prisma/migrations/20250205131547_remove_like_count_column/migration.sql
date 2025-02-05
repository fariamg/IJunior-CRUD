/*
  Warnings:

  - You are about to drop the column `like_count` on the `musics` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_musics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "recordDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "play_count" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_musics" ("createdAt", "duration", "id", "name", "play_count", "recordDate") SELECT "createdAt", "duration", "id", "name", "play_count", "recordDate" FROM "musics";
DROP TABLE "musics";
ALTER TABLE "new_musics" RENAME TO "musics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
