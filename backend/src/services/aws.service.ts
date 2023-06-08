import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import { app, aws } from '../config/vars';
import saveFile from '../utils/file';

const s3 = new S3({
	region: aws.region,
	accessKeyId: aws.accessKeyId,
	secretAccessKey: aws.secretKey
});

class AwsService {
	async uploadFile(file: object|any, fileName: string): Promise<object|any> {
		const fileExtension = file.name.split('.').pop();
		saveFile(`${fileName}.${fileExtension}`, file.data);
		const fileSaved = await fs.createReadStream(`${app.dirUpload}/${fileName}.${fileExtension}`);
		const params = {
			Bucket: aws.bucket,
			Key: `${aws.directory}/${fileName}`,
			Body: fileSaved,
			ACL: 'public-read'
		};

		const fileUploaded = await s3.upload(params).promise();
		if (fileUploaded) {
			fs.unlinkSync(`${app.dirUpload}/${fileName}.${fileExtension}`);
		}
		return fileUploaded;
	}

	async getS3File(fileName: string): Promise<any> {
		const params = {
			Bucket: aws.bucket,
			Key: `${aws.directory}/${fileName}`,
			Expires: 3600,
		};

		return await s3.getSignedUrlPromise('getObject', params);
	}

	async deleteFile(fileName: string): Promise<any> {
		const params = {
			Bucket: aws.bucket,
			Key: `${aws.directory}/${fileName}`
		};

		return s3.deleteObject(params).promise();
	}
}

export default new AwsService();