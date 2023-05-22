const Result = require('../../services/result-service').Result;

async function createResult(request, h) {
  try {
    const { subject, marks } = request.payload;
    const studentId = request.auth.credentials.id; // Assuming student ID is extracted from the authenticated user
    const newResult = new Result({ studentId, subject, marks });
    await newResult.save();
    return h.response('Result created successfully').code(201);
  } catch (err) {
    console.log('Error creating result:', err);
    return h.response('Error creating result').code(500);
  }
}

async function getResults(request, h) {
  try {
    const studentId = request.auth.credentials.id; // Assuming student ID is extracted from the authenticated user
    const results = await Result.find({ studentId });
    return h.response(results);
  } catch (err) {
    console.log('Error retrieving results:', err);
    return h.response('Error retrieving results').code(500);
  }
}

module.exports = {
  createResult,
  getResults,
};
