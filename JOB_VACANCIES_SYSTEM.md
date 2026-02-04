# Job Vacancies Management System

## Overview
Complete job vacancies management system allowing administrators to post, manage, and feature job openings, while providing a public-facing careers page for potential candidates.

## Features Implemented

### Backend Components

#### Job Model (`backend/models/Job.js`)
- **Fields:**
  - `title` - Job position title
  - `department` - Department/team
  - `location` - Work location
  - `type` - Employment type (full-time, part-time, contract, remote, hybrid)
  - `experienceLevel` - Required experience (entry, mid, senior, lead, executive)
  - `description` - Detailed job description
  - `responsibilities[]` - List of job responsibilities
  - `requirements[]` - List of job requirements
  - `benefits[]` - List of employee benefits
  - `skills[]` - Required skills
  - `salary` - Salary information (min, max, currency, visibility)
  - `applicationDeadline` - Last date to apply
  - `status` - Job status (active, closed, draft)
  - `featured` - Featured job flag
  - `applicationsCount` - Number of applications received
  - `order` - Display order

- **Methods:**
  - `getActive()` - Get all active jobs
  - `getFeatured()` - Get featured jobs
  - `isExpired()` - Check if application deadline has passed

#### Job Routes (`backend/routes/jobs.js`)
**Public Routes:**
- `GET /api/jobs` - List all active jobs (with filters: type, location, experienceLevel, department)
- `GET /api/jobs/featured` - Get featured jobs
- `GET /api/jobs/:id` - Get single job details

**Admin Routes (Protected):**
- `GET /api/jobs/admin/all` - Get all jobs including drafts
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:id/toggle-featured` - Toggle featured status
- `PATCH /api/jobs/:id/status` - Update job status

### Frontend Components

#### Admin Interface

**JobList Component (`src/pages/admin/JobList.jsx`)**
- Display all jobs with status indicators (active, closed, draft)
- Statistics dashboard showing:
  - Total jobs
  - Active jobs
  - Featured jobs
  - Closed jobs
- Actions per job:
  - Toggle featured status
  - Toggle active/closed status
  - Edit job
  - Delete job
- Delete confirmation modal
- Responsive card layout

**JobForm Component (`src/pages/admin/JobForm.jsx`)**
- Comprehensive form for creating/editing jobs
- Dynamic array inputs for:
  - Responsibilities (add/remove items)
  - Requirements (add/remove items)
  - Benefits (add/remove items)
  - Skills (add/remove items)
- Salary information with visibility toggle
- Application deadline date picker
- Status dropdown (active/closed/draft)
- Featured checkbox
- Display order input
- Form validation
- Create and update modes

#### Public Interface

**Careers Page (`src/pages/Careers.jsx`)**
- Hero section with open positions count
- Job type filters:
  - All Positions
  - Full Time
  - Part Time
  - Contract
  - Remote
  - Hybrid
- Experience level filters:
  - All Levels
  - Entry Level
  - Mid Level
  - Senior Level
  - Lead
  - Executive
- Job cards displaying:
  - Job title and department
  - Location and type
  - Experience level
  - Salary range (if visible)
  - Application deadline
  - Required skills as tags
- Job detail modal showing:
  - Complete job description
  - Responsibilities list
  - Requirements list
  - Benefits list
  - Skills tags
  - Salary information
  - Application deadline
  - Apply button (links to contact form)
- Loading states and empty states
- Responsive design

**Home Page Updates (`src/pages/Home.jsx`)**
- New "Join Our Growing Team" section
- Call-to-action buttons:
  - "View Open Positions" → links to /careers
  - "Meet Our Team" → links to /team
- Benefits highlights:
  - Innovation Culture
  - Career Growth
  - Competitive Benefits
- Animated entrance effects

### Routes Configuration

**App.jsx Routes:**
- `/careers` - Public careers page
- `/admin/jobs` - Admin job list
- `/admin/jobs/new` - Create new job
- `/admin/jobs/edit/:id` - Edit existing job

**Admin Sidebar:**
- Added "Job Vacancies" menu item with briefcase icon

## Usage Guide

### For Administrators

#### Creating a Job Posting
1. Navigate to Admin Dashboard → Job Vacancies
2. Click "Post New Job"
3. Fill in basic information:
   - Job title, department, location
   - Employment type and experience level
   - Application deadline (optional)
4. Write detailed job description
5. Add responsibilities, requirements, benefits, and skills
6. Configure salary information:
   - Set min/max range
   - Choose currency
   - Toggle visibility
7. Set job status (active/closed/draft)
8. Check "Featured Job" to highlight the position
9. Set display order
10. Click "Post Job"

#### Managing Jobs
1. View all jobs with statistics
2. Toggle featured status with star icon
3. Toggle active/closed status with eye icon
4. Edit job details with edit icon
5. Delete unwanted jobs with trash icon

#### Job Filtering
- Public page automatically filters by:
  - Active status
  - Non-expired deadlines
- Admins can see all jobs including drafts

### For Job Seekers

#### Browsing Jobs
1. Visit homepage and click "View Open Positions" or navigate to /careers
2. See total number of open positions
3. Filter by job type (full-time, part-time, etc.)
4. Filter by experience level (entry, mid, senior, etc.)
5. Click any job card to view full details

#### Viewing Job Details
1. Modal opens with complete information:
   - Job description
   - Responsibilities
   - Requirements
   - Benefits
   - Required skills
   - Salary range (if visible)
   - Application deadline
2. Click "Apply Now" to go to contact form with pre-filled subject

## Technical Details

### Data Flow
1. Admin creates job via JobForm
2. Form data sent to backend API
3. Job model validates and stores in MongoDB
4. Public careers page fetches active jobs
5. Users filter and view job details
6. Apply button redirects to contact form

### API Integration
```javascript
// Fetch all active jobs with filters
GET /api/jobs?type=full-time&experienceLevel=mid

