-- CreateTable
CREATE TABLE "TutorWorkload" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tutorRefId" INTEGER NOT NULL,
    "tutorName" TEXT NOT NULL,
    "tutorEmail" TEXT NOT NULL,
    "tutorRole" TEXT NOT NULL,
    "tutorMajor" TEXT NOT NULL,
    "tutorRating" REAL NOT NULL,
    "totalMentees" INTEGER NOT NULL,
    "maxMentees" INTEGER NOT NULL,
    "totalSessions" INTEGER NOT NULL,
    "completedSessions" INTEGER NOT NULL,
    "totalHours" INTEGER NOT NULL,
    "avgCompletionRate" REAL NOT NULL
);
