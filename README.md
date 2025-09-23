# TheWizarDs - Cybersecurity & Web Development Company

A professional React website for TheWizarDs, a cybersecurity and web development company that provides comprehensive security solutions and secure web development services.

## 🛡️ About TheWizarDs

TheWizarDs specializes in:
- **Cybersecurity Services**: Security audits, penetration testing, vulnerability management, and security consulting
- **Secure Web Development**: Custom web applications built with security-first principles
- **Website Security Enhancement**: Improving security for existing websites and applications
- **24/7 Security Monitoring**: Continuous monitoring and incident response

## 🚀 Features

- **Modern React Architecture**: Built with React 18, React Router, and modern hooks
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Automatic theme switching with user preference detection
- **Professional UI/UX**: Clean, modern design with smooth animations
- **Contact Form**: Functional contact form with validation and submission handling
- **SEO Optimized**: Proper meta tags, semantic HTML, and performance optimization
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **Forms**: Custom hooks with validation
- **Build Tool**: Create React App
- **Fonts**: Inter & JetBrains Mono (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/thewizards-website.git
   cd thewizards-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website.

## 🏗️ Project Structure

```
src/
├── assets/
│   ├── icons/          # Custom icons and graphics
│   ├── images/         # Images and media files
│   └── styles/         # Global CSS and Tailwind config
├── components/
│   ├── common/         # Reusable components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ui/             # UI components
├── context/
│   └── ThemeContext.js # Theme management context
├── hooks/
│   └── useContactForm.js # Contact form custom hook
├── pages/
│   ├── Home.jsx        # Homepage
│   ├── Services.jsx    # Services page
│   ├── About.jsx       # About page
│   ├── Portfolio.jsx   # Portfolio page
│   └── Contact.jsx     # Contact page
├── sections/           # Page sections
├── utils/              # Utility functions
├── App.jsx             # Main app component
└── index.js            # Entry point
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Cyber**: Green accent (#22c55e to #16a34a)
- **Dark**: Neutral grays (#0f172a to #f8fafc)

### Typography
- **Primary Font**: Inter (sans-serif)
- **Code Font**: JetBrains Mono (monospace)

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Hover effects with subtle shadows
- **Forms**: Consistent styling with validation states

## 📱 Pages Overview

### Home Page
- Hero section with call-to-action
- Services overview
- Company statistics
- Client testimonials

### Services Page
- Detailed cybersecurity services
- Web development offerings
- Process methodology
- Pricing information

### About Page
- Company mission and values
- Team member profiles
- Certifications and expertise
- Company statistics

### Portfolio Page
- Project showcase with filtering
- Case studies and results
- Client testimonials
- Technology stack highlights

### Contact Page
- Contact form with validation
- Business information
- Emergency contact details
- FAQ section

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push to main branch

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📧 Contact Form Integration

The contact form is ready for backend integration. To connect it to your email service:

1. **Update the submission handler** in `src/hooks/useContactForm.js`
2. **Replace the mock API call** with your actual endpoint
3. **Add environment variables** for API keys (EmailJS, SendGrid, etc.)

Example with EmailJS:
```javascript
import emailjs from 'emailjs-com';

// In handleSubmit function
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formData,
  'YOUR_USER_ID'
);
```

## 🔒 Security Features

- **Input Validation**: Client-side form validation with sanitization
- **XSS Protection**: Proper escaping of user content
- **HTTPS Ready**: Secure headers and HTTPS enforcement
- **Content Security Policy**: CSP headers for production deployment
- **Dependency Security**: Regular dependency updates and security audits

## 🎯 SEO Optimization

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: XML sitemap generation
- **Performance**: Optimized images and lazy loading
- **Core Web Vitals**: Excellent performance scores

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and inquiries:
- **Email**: info@thewizards.dev
- **Phone**: +1 (234) 567-8900
- **Website**: https://thewizards.dev

## 🙏 Acknowledgments

- **Design Inspiration**: Modern cybersecurity and tech company websites
- **Icons**: Feather Icons via React Icons
- **Fonts**: Google Fonts (Inter & JetBrains Mono)
- **Animations**: Framer Motion library
- **Styling**: Tailwind CSS framework

---

**Built with ❤️ by TheWizarDs Team**