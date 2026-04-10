# School Management API

## Live URL
🚀 https://school-management-1-c709.onrender.com

> **Note:** API is hosted on Render free tier. If the first request  
> takes ~30 seconds, the server is waking up from idle. Subsequent  
> requests will be fast.

---

## Tech Stack
- **Runtime:** Node.js + Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (local) / NeonDB (production)
- **Validation:** Zod

---

## Local Setup

### Prerequisites
Make sure you have these installed:
- Node.js (v18 or above)
- PostgreSQL (if running with local DB)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/Siddarth474/school-management.git
cd school-management
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```
Then open `.env` and fill in the values:
```bash
# For local PostgreSQL (pgAdmin)
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/schooldb

# For NeonDB (cloud)
DATABASE_URL=postgresql://username:password@ep-xxxx.neon.tech/dbname?sslmode=require

PORT=3000
```

**4. Run Prisma migrations**
```bash
npx prisma migrate dev
```

**5. Start the development server**
```bash
npm run dev
```

Server runs at: `http://localhost:3000`

---

## API Endpoints

### POST `/api/school/addSchool`
Adds a new school to the database.

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi, Delhi 110003",
  "latitude": 28.55,
  "longitude": 77.25
}
```

**Success Response `201`:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi, Delhi 110003",
    "latitude": 28.55,
    "longitude": 77.25,
    "createdAt": "2026-04-11T10:00:00.000Z",
    "updatedAt": "2026-04-11T10:00:00.000Z"
  }
}
```

**Validation Error Response `422`:**
```json
{
  "success": false,
  "errors": ["Name must be at least 3 characters", "Latitude must be <= 90"]
}
```

---

### GET `/api/school/listSchools?latitude=28.63&longitude=77.21`
Returns all schools sorted by distance (nearest first) from the given coordinates.

**Query Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| latitude | number | ✅ Yes | User's latitude (-90 to 90) |
| longitude | number | ✅ Yes | User's longitude (-180 to 180) |

**Success Response `200`:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 3,
      "name": "Modern School",
      "address": "Barakhamba Road, New Delhi",
      "latitude": 28.62,
      "longitude": 77.22,
      "distance_km": 0.91
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.55,
      "longitude": 77.25,
      "distance_km": 8.94
    }
  ]
}
```

**Validation Error Response `422`:**
```json
{
  "success": false,
  "errors": ["Latitude is required"]
}
```

---

## Postman Collection

1. Import `school management.postman_collection.json`
2. Select **`School API - Production`** environment to test live URL

---

## Project Structure
```
src/
├── config/         # Database connection
├── controllers/    # Request/Response handling
├── services/       # Business logic
├── routes/         # Route definitions
├── middlewares/    # Validation & error handling
├── validators/     # Zod schemas
└── utils/          # Haversine distance formula
```