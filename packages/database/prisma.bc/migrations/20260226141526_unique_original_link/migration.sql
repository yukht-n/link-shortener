/*
  Warnings:

  - A unique constraint covering the columns `[originalLink]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_originalLink_key" ON "Link"("originalLink");
