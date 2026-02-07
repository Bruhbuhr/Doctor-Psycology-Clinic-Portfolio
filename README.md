# Dad's Website - Dr. Lê Quang Vy

A professional website for Dr. Lê Quang Vy's Mental Health Clinic, built with **Angular (Frontend)** and **FastAPI (Backend)**.

## 🚀 How to Run Locally

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- Git

### 1. Backend (FastAPI)

Navigate to the `backend` directory and start the server:

```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

The backend API will be available at `http://localhost:8000`.
API Documentation: `http://localhost:8000/docs`

### 2. Frontend (Angular)

Navigate to the `frontend` directory and start the development server:

```bash
cd frontend

# Install dependencies
npm install

# Run the app
npm start
```

The application will be available at `http://localhost:4200`.

---

## ☁️ Deployment Guide (Monorepo)

Since both Frontend and Backend are in the same repository, you need to configure them separately.

### 1. Frontend (Deploy to Netlify)

Netlify is perfect for the Angular frontend.

1.  **Connect to Git**: Log in to Netlify and import your repository.
2.  **Configure Build Settings**:
    Since your frontend is in a subdirectory, you must tell Netlify where to look.
    - **Base directory**: `frontend`
    - **Build command**: `npm run build`
    - **Publish directory**: `dist/frontend/browser`
3.  **Environment Variables**:
    - If your backend is deployed elsewhere, add a variable (e.g., `API_URL`) in Netlify so your frontend knows where to fetch data.

### 2. Backend (Deploy to Render / Railway)

Netlify is primarily for static sites. For a Python FastAPI backend, we recommend **Render** or **Railway** (both have free tiers).

#### Option A: Deploy to Render (Recommended)

1.  Create a [Render account](https://render.com/).
2.  Select **"New Web Service"** and connect your repo.
3.  **Configure Settings**:
    - **Root Directory**: `backend`
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4.  Copy the deployed URL (e.g., `https://my-api.onrender.com`) and update your Frontend's API service to point to this URL.

#### Option B: Deploy to Google Cloud Run

1.  Install Google Cloud CLI.
2.  Run: `gcloud run deploy --source .` inside the `backend` folder.

---

## 🔍 How to Check SEO

We use several strategies to ensure optimal SEO (Search Engine Optimization):

### 1. Meta Tags Verification

- Open the deployed website.
- Right-click and select **"View Page Source"**.
- Check for the following tags in the `<head>` section:
  - `<title>`: Should be descriptive (e.g., "Bác sĩ Lê Quang Vy - Chuyên Khoa Tâm Thần").
  - `<meta name="description">`: A concise summary of services.
  - `<meta property="og:title">`: Open Graph title for social sharing.
  - `<meta property="og:image">`: Image for social sharing.

### 2. Lighthouse Audit (Chrome DevTools)

Google Lighthouse provides a comprehensive SEO score.

1. Open the website in **Google Chrome**.
2. Press `F12` to open DevTools.
3. Go to the **"Lighthouse"** tab.
4. Select **"SEO"** (and "Performance", "Accessibility" if desired).
5. Click **"Analyze page load"**.
6. Review the score and follow recommendations (e.g., adding `alt` text to images, ensuring mobile responsiveness).

### 3. Structured Data (Schema.org)

We implement JSON-LD for rich snippets (Doctor & MedicalClinic schema).

- Use the [Google Rich Results Test](https://search.google.com/test/rich-results).
- Paste your website URL.
- Verify that **"MedicalClinic"** or **"Physician"** structure is detected without errors.
