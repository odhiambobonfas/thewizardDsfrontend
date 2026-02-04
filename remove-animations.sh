#!/bin/bash

# Script to remove framer-motion animations from all files

FILES=(
  "src/pages/Home.jsx"
  "src/pages/About.jsx"
  "src/pages/Services.jsx"
  "src/pages/Portfolio.jsx"
  "src/pages/Careers.jsx"
  "src/pages/Team.jsx"
  "src/pages/client/TestimonialForm.jsx"
  "src/pages/client/TestimonialSuccess.jsx"
  "src/pages/admin/AdminLogin.jsx"
  "src/pages/admin/AdminDashboard.jsx"
  "src/pages/admin/Statistics.jsx"
  "src/pages/admin/ClientList.jsx"
  "src/pages/admin/ClientForm.jsx"
  "src/pages/admin/JobList.jsx"
  "src/pages/admin/JobForm.jsx"
  "src/pages/admin/PortfolioList.jsx"
  "src/pages/admin/PortfolioForm.jsx"
  "src/pages/admin/TeamList.jsx"
  "src/pages/admin/TeamForm.jsx"
  "src/pages/admin/TestimonialList.jsx"
  "src/pages/admin/ContactList.jsx"
  "src/pages/admin/Settings.jsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Remove framer-motion import lines
    sed -i "/import.*from 'framer-motion'/d" "$file"
    sed -i "/import.*from \"framer-motion\"/d" "$file"
    
    # Replace motion. elements with regular elements
    sed -i 's/<motion\.div/<div/g' "$file"
    sed -i 's/<\/motion\.div>/<\/div>/g' "$file"
    sed -i 's/<motion\.section/<section/g' "$file"
    sed -i 's/<\/motion\.section>/<\/section>/g' "$file"
    sed -i 's/<motion\.button/<button/g' "$file"
    sed -i 's/<\/motion\.button>/<\/button>/g' "$file"
    sed -i 's/<motion\.a/<a/g' "$file"
    sed -i 's/<\/motion\.a>/<\/a>/g' "$file"
    sed -i 's/<motion\.h1/<h1/g' "$file"
    sed -i 's/<\/motion\.h1>/<\/h1>/g' "$file"
    sed -i 's/<motion\.h2/<h2/g' "$file"
    sed -i 's/<\/motion\.h2>/<\/h2>/g' "$file"
    sed -i 's/<motion\.h3/<h3/g' "$file"
    sed -i 's/<\/motion\.h3>/<\/h3>/g' "$file"
    sed -i 's/<motion\.p/<p/g' "$file"
    sed -i 's/<\/motion\.p>/<\/p>/g' "$file"
    sed -i 's/<motion\.form/<form/g' "$file"
    sed -i 's/<\/motion\.form>/<\/form>/g' "$file"
    sed -i 's/<motion\.ul/<ul/g' "$file"
    sed -i 's/<\/motion\.ul>/<\/ul>/g' "$file"
    sed -i 's/<motion\.li/<li/g' "$file"
    sed -i 's/<\/motion\.li>/<\/li>/g' "$file"
    
    # Remove animation props (initial, animate, whileInView, whileHover, whileTap, transition, viewport, exit)
    sed -i '/^\s*initial=/d' "$file"
    sed -i '/^\s*animate=/d' "$file"
    sed -i '/^\s*whileInView=/d' "$file"
    sed -i '/^\s*whileHover=/d' "$file"
    sed -i '/^\s*whileTap=/d' "$file"
    sed -i '/^\s*transition=/d' "$file"
    sed -i '/^\s*viewport=/d' "$file"
    sed -i '/^\s*exit=/d' "$file"
    
    # Remove animate- classes
    sed -i 's/animate-spin//g' "$file"
    sed -i 's/animate-pulse//g' "$file"
    sed -i 's/animate-bounce//g' "$file"
    sed -i 's/animate-subtle-pulse//g' "$file"
    
    # Remove transition classes
    sed -i 's/transition-all //g' "$file"
    sed -i 's/transition-transform //g' "$file"
    sed -i 's/transition-opacity //g' "$file"
    sed -i 's/ transition-all//g' "$file"
    sed -i 's/ transition-transform//g' "$file"
    sed -i 's/ transition-opacity//g' "$file"
    
    # Remove AnimatePresence
    sed -i 's/<AnimatePresence>//g' "$file"
    sed -i 's/<\/AnimatePresence>//g' "$file"
    
    echo "✓ Completed $file"
  else
    echo "✗ File not found: $file"
  fi
done

echo ""
echo "All files processed!"
