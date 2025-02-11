-- CreateTable
CREATE TABLE "_UserListenedMusics" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserListenedMusics_A_fkey" FOREIGN KEY ("A") REFERENCES "musics" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserListenedMusics_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserListenedMusics_AB_unique" ON "_UserListenedMusics"("A", "B");

-- CreateIndex
CREATE INDEX "_UserListenedMusics_B_index" ON "_UserListenedMusics"("B");
