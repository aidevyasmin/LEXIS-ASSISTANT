const nodemailer = require('nodemailer');

/**
 * Mail Service
 * Uses nodemailer to send real emails via Gmail/SMTP.
 */

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'nisarpulc1234@gmail.com',
        pass: process.env.EMAIL_PASS, // Use App Password
      },
    });
  }

  async sendConsultationNotification(requestData) {
    const mailOptions = {
      from: `"Lexis Assistant" <${process.env.EMAIL_USER}>`,
      to: 'nisarpulc1234@gmail.com',
      subject: 'New Consultation/Contact Request Received',
      html: `
        <h3>New Request Details</h3>
        <p><strong>Name:</strong> ${requestData.name}</p>
        <p><strong>Email:</strong> ${requestData.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${requestData.phone}</p>
        <p><strong>Subject/Case Type:</strong> ${requestData.caseType}</p>
        <p><strong>Method:</strong> ${requestData.method}</p>
        <p><strong>Message:</strong> ${requestData.message}</p>
        <br>
        <p>Sent from Lexis Assistant Platform</p>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email Error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendClientAcknowledgment(requestData) {
    if (!requestData.email) return;

    const mailOptions = {
      from: `"Advocate Nisar Hussain" <${process.env.EMAIL_USER}>`,
      to: requestData.email,
      subject: 'We Received Your Request - Nisar Hussain Bhatti',
      html: `
        <h3>Dear ${requestData.name},</h3>
        <p>Thank you for reaching out to my office. We have received your message regarding <strong>${requestData.caseType}</strong>.</p>
        <p>We will contact you shortly at <strong>${requestData.phone}</strong> for further discussion.</p>
        <br>
        <p>Best Regards,</p>
        <p><strong>Advocate Nisar Hussain Bhatti</strong><br>High Court, Lahore</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Acknowledgment Email Error:', error);
      return { success: false };
    }
  }
}

module.exports = new MailService();
