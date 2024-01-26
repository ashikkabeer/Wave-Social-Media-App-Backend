const CloudServices = require('../service/cloudServices');


class CloudControls {
  static uploadImagetoCloud = async (buffer) => {
    const response = await CloudServices.uploadImagetoCloudService();
    return response;
  };
}

module.exports = CloudControls;
