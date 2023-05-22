const Result = require('../models/results/result-model');

async function createResult(studentId, subject, marks) {
  try {
    const newResult = new Result({ studentId, subject, marks });
    await newResult.save();
    return newResult;
  } catch (err) {
    console.log('Error creating result:', err);
    throw err;
  }
}

async function getResultsByStudentId(studentId) {
  try {
    const results = await Result.find({ studentId });
    return results;
  } catch (err) {
    console.log('Error retrieving results:', err);
    throw err;
  }
}

module.exports = {
  createResult,
  getResultsByStudentId,
};
