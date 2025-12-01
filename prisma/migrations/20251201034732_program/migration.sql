-- CreateTable
CREATE TABLE "AcademicTutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "avail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AcademicProgram" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "enrolledCount" INTEGER NOT NULL DEFAULT 0,
    "availableSlots" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "AcademicRegistration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "tutorId" INTEGER,
    "status" TEXT NOT NULL,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programId" INTEGER NOT NULL,
    CONSTRAINT "AcademicRegistration_programId_fkey" FOREIGN KEY ("programId") REFERENCES "AcademicProgram" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AcademicProgramToAcademicTutor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AcademicProgramToAcademicTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "AcademicProgram" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AcademicProgramToAcademicTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "AcademicTutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AcademicProgramToAcademicTutor_AB_unique" ON "_AcademicProgramToAcademicTutor"("A", "B");

-- CreateIndex
CREATE INDEX "_AcademicProgramToAcademicTutor_B_index" ON "_AcademicProgramToAcademicTutor"("B");
