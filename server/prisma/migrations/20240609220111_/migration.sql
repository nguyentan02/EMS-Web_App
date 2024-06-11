-- CreateTable
CREATE TABLE "UsageHistory" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "usage_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usage_end" TIMESTAMP(3) NOT NULL,
    "purpose" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "UsageHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsageHistory" ADD CONSTRAINT "UsageHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
