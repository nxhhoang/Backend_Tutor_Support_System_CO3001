-- CreateTable
CREATE TABLE "ReportSummary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester" TEXT NOT NULL,
    "totalTutors" INTEGER NOT NULL,
    "totalStudents" INTEGER NOT NULL,
    "totalSessions" INTEGER NOT NULL,
    "avgFeedbackScore" REAL NOT NULL,
    "completionRate" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "DetailedReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "programId" INTEGER NOT NULL,
    "programTitle" TEXT NOT NULL,
    "programDesc" TEXT NOT NULL,
    "programCategory" TEXT NOT NULL,
    "programCapacity" INTEGER NOT NULL,
    "programEnrolled" INTEGER NOT NULL,
    "programSlots" INTEGER NOT NULL,
    "programStatus" TEXT NOT NULL,
    "tutorCount" INTEGER NOT NULL,
    "menteeCount" INTEGER NOT NULL,
    "avgScore" REAL NOT NULL,
    "completedSessions" INTEGER NOT NULL,
    "ongoingSessions" INTEGER NOT NULL
);
