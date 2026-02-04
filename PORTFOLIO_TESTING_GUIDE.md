# Portfolio Featured Projects - Testing Guide

## Quick Test Steps

### Prerequisites
1. Backend server running on `http://localhost:5000`
2. MongoDB connected and running
3. Frontend dev server running
4. Admin account created

---

## Test 1: Create Featured Project

**Steps:**
1. Login to admin dashboard: `http://localhost:3000/admin/login`
2. Navigate to Portfolio: Click "Portfolio" in sidebar
3. Click "Add New Project" button
4. Fill in the form:
   - Title: "AI-Powered Security Platform"
   - Short Description: "Advanced cybersecurity solution with AI threat detection"
   - Description: "Enterprise-grade security platform with machine learning threat detection and real-time monitoring capabilities for modern businesses."
   - Category: Select "Cybersecurity"
   - Technologies: Add "Python", "TensorFlow", "React", "MongoDB"
   - Features: Add at least 2 features
   - Duration: "6 months"
   - Status: Select "Published" ⚠️ **IMPORTANT**
   - **Featured**: ✓ **Check this box** ⭐
5. Upload at least one image
6. Click "Create Project"

**Expected Result:**
- ✅ Success message appears
- ✅ Redirected to portfolio list
- ✅ Project appears with gold star (featured)

---

## Test 2: Verify Public Display

**Steps:**
1. Open new browser tab/window
2. Navigate to: `http://localhost:3000/portfolio`
3. Scroll to "Featured Projects" section

**Expected Result:**
- ✅ Your project appears in Featured Projects section
- ✅ Project shows with featured badge
- ✅ Project image displays correctly
- ✅ All project details are visible
- ✅ No placeholder/mock data visible

---

## Test 3: Toggle Featured Status

**Steps:**
1. Go back to admin: `http://localhost:3000/admin/portfolio`
2. Find your project in the list
3. Click the **star icon** (⭐) to toggle featured status
4. Star should turn gray (unfeatured)
5. Refresh public portfolio page: `http://localhost:3000/portfolio`

**Expected Result:**
- ✅ Project no longer in Featured Projects section
- ✅ Project still visible in "All Projects" section
- ✅ No errors in console

**Steps (Continue):**
6. Return to admin portfolio list
7. Click star icon again to re-feature the project
8. Star should turn gold (featured)
9. Refresh public portfolio page again

**Expected Result:**
- ✅ Project reappears in Featured Projects section
- ✅ Featured badge shows again

---

## Test 4: Multiple Featured Projects

**Steps:**
1. Create 2 more projects following Test 1 steps
2. Mark both as Featured and Published
3. Use different categories:
   - Project 2: "Mobile Development" category
   - Project 3: "AI & Machine Learning" category
4. Visit public portfolio page

**Expected Result:**
- ✅ All 3 featured projects appear
- ✅ Projects display in correct order (by priority/created date)
- ✅ Each project shows its correct category
- ✅ Category filters work correctly

---

## Test 5: Empty State Handling

**Steps:**
1. Go to admin portfolio list
2. Select all projects (if multi-select available) or one by one
3. Click star icons to un-feature ALL projects
4. Visit public portfolio page

**Expected Result:**
- ✅ Featured Projects section appears but is empty
- ✅ "No Projects Found" message displays (or similar)
- ✅ No mock/hardcoded projects appear
- ✅ No console errors

---

## Test 6: Category Filtering

**Steps:**
1. Re-feature at least 2 projects with different categories
2. Visit public portfolio page
3. Click on category filters (Cybersecurity, AI & ML, etc.)

**Expected Result:**
- ✅ Only projects of selected category display
- ✅ Featured projects filter correctly
- ✅ Category counts are accurate
- ✅ "All Projects" shows all projects

---

## Test 7: Draft vs Published

**Steps:**
1. Create a new project
2. Mark it as **Featured** ✓
3. Set status to **"Draft"** (not published)
4. Save the project
5. Visit public portfolio page

**Expected Result:**
- ✅ Draft project does NOT appear on public page
- ✅ Only published projects are visible
- ✅ Draft project visible in admin panel with "Draft" badge

---

## Test 8: Edit Featured Project

**Steps:**
1. Go to admin portfolio list
2. Click "Edit" on a featured project
3. Change title to "Updated: [Original Title]"
4. Keep Featured checkbox checked
5. Keep status as Published
6. Save changes
7. Visit public portfolio page

**Expected Result:**
- ✅ Updated title displays on public page
- ✅ Project remains featured
- ✅ All other details remain intact
- ✅ No duplicate projects appear

