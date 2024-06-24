-- AddForeignKey
ALTER TABLE "UsageHistory" ADD CONSTRAINT "UsageHistory_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
