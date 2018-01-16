import superagent from 'superagent';
import sha1 from 'sha1';


/**
 *@description handles submiting image on cloudinary
 * @param {object} data - image object
 * @returns {function} uploadRequest -function
 */
const upload = (data) => {
  const cloudName = process.env.CLOUDINARY_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const timestamp = Date.now() / 1000;
  const uploadPreset = process.env.CLOUDINARY_PRESETS;
  const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}tOCLTWg6d4HQx_5BEuufdkNXU8c`;
  const signature = sha1(paramsStr);
  const params = {
    api_key: process.env.CLOUDINARY_API_KEYS,
    timestamp,
    upload_preset: uploadPreset,
    signature
  };
  const uploadRequest = superagent.post(url);
  uploadRequest.attach('file', data);
  Object.keys(params).forEach((key) => {
    uploadRequest.field(key, params[key]);
  });

  return uploadRequest;
};

export default upload;
