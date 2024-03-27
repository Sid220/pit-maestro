-- CreateTable
CREATE TABLE "PitList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "signed" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "match" TEXT NOT NULL,
    "checks" TEXT NOT NULL,
    "submitted_at" DATETIME
);
