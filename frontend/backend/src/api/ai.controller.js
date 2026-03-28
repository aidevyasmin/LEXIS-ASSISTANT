const aiService = require('../services/ai.service');

exports.generateDraft = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const draft = await aiService.generateDraft(prompt);
    res.status(200).json({ draft });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.voiceOver = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Text is required for voice-over' });
    }

    const audioBuffer = await aiService.generateVoiceOver(text);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length,
    });

    res.send(audioBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate voice-over' });
  }
};
