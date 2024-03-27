-- CreateTable
CREATE TABLE "PitList" (
    "id" SERIAL NOT NULL,
    "signed" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "match" TEXT NOT NULL,
    "checks" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3),

    CONSTRAINT "PitList_pkey" PRIMARY KEY ("id")
);
