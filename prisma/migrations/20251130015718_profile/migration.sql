-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "faculty" TEXT,
    "phone" TEXT,
    "major" TEXT,
    "class" TEXT,
    "supportNeeds" TEXT,
    "expertise" TEXT,
    "rating" REAL DEFAULT 0,
    "skills" JSONB,
    "avail" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
