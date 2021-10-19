import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

interface IUpload {
    storage: multer.StorageEngine
}

export default {
    upload(folder: string): IUpload {
        return {
            storage: multer.diskStorage({
                destination: path.resolve(__dirname, '..', '..', folder),
                filename: (req, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const filename = `${fileHash}-${file.originalname}`;

                    return callback(null, filename);
                },
            }),
        };
    },
};
