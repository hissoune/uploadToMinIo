const minioClient = require('./minioConfig');

const bucketName = 'upload';

const uploadToMinIO = async (file) => {
  if (!file) throw new Error('No file provided');

  const uniqueFileName = `image_${Date.now()}_${file.originalname}`;
  await minioClient.putObject(bucketName, uniqueFileName, file.buffer);

  return `http://127.0.0.1:9000/${bucketName}/${uniqueFileName}`;
};

module.exports = { uploadToMinIO };
