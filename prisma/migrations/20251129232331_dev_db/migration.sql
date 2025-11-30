-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL,
    "author" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "keywords" JSONB
);
