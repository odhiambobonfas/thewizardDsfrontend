# Job Application System - Implementation Guide

## Overview
Complete job application system with CV upload and admin management features.

## Features Implemented

### 1. Frontend (User-Facing)
- **Job Application Form** (`/careers/apply/:jobId`)
  - Personal information (name, email, phone, location)
  - Professional background (experience, current company, position)
  - Online profiles (LinkedIn, portfolio website)
  - CV/Resume upload (PDF or Word documents, max 5MB)
  - Cover letter text area
  - Form validation
  - Success/error handling

### 2. Backend API
- **Application Model** (`backend/models/Application.js`)
  - All applicant information
  - CV file storage (Cloudinary)
  - Application status tracking
  - Timestamps and indexing

- **Application Routes** (`backend/routes/applications.js`)
  - `POST /api/applications` - Submit application with CV upload
  - `GET /api/applications` - Get all applications (admin)
  - `GET /api/applications/:id` - Get single application (admin)
  - `PUT /api/applications/:id/status` - Update application status
  - `DELETE /api/applications/:id` - Delete application
  - `GET /api/applications/stats/overview` - Get statistics

### 3. Admin Panel
- **Application List** (`/admin/applications`)
  - View all applications in table format
  - Filter by status (pending, reviewing, shortlisted, interviewed, offered, rejected)
  - View full application details in modal
  - Download candidate CV
  - Update application status
  - Delete applications
  - Contact information for each applicant

## Application Status Workflow
1. **Pending** - New application submitted
2. **Reviewing** - Application being reviewed
3. **Shortlisted** - Candidate selected for next round
4. **Interviewed** - Interview completed
5. **Offered** - Job offer extended
6. **Rejected** - Application declined
7. **Withdrawn** - Candidate withdrew

## Setup Instructions

### 1. Backend Dependencies
```bash
cd backend
npm install multer
```

### 2. Environment Variables
No additional variables needed - uses existing Cloudinary configuration.

### 3. Start Backend Server
```bash
cd backend
npm run dev
```

### 4. Frontend Routes Added
- `/careers` - Job listings (already exists)
- `/careers/apply/:jobId` - Job application form (NEW)
- `/admin/applications` - Admin application management (NEW)

## Usage

### For Job Seekers:
1. Go to `/careers` page
2. Browse available positions
3. Click "Apply Now" on any job card OR "View Details" then "Apply for this Position"
4. Fill out the application form
5. Upload CV/Resume (PDF or Word, max 5MB)
6. Submit application
7. Receive confirmation message

### For Admins:
1. Login to admin panel
2. Navigate to "Applications" in sidebar
3. View all applications in table
4. Filter by status
5. Click "View Details" to see full application
6. Click "Download" icon to download candidate's CV
7. Update status via dropdown
8. Delete applications if needed

## File Upload Details
- **Allowed formats**: PDF (.pdf), Word (.doc, .docx)
- **Max size**: 5MB
- **Storage**: Cloudinary (in 'job-applications' folder)
- **File naming**: `cv_[timestamp]_[email-prefix]`

## Security Features
- File type validation
- File size limits
- Admin authentication required for viewing applications
- Cloudinary secure URLs
- Protection against duplicate applications (same email + job)

## Database Schema
```javascript
Application {
  jobId: ObjectId (ref: Job)
  jobTitle: String
  firstName: String
  lastName: String
  email: String (unique per job)
  phone: String
  location: String
  linkedIn: String
  portfolio: String
  coverLetter: String
  cv: {
    url: String (Cloudinary URL)
    publicId: String
    fileName: String
  }
  experience: Number
  currentCompany: String
  currentPosition: String
  availableFrom: Date
  expectedSalary: String
  status: String (enum)
  notes: String (admin notes)
  appliedAt: Date
  timestamps: true
}
```

## Testing Checklist
- [ ] Apply for a job from careers page
- [ ] Upload CV (test PDF and Word formats)
- [ ] Verify application appears in admin panel
- [ ] Download CV from admin panel
- [ ] Update application status
- [ ] Filter applications by status
- [ ] View application details
- [ ] Delete application
- [ ] Verify CV is deleted from Cloudinary

## Notes
- CVs are stored in Cloudinary under 'job-applications' folder
- When application is deleted, CV is automatically removed from Cloudinary
- Email validation prevents duplicate applications
- Admin can add notes to applications for internal tracking
