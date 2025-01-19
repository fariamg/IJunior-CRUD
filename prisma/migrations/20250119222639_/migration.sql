-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "artists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "bio" TEXT,
    "listeners" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "musics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "recordDate" DATETIME NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_ArtistToMusic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArtistToMusic_A_fkey" FOREIGN KEY ("A") REFERENCES "artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArtistToMusic_B_fkey" FOREIGN KEY ("B") REFERENCES "musics" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToMusic_AB_unique" ON "_ArtistToMusic"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToMusic_B_index" ON "_ArtistToMusic"("B");
