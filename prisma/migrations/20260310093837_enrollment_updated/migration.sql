-- DropForeignKey
ALTER TABLE "Enrollement" DROP CONSTRAINT "Enrollement_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Enrollement" ADD CONSTRAINT "Enrollement_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
