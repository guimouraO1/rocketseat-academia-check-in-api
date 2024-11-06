-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gyms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tittle" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_gyms" ("description", "id", "latitude", "longitude", "phone", "tittle") SELECT "description", "id", "latitude", "longitude", "phone", "tittle" FROM "gyms";
DROP TABLE "gyms";
ALTER TABLE "new_gyms" RENAME TO "gyms";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
