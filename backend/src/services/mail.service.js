/**
 * Mail Service
 * Mock implementation to simulate sending emails for consultation requests.
 * In production, this would use nodemailer or a service like SendGrid.
 */

class MailService {
  async sendConsultationNotification(requestData) {
    console.log("------------------------------------------");
    console.log("📧 SIMULATED EMAIL TO NISAR HUSSAIN BHATTI");
    console.log("Subject: New Consultation Request Received");
    console.log("To: nisarpulc1234@gmail.com");
    console.log("------------------------------------------");
    console.log(`fullName: ${requestData.name}`);
    console.log(`Phone: ${requestData.phone}`);
    console.log(`Case Type: ${requestData.caseType}`);
    console.log(`Method: ${requestData.method}`);
    console.log(`Message: ${requestData.message}`);
    console.log("------------------------------------------");
    
    // In a real scenario, this would return the result of the mail transport
    return { success: true, messageId: "simulated-id-" + Date.now() };
  }

  async sendClientAcknowledgment(requestData) {
    if (!requestData.email) return; // Only send if email is provided

    console.log("------------------------------------------");
    console.log(`📧 SIMULATED EMAIL TO CLIENT: ${requestData.name}`);
    console.log("Subject: We Received Your Consultation Request");
    console.log("To: " + requestData.email);
    console.log("------------------------------------------");
    console.log(`Dear ${requestData.name}, Advocate Nisar Hussain's office will contact you at ${requestData.phone} shortly.`);
    console.log("------------------------------------------");
    
    return { success: true };
  }
}

module.exports = new MailService();
