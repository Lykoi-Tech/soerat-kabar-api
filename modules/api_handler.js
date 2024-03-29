const wrapper = require('../helpers/utils/wrapper');
const validator = require('../helpers/utils/validator');
const userDomain = require('./users/domain');
const articlesDomain = require('./articles/domain');
const categoryDomain = require('./category/domain');
const userPayloadModel = require('./users/payload_model');
const common = require('../helpers/utils/common');

/*eslint no-arrow-condition: "error"*/
const registerUser = async (req, res) => {
  const { body } = req;

  const payload = {
    ...body
  };

  const validatePayload = validator.isValidPayload(payload, userPayloadModel.registerValidate);

  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }

    return userDomain.registerUser(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};


const getAllArticles = async (req, res) => {
  const payload = {
    ...req.query,
  };
  const getRequest = async () => {
    return await articlesDomain.getAllArticles(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await getRequest());
};

const getAllCategory = async (req, res) => {
  const payload = {
    ...req.query,
  };
  const getRequest = async () => {
    return await categoryDomain.getAllCategory(payload);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await getRequest());
};

module.exports = {
  registerUser,
  getAllArticles,
  getAllCategory
};