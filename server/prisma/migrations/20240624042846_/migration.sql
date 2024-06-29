-- CreateTable
CREATE TABLE "nhan_vien" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "employee_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "Date_Start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nhan_vien_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nhan_vien_employee_code_key" ON "nhan_vien"("employee_code");
