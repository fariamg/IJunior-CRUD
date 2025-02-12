/*
  Warnings:

  - You are about to drop the column `expirationTime` on the `forgot_passwords` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `forgot_passwords` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_forgot_passwords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "forgot_passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_forgot_passwords" ("createdAt", "id", "token", "updatedAt", "userId") SELECT "createdAt", "id", "token", "updatedAt", "userId" FROM "forgot_passwords";
DROP TABLE "forgot_passwords";
ALTER TABLE "new_forgot_passwords" RENAME TO "forgot_passwords";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
