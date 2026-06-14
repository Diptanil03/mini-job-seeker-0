# Mini Job Seeker

This project is a streamlined job search application that simplifies finding relevant job opportunities. It allows users to upload their resume in PDF format, automatically extracts key skills, and then scrapes Internshala to find job listings that match those skills.

## Features

- **Resume-Based Job Matching:** Upload your CV, and the application does the rest.
- **Skill Extraction:** Intelligently parses your resume to identify your technical and soft skills.
- **Automated Job Scraping:** Uses the extracted skills to perform a targeted search on Internshala.
- **Instant Results:** Displays a clean, card-based list of relevant jobs, including company name, job title, location, and a direct link to the application page.
- **Responsive UI:** A simple and effective interface built with React and Tailwind CSS.

## Tech Stack

The project is a monorepo containing a `client` and a `server` directory.

### Client (Frontend)

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **PDF Handling:** `react-pdftotext` for text extraction from PDFs.
- **State Management/Data Fetching:** TanStack Query (`@tanstack/react-query`)
- **HTTP Client:** Axios
- **UI Components:** React Icons

### Server (Backend)

- **Framework:** Express.js
- **Runtime:** Node.js
- **Web Scraping:** Puppeteer
- **Environment:** Dotenv for environment variable management
- **CORS:** `cors` middleware to handle cross-origin requests.

## Architecture

The application follows a simple client-server architecture:

1.  **PDF Upload:** The user uploads their resume via the React frontend.
2.  **Text Extraction:** The `react-pdftotext` library extracts the raw text content from the PDF file directly in the browser.
3.  **Skill Analysis:** A utility function on the client-side analyzes the extracted text, cross-referencing it with a predefined dictionary of skills (`skills.js`) to identify the user's top skills.
4.  **API Request:** The client sends an HTTP POST request to the backend server's `/jobs` endpoint, with the list of identified skills in the request body.
5.  **Web Scraping:** The Express server receives the skills and initiates a Puppeteer instance. It constructs a search URL for Internshala and scrapes the job listings page for matching roles.
6.  **Response:** The server collects the job data (title, company, location, apply link) and sends it back to the client as a JSON response.
7.  **Display Results:** The React client receives the job data and dynamically renders it in a table/card layout for the user to view.

## Local Development Setup

To run this project on your local machine, follow these steps.

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or a similar package manager

### Backend Setup

1.  Navigate to the `server` directory:
    ```sh
    cd server
    ```
2.  Install the required dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `server` directory and add the following variables. The `FRONTEND_URL` should match the URL where your client will run.
    ```env
    PORT
    FRONTEND_URL
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:port`.

### Frontend Setup

1.  Navigate to the `client` directory in a new terminal:
    ```sh
    cd client
    ```
2.  Install the required dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `client` directory and add the backend URL:
    ```env
    VITE_BACKEND_URL
    ```
4.  Start the development client:
    ```sh
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## API Endpoint

The backend provides the following endpoint:

### `POST /jobs`

This endpoint triggers the web scraping process based on skills provided in the request body.

-   **Request Body:**
    ```json
    {
      "data": {
        "react": 5,
        "javascript": 8,
        "node": 3
      }
    }
    ```
    The keys represent the skills found in the resume, and the values (counts) are used for ranking but the server primarily uses the keys for searching.

-   **Success Response (200 OK):**
    ```json
    {
      "jobs": [
        {
          "title": "Frontend Developer Intern",
          "company": "Tech Solutions Inc.",
          "location": "Remote",
          "link": "https://internshala.com/job/details/...",
          "skillFound": ["React", "JavaScript"]
        }
      ]
    }
