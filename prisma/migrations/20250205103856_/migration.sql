-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" CHAR(30) NOT NULL,
    "firstName" CHAR(20),
    "lastName" CHAR(30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User" USING HASH ("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "User_firstName_lastName_idx" ON "User"("firstName", "lastName");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- CreateIndex
CREATE INDEX "User_isEmailVerified_idx" ON "User"("isEmailVerified");

-- CreateIndex
CREATE INDEX "User_isActive_isEmailVerified_idx" ON "User"("isActive", "isEmailVerified");

-- CreateIndex
CREATE INDEX "User_isActive_isEmailVerified_email_idx" ON "User"("isActive", "isEmailVerified", "email");
