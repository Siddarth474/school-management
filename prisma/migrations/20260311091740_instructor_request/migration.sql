-- CreateTable
CREATE TABLE "InstructorRequest" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstructorRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InstructorRequest" ADD CONSTRAINT "InstructorRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
