const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form notification
const sendContactNotification = async (contact) => {
  const transporter = createTransporter();
  
  const serviceTypeMap = {
    'web-development': 'Web Development',
    'mobile-app': 'Mobile App Development',
    'desktop-app': 'Desktop Application',
    'cybersecurity': 'Cybersecurity Services',
    'portfolio-website': 'Portfolio Website',
    'full-stack-solution': 'Full-Stack Solution',
    'consultation': 'Consultation',
    'other': 'Other'
  };

  const budgetMap = {
    'under-5k': 'Under $5,000',
    '5k-10k': '$5,000 - $10,000',
    '10k-25k': '$10,000 - $25,000',
    '25k-50k': '$25,000 - $50,000',
    'over-50k': 'Over $50,000',
    'not-sure': 'Not Sure'
  };

  const timelineMap = {
    'asap': 'ASAP',
    '1-month': '1 Month',
    '2-3-months': '2-3 Months',
    '3-6-months': '3-6 Months',
    'flexible': 'Flexible'
  };

  // Email to admin
  const adminMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'admin@thewizards.com',
    subject: `New Contact Form Submission - ${serviceTypeMap[contact.serviceType]}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #2563eb, #22c55e); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">TheWizarDs Website</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Information</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 8px 0;"><strong>Name:</strong> ${contact.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${contact.email}" style="color: #2563eb;">${contact.email}</a></p>
            ${contact.phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${contact.phone}" style="color: #2563eb;">${contact.phone}</a></p>` : ''}
            ${contact.company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${contact.company}</p>` : ''}
          </div>

          <h3 style="color: #1e293b; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Project Details</h3>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 8px 0;"><strong>Service Type:</strong> <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${serviceTypeMap[contact.serviceType]}</span></p>
            ${contact.budget ? `<p style="margin: 8px 0;"><strong>Budget:</strong> ${budgetMap[contact.budget]}</p>` : ''}
            ${contact.timeline ? `<p style="margin: 8px 0;"><strong>Timeline:</strong> ${timelineMap[contact.timeline]}</p>` : ''}
          </div>

          <h3 style="color: #1e293b; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Message</h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 20px;">
            <p style="margin: 0; line-height: 1.6; color: #374151;">${contact.message}</p>
          </div>

          <h3 style="color: #1e293b; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Submission Details</h3>
          <div style="font-size: 14px; color: #6b7280;">
            <p style="margin: 8px 0;"><strong>Submitted:</strong> ${contact.createdAt.toLocaleString()}</p>
            <p style="margin: 8px 0;"><strong>IP Address:</strong> ${contact.ipAddress}</p>
            <p style="margin: 8px 0;"><strong>Contact ID:</strong> ${contact._id}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #0369a1; font-weight: 600;">⚡ Quick Actions</p>
            <div style="margin-top: 15px;">
              <a href="mailto:${contact.email}?subject=Re: Your inquiry about ${serviceTypeMap[contact.serviceType]}" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; font-weight: 600;">
                Reply to ${contact.name}
              </a>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
          <p>This email was automatically generated by TheWizarDs contact form system.</p>
        </div>
      </div>
    `
  };

  // Confirmation email to client
  const clientMailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: contact.email,
    subject: 'Thank you for contacting TheWizarDs - We\'ll be in touch soon!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #2563eb, #22c55e); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${contact.name}!</h1>
          <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-top: 0;">
            Thank you for reaching out to TheWizarDs! We've received your inquiry about <strong>${serviceTypeMap[contact.serviceType]}</strong> and our team is excited to learn more about your project.
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 25px 0;">
            <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">What happens next?</h3>
            <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll prepare a personalized response with initial thoughts</li>
              <li>If it's a good fit, we'll schedule a consultation call</li>
              <li>We'll provide a detailed proposal and timeline</li>
            </ul>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 16px;">Your Submission Summary:</h3>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Service:</strong> ${serviceTypeMap[contact.serviceType]}</p>
            ${contact.budget ? `<p style="margin: 5px 0; color: #6b7280;"><strong>Budget:</strong> ${budgetMap[contact.budget]}</p>` : ''}
            ${contact.timeline ? `<p style="margin: 5px 0; color: #6b7280;"><strong>Timeline:</strong> ${timelineMap[contact.timeline]}</p>` : ''}
            <p style="margin: 5px 0; color: #6b7280;"><strong>Submitted:</strong> ${contact.createdAt.toLocaleString()}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #374151; margin-bottom: 20px;">In the meantime, feel free to check out our portfolio and learn more about our services:</p>
            <a href="${process.env.FRONTEND_URL || 'https://thewizards.com'}/portfolio" 
               style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px;">
              View Our Portfolio
            </a>
            <a href="${process.env.FRONTEND_URL || 'https://thewizards.com'}/services" 
               style="display: inline-block; background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px;">
              Our Services
            </a>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <strong>Questions?</strong> Reply to this email or contact us directly at 
              <a href="mailto:${process.env.EMAIL_FROM || 'contact@thewizards.com'}" style="color: #2563eb;">${process.env.EMAIL_FROM || 'contact@thewizards.com'}</a>
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
          <p>Best regards,<br><strong>The TheWizarDs Team</strong></p>
          <p style="margin-top: 15px;">
            <a href="${process.env.FRONTEND_URL || 'https://thewizards.com'}" style="color: #2563eb; text-decoration: none;">thewizards.com</a>
          </p>
        </div>
      </div>
    `
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions)
  ]);
};

// Send portfolio update notification
const sendPortfolioNotification = async (project, action = 'created') => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'admin@thewizards.com',
    subject: `Portfolio Project ${action.charAt(0).toUpperCase() + action.slice(1)} - ${project.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Portfolio Project ${action.charAt(0).toUpperCase() + action.slice(1)}</h2>
        <p><strong>Title:</strong> ${project.title}</p>
        <p><strong>Category:</strong> ${project.category}</p>
        <p><strong>Status:</strong> ${project.status}</p>
        <p><strong>Featured:</strong> ${project.featured ? 'Yes' : 'No'}</p>
        <p><strong>Description:</strong> ${project.shortDescription}</p>
        <p><strong>Action Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactNotification,
  sendPortfolioNotification
};
