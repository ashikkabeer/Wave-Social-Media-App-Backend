const CloudServices = require('../service/cloudServices');


class CloudControls {
  uploadImagetoCloud = async (buffer) => {
    const response = await CloudServices.uploadImagetoCloudService;
    return response;
  };
}

module.exports = new CloudControls();
