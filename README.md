# ⚙️ Iron Jiu Jitsu - Backend API

> **Status:** 🟢 Production Ready  
> **Architecture:** RESTful API / Microservices-oriented  
> **Tech:** Node.js, TypeScript, MongoDB

This is the server-side engine powering the **Iron Jiu Jitsu Management System**. It handles complex business logic, secure authentication, and automated communication workflows to digitize gym operations.

## 🚀 Technical Core

### 1. Automated Messaging Engine (Meta API)
The standout feature of this backend is the **automated notification service**. 
* **Integration:** Direct integration with the **Meta Graph API** via Axios.
* **Logic:** A custom-built service (`whatsapp.service.ts`) maps internal database events to official WhatsApp templates (`7_DAYS`, `3_DAYS`, `EXPIRED`).
* **Dynamic Content:** Handles personalized body parameters to ensure high engagement and clear communication with athletes.

### 2. Intelligent Cron Jobs
To eliminate manual monitoring and administrative overhead, the server runs a **daily automated scheduler**:
* **Expiration Scanner:** Every 24 hours, a cron job scans the MongoDB collection to identify athletes with upcoming or expired subscriptions.
* **Proactive Engagement:** Automatically triggers the WhatsApp Service for targeted reminders based on the proximity to the expiration date, improving retention and payment speed.

### 3. Security & Data Integrity
* **Authentication:** Secured with **JWT (JSON Web Tokens)** for stateless and secure user sessions.
* **Middleware Protection:** Custom middleware layers handle **CORS** and enforce strict data access policies, ensuring that sensitive athlete data (medical certificates, insurance) is protected and only accessible via authorized requests.
* **Environment Management:** Full separation of secrets (API Keys, Tokens, Database URIs) using a robust `.env` architecture for production security.

## 🛠 Tech Stack
* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Communication:** Meta Graph API (WhatsApp Business)
* **HTTP Client:** Axios

## 🔗 Project Ecosystem
This backend serves the **Iron Jiu Jitsu Frontend**.
* **Frontend Repository:** https://github.com/nes-pisati/ironjiujitsu-consoleweb/tree/main

## 👤 Author
**Vanessa Pisati** - Junior Frontend Developer
* LinkedIn: https://www.linkedin.com/in/nes-pisati
