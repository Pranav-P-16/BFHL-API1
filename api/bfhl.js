// api/bfhl.js
// Serverless handler for Vercel. Also compatible with local require (server.js).
const handler = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ is_success: false, message: 'Only POST allowed' });
  }

  try {
    const { data } = req.body ?? {};
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: '"data" must be an array' });
    }

    // Environment-configurable identity fields (set these in Vercel env vars)
    const FULL_NAME = (process.env.FULL_NAME || 'john_doe').toLowerCase().replace(/\s+/g, '_');
    const DOB = process.env.DOB || '17091999'; // ddmmyyyy
    const EMAIL = process.env.EMAIL || 'john@xyz.com';
    const ROLL_NUMBER = process.env.ROLL_NUMBER || 'ABCD123';

    const user_id = `${FULL_NAME}_${DOB}`;

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    // Collect every alphabetical character (in input order) for concat_string
    const collectedLetters = [];

    data.forEach((raw) => {
      // normalize to string for processing (numbers also allowed)
      const item = (typeof raw === 'string' ? raw : String(raw)).trim();

      // purely numeric? (only digits)
      if (/^[0-9]+$/.test(item)) {
        const n = parseInt(item, 10);
        if (n % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += n;
        return;
      }

      // contains any alphabetic characters?
      if (/[A-Za-z]/.test(item)) {
        alphabets.push(item.toUpperCase());
        for (const ch of item) {
          if (/[A-Za-z]/.test(ch)) collectedLetters.push(ch);
        }
        return;
      }

      // otherwise treat as special characters (includes punctuation etc.)
      special_characters.push(item);
    });

    // Build concat_string: reverse collectedLetters, then alternate caps starting UPPER
    const reversed = collectedLetters.reverse();
    const concat_string = reversed
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    const response = {
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ is_success: false, message: err.message });
  }
};

// Export for Vercel (default export) and for require() (server.js)
module.exports = handler;
exports.default = handler;
