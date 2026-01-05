// studentTypes.js

/**
 * @typedef {Object} Student
 * @property {string} rollNo
 * @property {string} name
 * @property {'Male' | 'Female'} gender
 * @property {string} imageUrl
 * @property {Float32Array} [descriptor]
 */

/**
 * @typedef {Object} AttendanceRecord
 * @property {string} rollNo
 * @property {string} name
 * @property {'Male' | 'Female'} gender
 * @property {'Present' | 'Absent'} status
 */

/**
 * @typedef {Object} AttendanceStats
 * @property {number} totalStrength
 * @property {number} totalPresent
 * @property {number} boysTotal
 * @property {number} boysPresent
 * @property {number} girlsTotal
 * @property {number} girlsPresent
 */

/**
 * @typedef {'webcam' | 'upload' | 'rtsp'} InputSource
 */

module.exports = {
  // These are just placeholders if you want to export "types" as objects
  Student: {},
  AttendanceRecord: {},
  AttendanceStats: {},
  InputSource: {},
};
