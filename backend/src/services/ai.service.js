const openai = require('openai');

class AIService {
  constructor() {
    this.client = null;
    let apiKey = process.env.OPENAI_API_KEY;
    
    // Check if it's a known failing key or a placeholder
    const isMockMode = !apiKey || 
                       apiKey === 'your_openai_api_key_here' || 
                       apiKey === 'change_me' || 
                       apiKey.includes('your_') ||
                       apiKey.startsWith('sk-or-'); // OpenRouter keys from environment
    
    if (!isMockMode) {
      this.client = new openai.OpenAI({ apiKey: apiKey });
    } else {
      console.log('AI Service: Mock mode active (Key ignored or placeholder).');
    }
  }

  async generateDraft(prompt) {
    if (!this.client) {
      console.warn("AI Service: Mock mode active. Returning professional mock response.");
      
      // Professional Mock Logic for Demo
      const lowerPrompt = prompt.toLowerCase();
      if (lowerPrompt.includes('divorce') || lowerPrompt.includes('family') || lowerPrompt.includes('khula') || lowerPrompt.includes('custody')) {
        return "### Legal Analysis: Family Law & Domestic Relations (Pakistan)\n\n**Relevant Statutes:** \n1. Muslim Family Laws Ordinance, 1961\n2. West Pakistan Family Courts Act, 1964\n3. Guardians and Wards Act, 1890\n\n**Preliminary Analysis:**\nFamily cases in Pakistan are handled by specialized Family Courts. \n\n*   **Divorce/Talaq:** Must be registered with the Union Council to be legally effective under Section 7 of the 1961 Ordinance.\n*   **Khula:** A wife can seek dissolution of marriage through court if she develops a 'hateful' relationship with her husband. She may have to return the Dower (Haq-Mehr).\n*   **Child Custody (Hizanat):** The paramount consideration is the 'Welfare of the Minor'. Mothers generally have custody of males until 7 years and females until puberty, though this is subject to the court's discretion.\n*   **Maintenance:** Father is legally bound to provide maintenance for children regardless of custody status.\n\n**Recommended Next Steps:**\n1.  **Documentation:** Provide Nikahnama (Marriage Certificate) and B-Forms for children.\n2.  **Mediation:** Family courts initially attempt reconciliation (Pre-trial proceedings).\n3.  **Consultation:** A formal meeting with Advocate Nisar Hussain is recommended to discuss the specific merits of your case at Hajvery Complex Lahore.";
      } else if (lowerPrompt.includes('302') || lowerPrompt.includes('criminal')) {
        return "### Legal Analysis: Criminal Law (PPC)\n\n**Relevant Law:** Pakistan Penal Code (PPC) & Code of Criminal Procedure (CrPC).\n\n**Analysis:** The matter involves serious allegations under the PPC. The CrPC governs the trial procedure, including bail (Zamanat) and evidence recording.\n\n**Next Steps:**\n1. Review the FIR for contradictions.\n2. Apply for Pre-Arrest Bail if arrest is imminent.";
      }
      
      return "### Advocate Nisar Hussain - AI Assistant Response\n\n**Note:** This is an automated preliminary analysis based on Pakistani Statutes.\n\n**Analysis:** Your inquiry regarding '" + prompt.substring(0, 50) + "...' has been received. Under the relevant Pakistani laws (CPC/PPC), this matter requires a detailed review of documents.\n\n**Guidance:** Please ensure you have all original documents and CNIC copies ready for a formal consultation.\n\n**Actionable Advice:** Consult with Advocate Nisar Hussain at Hajvery Complex for a definitive legal opinion.";
    }

    try {
      const response = await this.client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional legal assistant for Advocate Nisar Hussain, specializing in Pakistani Law. You must not fabricate laws, citations, or precedents. Always use professional, structured output (Summary -> Law -> Analysis -> Next Steps)."
          },
          { role: "user", content: prompt }
        ]
      });
      return response.choices[0].message.content;
    } catch (apiError) {
      console.error('OpenAI API Error:', apiError);
      throw apiError;
    }
  }

  /**
   * Generates a voice-over (Text-to-Speech) using OpenAI's tts-1 model.
   * Returns a Buffer containing the audio data (mp3).
   */
  async generateVoiceOver(text) {
    if (!this.client) {
      throw new Error("OpenAI Client not initialized. Please configure API Key.");
    }

    const mp3 = await this.client.audio.speech.create({
      model: "tts-1",
      voice: "alloy", // Other options: echo, fable, onyx, nova, shimmer
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer;
  }

  async analyzeFIR(fileContent) {
    // Placeholder for FIR analysis
    return "FIR Analysis is not yet implemented.";
  }
}

module.exports = new AIService();
