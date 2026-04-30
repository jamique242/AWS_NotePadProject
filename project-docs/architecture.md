## Overview
This document outlines the design and implementation of a production ready, serverless web app that supports lightweight multi user collaboration. The system is built entirely from first principles, with each layer clearly defined, avoiding third party builds. In order to emphasize core build patterns, techniques and integration.

The primary objective is to keep things minimal and easy to follow, avoiding unnecessary complexity. There are no heavy frameworks, just a clean MVP that demonstrates how a real-world cloud application can be designed, built, and potentially upgraded.

## Architecture 🏛️
                🌐 User (Browser)
                        │
                        ▼
              ☁️ CloudFront (CDN)
                        │
                        ▼
              🪣 S3 (Static Frontend)
                        │
                        ▼
        ────── ** API Requests (HTTPS) ** ──────

                 🚪 API Gateway
                        │
                        ▼
               ⚙️ Lambda Functions
                        │
                        ▼
             🗄️ DynamoDB (Notes Table)
             
The application follows a serverless architecture:
- Frontend served via S3 and CloudFront
- API layer handled by API Gateway
- Application logic executed in Lambda functions
- Data persisted in DynamoDB

## Tech Stack 🧰
- **Frontend**: HTML, CSS, JavaScript
- **Hosting**: Amazon S3, CloudFront
- **API**: API Gateway
- **Compute**: AWS Lambda
- **Database**: DynamoDB
- **Infrastructure**: AWS SAM

## Data Flow 🔁
1. User accesses the frontend via CloudFront
2. Frontend sends API requests to API Gateway
3. API Gateway routes requests to Lambda functions
4. Lambda interacts with DynamoDB
5. Response is returned to the frontend

## API 💼
POST   /notes
GET    /notes
PUT    /notes/{id}

## Data Model 🧱
note_id **(PK)**
content
created_at
updated_at

## Design Decisions 🧐
- Serverless design was chosen for scalability and low operational overhead ~$2pm 
- DynamoDB selected for simplicity and performance
- MVP scope limited to core CRUD (CREATE, READ, UPDATE, DELETE) operations
