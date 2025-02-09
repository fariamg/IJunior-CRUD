/*
  Warnings:

  - You are about to drop the `_PlaylistToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `playlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_PlaylistToUser_B_index";

-- DropIndex
DROP INDEX "_PlaylistToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PlaylistToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_PlaylistCollaborators" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PlaylistCollaborators_A_fkey" FOREIGN KEY ("A") REFERENCES "playlists" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PlaylistCollaborators_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_playlists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "playlists_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_playlists" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "playlists";
DROP TABLE "playlists";
ALTER TABLE "new_playlists" RENAME TO "playlists";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistCollaborators_AB_unique" ON "_PlaylistCollaborators"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistCollaborators_B_index" ON "_PlaylistCollaborators"("B");
