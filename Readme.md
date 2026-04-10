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
    "statusCode": 201,
    "data": {
        "id": 2,
        "name": "Kendriya Vidyalaya No.1",
        "address": "Pusa Road, New Delhi, Delhi 110012",
        "latitude": 27.6378,
        "longitude": 77.1752,
        "createdAt": "2026-04-10T21:35:08.794Z",
        "updatedAt": "2026-04-10T21:35:08.794Z"
    },
    "message": "School added successfully",
    "success": true
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
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "name": "Springdales School",
            "address": "Pusa Road, New Delhi, Delhi 110012",
            "latitude": 28.6378,
            "longitude": 77.1752,
            "createdAt": "2026-04-10T13:47:43.727Z",
            "updatedAt": "2026-04-10T13:47:43.727Z",
            "distance_km": 4.11
        },
        {
            "id": 2,
            "name": "Kendriya Vidyalaya No.1",
            "address": "Pusa Road, New Delhi, Delhi 110012",
            "latitude": 27.6378,
            "longitude": 77.1752,
            "createdAt": "2026-04-10T21:35:08.794Z",
            "updatedAt": "2026-04-10T21:35:08.794Z",
            "distance_km": 110.57
        }
    ],
    "message": "Schools fetched successfully",
    "success": true
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

1. Import `postman/school-management.postman_collection.json`
2. Import `postman/school-management.postman_environment.json`
3. Select **`School API - Production`** environment to test live URL
4. Select **`School API - Local`** environment to test locally

---

## Project Structure
```
src/
├── controllers/    # Request/Response handling
├── services/       # Business logic
├── routes/         # Route definitions
├── middlewares/    # Validation & error handling
├── validators/     # Zod schemas
└── utils/          # Haversine distance formula
```