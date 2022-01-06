import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

class UploadCarImagesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const images = req.files as Express.Multer.File[];

        const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);
        const fileNames = images.map((file) => file.filename);

        await uploadCarImageUseCase.execute({ car_id: id, images_name: fileNames });

        return res.status(201).send();
    }
}

export { UploadCarImagesController };
