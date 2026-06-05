-- CreateTable
CREATE TABLE "LandingEntry" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "content" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingSingleton" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandingSingleton_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LandingEntry_section_sortOrder_idx" ON "LandingEntry"("section", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "LandingEntry_section_key_key" ON "LandingEntry"("section", "key");

-- CreateIndex
CREATE UNIQUE INDEX "LandingSingleton_key_key" ON "LandingSingleton"("key");