---

## API Endpoint Tests

### Test API Directly

**1. Get All Published Projects:**
```bash
curl http://localhost:5000/api/portfolio?status=published
```
Expected: JSON with array of published projects

**2. Get Featured Projects Only:**
```bash
curl http://localhost:5000/api/portfolio?status=published&featured=true
```
Expected: JSON with only featured projects

**3. Get Featured Projects (dedicated endpoint):**
```bash
curl http://localhost:5000/api/portfolio/featured
```
Expected: JSON with featured projects array

**4. Toggle Featured (requires admin token):**
```bash
# Replace {PROJECT_ID} and {ADMIN_TOKEN}
curl -X POST http://localhost:5000/api/portfolio/{PROJECT_ID}/toggle-featured \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {ADMIN_TOKEN}"
```
Expected: Success response with featured status

---

## Browser Console Tests

### Check Portfolio Data Loading

**Steps:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate to portfolio page
4. Look for network requests

**Expected Console Output:**
```
✓ No errors
✓ API fetch successful: GET /api/portfolio?status=published
✓ Projects loaded: [array of projects]
✓ Featured projects: [filtered array]
```

### Check Network Tab

**Steps:**
1. Open Network tab in DevTools
2. Refresh portfolio page
3. Find `/api/portfolio` request

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "_id": "...",
        "title": "...",
        "featured": true,
        "status": "published",
        ...
      }
    ],
    "pagination": { ... }
  }
}
```

---

## Common Issues & Solutions

### Issue: No projects appear on public page
**Solution:**
- ✓ Check project status is "published" (not draft)
- ✓ Verify backend server is running
- ✓ Check MongoDB connection
- ✓ Clear browser cache
- ✓ Check console for API errors

### Issue: Featured toggle doesn't work
**Solution:**
- ✓ Verify admin token is valid
- ✓ Check network tab for 401 errors
- ✓ Re-login if token expired
- ✓ Check backend logs for errors

### Issue: Categories not showing
**Solution:**
- ✓ Ensure projects have valid category values
- ✓ Check category mapping in Portfolio.jsx
- ✓ Verify projects are published
- ✓ Refresh page after creating projects

### Issue: Images not displaying
**Solution:**
- ✓ Check Cloudinary configuration
- ✓ Verify image URLs in database
- ✓ Check browser console for 404 errors
- ✓ Ensure images were uploaded successfully

---

## Performance Tests

### Test Large Number of Projects

**Steps:**
1. Create 20+ projects (mix of featured/non-featured)
2. Visit portfolio page
3. Check page load time
4. Test category filtering speed

**Expected Performance:**
- ✅ Page loads in < 2 seconds
- ✅ No lag when filtering categories
- ✅ Smooth animations
- ✅ Images load progressively

---

## Security Tests

### Test Unauthorized Access

**Steps:**
1. Open browser DevTools
2. Try to toggle featured without admin token:
```javascript
fetch('http://localhost:5000/api/portfolio/{PROJECT_ID}/toggle-featured', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
```

**Expected Result:**
- ✅ 401 Unauthorized response
- ✅ Request rejected
- ✅ Featured status unchanged

---

## Final Checklist

After completing all tests, verify:

- [ ] Admin can create projects with featured checkbox
- [ ] Admin can toggle featured status via star icon
- [ ] Featured projects appear in dedicated section on public page
- [ ] Only published projects are visible publicly
- [ ] Draft projects don't appear on public page
- [ ] No hardcoded/mock data appears
- [ ] Empty state displays properly when no projects
- [ ] Category filtering works correctly
- [ ] Multiple featured projects display correctly
- [ ] Images load and display properly
- [ ] No console errors
- [ ] API endpoints respond correctly
- [ ] Toggle featured requires authentication
- [ ] Page performance is acceptable

---

## Success Criteria

✅ **Integration Complete When:**
1. Admin can manage featured status easily
2. Public page displays only admin-posted projects
3. No mock/hardcoded data visible
4. Featured section works as expected
5. All CRUD operations work
6. Security is enforced
7. Performance is acceptable

---

## Report Issues

If any test fails:
1. Note the test number and step
2. Check browser console for errors
3. Check backend logs
4. Verify MongoDB data
5. Document the issue with screenshots
6. Report to development team

---

## Next Steps After Testing

Once all tests pass:
1. ✅ Integration is production-ready
2. Consider adding more project categories
3. Implement pagination if needed
4. Add search functionality
5. Consider caching for featured projects
6. Add analytics tracking
7. Implement SEO optimization

---

**Happy Testing! 🚀**
