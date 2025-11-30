-- CreateTable
CREATE TABLE "Mentee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "className" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "nextSession" JSONB
);

-- CreateTable
CREATE TABLE "MenteeNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tutorId" INTEGER NOT NULL,
    "menteeId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MenteeNote_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MenteeFeedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "rating" JSONB NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MenteeFeedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Mentee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
