-- CreateTable
CREATE TABLE "Maintenance_History" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_end" TIMESTAMP(3) NOT NULL,
    "employee_code" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Maintenance_History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Maintenance_History" ADD CONSTRAINT "Maintenance_History_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance_History" ADD CONSTRAINT "Maintenance_History_employee_code_fkey" FOREIGN KEY ("employee_code") REFERENCES "nhan_vien"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance_History" ADD CONSTRAINT "Maintenance_History_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
