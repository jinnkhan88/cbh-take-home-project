const crypto = require("crypto");

/**
 * Moved the variables out of function to be constants as they can be used by
 * other functions as well. Appended "DETERMINISTIC" before the CONSTANTS to be
 * make it easier to refer them for this function/keys
 * We can also move these to a other file which is shared by other modules as shared Constants as well.
 */
const DETERMINISTIC_TRIVIAL_PARTITION_KEY = "0";
const DETERMINISTIC_MAX_PARTITION_KEY_LENGTH = 256;

/**
 * return "sha3-512" hex digest for given non null object.
 * @param {object} data // non null data could be string , array , object
 * @returns sha3-512 hex for any data given or null if data is null
 */
const getCandidateHash = (data) => {
  if (data) {
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }
  return null;
};

/**
 * function to get candidate from an object passed as event.
 * @param {object} event  // can be an object with partition key or empty object
 * @returns a candidate hash in cas of no partitionkey is present. else returns the partition key already present in the event. or null if an empty event is passed.
 */

const getCandidateFromEvent = (event) => {
  if (event) {
    let candidate;

    if (event?.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = getCandidateHash(data);
    }
    return candidate;
  } else {
    return null;
  }
};

/**
 *
 * @param {} event
 * @returns the candidate as string if an object is passed else returns a default "0" or DETERMINISTIC_TRIVIAL_PARTITION_KEY
 */

const getCandidateForPartitionKeyFromEvent = (event) => {
  let candidate = getCandidateFromEvent(event);
  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = DETERMINISTIC_TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > DETERMINISTIC_MAX_PARTITION_KEY_LENGTH) {
    candidate = getCandidateHash(candidate);
  }
  return candidate;
};

exports.deterministicPartitionKey = (event) => {
  let candidate = getCandidateForPartitionKeyFromEvent(event);

  return candidate;
};
