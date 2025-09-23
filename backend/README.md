# TheWizarDs Backend API

A comprehensive Node.js backend for TheWizarDs cybersecurity and software development website, featuring contact management, portfolio showcase, and admin functionality.

## 🚀 Features

- **Contact Management**: Form submissions with validation and email notifications
- **Portfolio Management**: CRUD operations for project showcase
- **Services API**: Dynamic service listings with categorization
- **Admin Dashboard**: Authentication and management interface
- **Security**: JWT authentication, rate limiting, input validation
- **File Upload**: Cloudinary integration for image management
- **Email Service**: Automated notifications with professional templates

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)
- Email service (Gmail, SendGrid, etc.)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TheWizarDs/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see Environment Variables section)

5. **Start the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/thewizards
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/thewizards

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@thewizards.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Frontend URLs
FRONTEND_URL=http://localhost:3000
FRONTEND_URL_PROD=https://yourdomain.com

# Admin Credentials (Change in production!)
ADMIN_EMAIL=admin@thewizards.com
ADMIN_PASSWORD=admin123
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

### Authentication
Most admin endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Health Check
```http
GET /health
```

#### Contact Management
```http
POST /contact                    # Submit contact form
GET /admin/contacts             # Get all contacts (Admin)
PUT /admin/contacts/:id         # Update contact (Admin)
DELETE /admin/contacts/:id      # Delete contact (Admin)
```

#### Portfolio Management
```http
GET /portfolio                  # Get public portfolio
GET /portfolio/:id              # Get single project
GET /portfolio/featured         # Get featured projects
POST /portfolio                 # Create project (Admin)
PUT /portfolio/:id              # Update project (Admin)
DELETE /portfolio/:id           # Delete project (Admin)
POST /portfolio/:id/upload      # Upload project image (Admin)
```

#### Services
```http
GET /services                   # Get all services
GET /services/:id               # Get single service
GET /services/popular/list      # Get popular services
```

#### Admin
```http
POST /admin/login               # Admin login
GET /admin/dashboard            # Dashboard data (Admin)
GET /admin/stats                # Statistics (Admin)
GET /admin/portfolio            # Admin portfolio view (Admin)
```

### Request/Response Examples

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "serviceType": "web-development",
  "message": "I need a new website for my business.",
  "source": "website_contact_form"
}
```

#### Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@thewizards.com",
  "password": "admin123"
}
```

## 🗂️ Project Structure

```
backend/
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── Contact.js           # Contact form model
│   └── Portfolio.js         # Portfolio project model
├── routes/
│   ├── admin.js             # Admin routes
│   ├── contact.js           # Contact form routes
│   ├── portfolio.js         # Portfolio routes
│   └── services.js          # Services routes
├── utils/
│   ├── cloudinaryService.js # Image upload service
│   └── emailService.js      # Email notification service
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── server.js                # Main server file
└── README.md                # This file
```

## 🔒 Security Features

- **JWT Authentication**: Secure admin access
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Input Validation**: Sanitizes and validates all inputs
- **CORS Protection**: Configurable cross-origin requests
- **Helmet Security**: Sets various HTTP headers
- **Password Hashing**: Secure password storage (when using database auth)

## 📧 Email Templates

The system includes professional HTML email templates for:
- Contact form notifications to admin
- Contact confirmation to users
- Portfolio update notifications

## 🖼️ Image Management

Cloudinary integration provides:
- Automatic image optimization
- Multiple format support
- Responsive image delivery
- Secure upload handling

## 🚀 Deployment

### Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start server.js --name "thewizards-api"
pm2 save
pm2 startup
```

### Using Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup for Production
1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Configure production frontend URL
4. Set secure JWT secret
5. Configure production email service

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Monitoring

The API includes:
- Request logging with Morgan
- Error handling and reporting
- Health check endpoint
- Performance monitoring hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@thewizards.com
- Documentation: [API Docs](https://docs.thewizards.com)
- Issues: [GitHub Issues](https://github.com/thewizards/issues)

## 🔄 Changelog

### v1.0.0
- Initial release
- Contact form management
- Portfolio showcase
- Admin dashboard
- Email notifications
- Image upload support
