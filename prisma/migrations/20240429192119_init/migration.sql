-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "text" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
