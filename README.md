# 🛍️ Stripe Ecommerce

> Full-stack e-commerce application built with the MERN stack, featuring secure authentication, product management, image uploads, Google OAuth, shopping cart functionality and Stripe-powered payments.

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-000000?style=for-the-badge)](#)
[![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](#)
[![Backend](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)](#)
[![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)](#)
[![Payments](https://img.shields.io/badge/Payments-Stripe-635BFF?style=for-the-badge\&logo=stripe\&logoColor=white)](#)

</div>

---

## 🎬 Demo

A complete walkthrough of the application, from browsing products to authentication and checkout.

<!-- Replace this with your GitHub video asset after uploading it -->

[https://github.com/user-attachments/assets/YOUR-VIDEO-ID](https://github.com/user-attachments/assets/77819619-dc99-45d0-87e3-fca2461b0264)

---

## ✨ Overview

**Stripe Ecommerce** is a full-stack e-commerce platform designed to simulate a modern online store from both the customer's and administrator's perspective.

The project was built to go beyond a simple CRUD application by implementing real-world features such as:

* 🔐 Authentication with JWT
* 🔑 Google OAuth 2.0
* 🛒 Shopping cart
* 💳 Stripe checkout and payments
* 📦 Product management
* 🖼️ Cloudinary image uploads
* 🛡️ Password hashing with bcrypt
* ✅ Request validation with Zod
* 🍪 HTTP-only cookie authentication
* 📱 Responsive interface
* 🔄 Client/server communication through REST APIs

The goal of the project was to understand how a complete e-commerce application is structured, how the frontend communicates with the backend, and how external services such as Stripe, Google and Cloudinary can be integrated into a production-style application.

---

## 🖥️ Preview

<p align="center">
  <img src="./screenshots/home.png" width="48%" />
  <img src="./screenshots/products.png" width="48%" />
</p>

<p align="center">
  <img src="./screenshots/product-details.png" width="48%" />
  <img src="./screenshots/cart.png" width="48%" />
</p>

---

## 🚀 Features

### 👤 Authentication

The application provides a complete authentication system.

* User registration
* User login
* Secure password hashing
* JWT authentication
* HTTP-only cookies
* Authentication middleware
* Protected routes
* Google OAuth 2.0
* Logout functionality

---

### 🛍️ Product Management

Products are managed through the backend API and stored in MongoDB.

Each product can contain:

* Name
* Description
* Price
* Category
* Images
* Stock
* Product metadata

Images are uploaded and stored using **Cloudinary**.

---

### 🛒 Shopping Cart

Users can manage their shopping cart directly from the application.

Supported functionality includes:

* Add products
* Remove products
* Update quantities
* Calculate totals
* Persist cart information
* Continue to checkout

---

### 💳 Stripe Payments

The application integrates **Stripe Checkout** to process payments securely.

The general flow is:

```text
User
 │
 ▼
Frontend
 │
 │ Create checkout request
 ▼
Backend
 │
 │ Stripe API
 ▼
Stripe Checkout
 │
 ▼
Payment
 │
 ▼
Success / Cancel
```

Stripe handles the sensitive payment information, meaning the application does not directly process or store card details.

---

### 🔐 Google OAuth

Users can authenticate using their Google account.

```text
User
  │
  ▼
Google OAuth
  │
  ▼
Backend
  │
  ├── Existing user → Login
  │
  └── New user → Create account
```

---

### 🖼️ Image Uploads

Product images are handled through **Cloudinary**.

The upload flow is:

```text
Admin
  │
  ▼
Frontend
  │
  ▼
Backend
  │
  ▼
Cloudinary
  │
  ▼
Image URL
  │
  ▼
MongoDB
```

MongoDB stores the image reference rather than the actual image file.

---

## 🧰 Tech Stack

### Frontend

| Technology      | Purpose                   |
| --------------- | ------------------------- |
| React           | User interface            |
| Vite            | Development/build tooling |
| Tailwind CSS    | Styling                   |
| React Router    | Client-side routing       |
| React Hook Form | Form management           |
| Swiper          | Interactive UI components |
| React Icons     | Icons                     |

### Backend

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | JavaScript runtime    |
| Express    | REST API              |
| MongoDB    | Database              |
| Mongoose   | MongoDB ODM           |
| Zod        | Request validation    |
| JWT        | Authentication        |
| bcryptjs   | Password hashing      |
| Multer     | File handling         |
| CORS       | Cross-origin requests |

### External Services

| Service       | Purpose               |
| ------------- | --------------------- |
| Stripe        | Payment processing    |
| Cloudinary    | Image storage         |
| Google OAuth  | Social authentication |
| MongoDB Atlas | Cloud database        |
| Vercel        | Frontend deployment   |
| Railway       | Backend deployment    |

---

## 🏗️ Architecture

The project follows a separated frontend/backend architecture.

```text
                    ┌─────────────────┐
                    │     Client      │
                    │     React       │
                    └────────┬────────┘
                             │
                             │ HTTP / REST
                             ▼
                    ┌─────────────────┐
                    │     Backend     │
                    │     Express     │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ MongoDB  │   │ Cloudinary│   │  Stripe  │
        └──────────┘   └──────────┘   └──────────┘
              │
              ▼
        Persistent Data
```

The frontend is responsible for the user experience and application state, while the backend handles business logic, authentication, database operations and communication with external services.

---

## 📂 Project Structure

```text
Stripe-Ecommerce/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

> The exact structure may vary depending on the current version of the project.

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/XantBuildd/Stripe-Ecommerce.git

cd Stripe-Ecommerce
```

---

## 2. Install dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

---

## 3. Configure environment variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

For the frontend, create the required environment variables according to the current Vite configuration.

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

> Never commit your `.env` files or expose private API keys.

---

## 4. Start the backend

```bash
cd server
npm run dev
```

The API will run locally on:

```text
http://localhost:5000
```

---

## 5. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

The project requires several external services.

### MongoDB

Used as the primary database for users, products and other application data.

### Stripe

Used to create and process checkout sessions.

### Cloudinary

Used to store and serve product images.

### Google

Used for OAuth authentication.

---

# 🔄 Authentication Flow

Authentication is handled through JWT-based sessions.

```text
Register / Login
       │
       ▼
   Validate data
       │
       ▼
  Verify credentials
       │
       ▼
 Generate JWT
       │
       ▼
 HTTP-only Cookie
       │
       ▼
Authenticated requests
```

Protected backend routes verify the user's authentication before allowing access to restricted resources.

---

# 💳 Payment Flow

The Stripe integration follows a server-controlled checkout flow.

```text
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ Checkout
       ▼
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │
       │ POST /checkout
       ▼
┌─────────────┐
│   Backend   │
└──────┬──────┘
       │
       │ Create Stripe Session
       ▼
┌─────────────┐
│   Stripe    │
└──────┬──────┘
       │
       ▼
 Checkout Page
       │
       ▼
 Payment
       │
       ├──────────────► Success
       │
       └──────────────► Cancel
```

---

# 🧪 Testing

Testing and additional validation are part of the project's improvement roadmap.

Future testing coverage includes:

* Authentication
* Product endpoints
* Cart functionality
* Stripe checkout
* Protected routes
* Form validation
* Error handling

---

# 🚀 Deployment

The application can be deployed using separate frontend and backend services.

### Frontend

Recommended deployment:

**Vercel**

### Backend

Recommended deployment:

**Railway**

### Database

**MongoDB Atlas**

### Storage

**Cloudinary**

### Payments

**Stripe**

---

# 📈 What I Learned

This project helped me strengthen my understanding of full-stack development by working with a complete application rather than isolated technologies.

Some of the main concepts explored were:

* Designing REST APIs
* Structuring an Express backend
* MongoDB data modeling
* Authentication with JWT
* Secure password handling
* OAuth 2.0
* HTTP-only cookies
* API validation with Zod
* File uploads
* Cloudinary integration
* Stripe payment integration
* Frontend/backend communication
* Protected routes
* Environment configuration
* Deployment of full-stack applications

More importantly, the project helped me understand how these technologies work together as a single system.

---

# 🗺️ Roadmap

The project can continue evolving with features such as:

* [ ] Admin dashboard
* [ ] Order history
* [ ] Order management
* [ ] Product reviews
* [ ] Wishlist
* [ ] Advanced product filtering
* [ ] Pagination
* [ ] Email notifications
* [ ] Automated testing
* [ ] Improved error handling
* [ ] Performance optimization
* [ ] CI/CD pipeline
* [ ] Better accessibility
* [ ] More comprehensive documentation

---

# 📸 More Screenshots

Additional screenshots can be added here as the interface evolves.

```text
screenshots/
├── home.png
├── products.png
├── product-details.png
├── authentication.png
├── cart.png
└── checkout.png
```

---

# 📌 Project Status

🟢 **Active / Completed**

The core e-commerce functionality is implemented, including authentication, product management, shopping cart functionality and Stripe integration.

The project is still open to improvements in testing, UX, performance and additional e-commerce functionality.

---

# 👨‍💻 Author

**Nicolas**

Computer Systems Engineering Student
Full-Stack / Web Development

### Connect with me

* GitHub: [@XantBuildd](https://github.com/XantBuildd)
* LinkedIn: [XantB-Nicolas](www.linkedin.com/in/xantb-nicolas)

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐.

It helps support the project and motivates further development.

---

<div align="center">

### Built with React, Node.js, MongoDB and Stripe.

⭐ **Thanks for checking out the project!**

</div>