// Fetch featured jobs
GET /api/jobs/featured

// Admin: Create job
POST /api/jobs (with auth token)

// Admin: Update job
PUT /api/jobs/:id (with auth token)

// Admin: Toggle featured
POST /api/jobs/:id/toggle-featured (with auth token)

// Admin: Update status
PATCH /api/jobs/:id/status (with auth token)
```

### State Management
- React hooks (useState, useEffect, useCallback)
- Form state in JobForm
- Jobs list state in JobList
- Active filters state in Careers

### Styling
- Tailwind CSS utility classes
- Framer Motion animations
- Responsive design (mobile-first)
- Dark mode support
- Gradient effects and glow effects
- Icon library: react-icons/fi

## Benefits

### For Business
- Centralized job posting management
- Featured jobs to highlight critical positions
- Draft mode for preparing job posts
- Application deadline tracking
- Status management (active/closed)
- Display order control
- Professional careers page

### For Candidates
- Easy job discovery
- Advanced filtering options
- Detailed job information
- Salary transparency (when enabled)
- Clear application process
- Mobile-friendly interface
- Featured positions highlighted

## Future Enhancements (Optional)
- Application tracking system
- Resume upload functionality
- Email notifications for new jobs
- Job alerts/subscriptions
- Social media sharing
- Analytics dashboard (views, applications per job)
- Candidate portal
- Interview scheduling
- Assessment integration

## Testing Checklist
- [ ] Admin can create jobs
- [ ] Admin can edit jobs
- [ ] Admin can delete jobs
- [ ] Featured toggle works
- [ ] Status toggle works (active/closed)
- [ ] Public page shows only active jobs
- [ ] Filters work correctly (type, experience)
- [ ] Job detail modal displays correctly
- [ ] Apply button links to contact form
- [ ] Salary visibility toggle works
- [ ] Application deadline is respected
- [ ] Draft jobs don't appear publicly
- [ ] Responsive design works on mobile
- [ ] Dark mode styling is correct

## Deployment Notes
1. Ensure backend server is running
2. MongoDB connection is active
3. Admin authentication is configured
4. All routes are registered in server.js
5. Frontend build includes all new components
6. Environment variables are set

## Support
For questions or issues with the job vacancies system, contact the development team.
