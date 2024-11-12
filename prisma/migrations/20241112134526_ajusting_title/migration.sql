/*
  Warnings:

  - You are about to drop the column `tittle` on the `gyms` table. All the data in the column will be lost.
  - Added the required column `title` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gyms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_gyms" ("created_at", "description", "id", "latitude", "longitude", "phone") SELECT "created_at", "description", "id", "latitude", "longitude", "phone" FROM "gyms";
DROP TABLE "gyms";
ALTER TABLE "new_gyms" RENAME TO "gyms";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
