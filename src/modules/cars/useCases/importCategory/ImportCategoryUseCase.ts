import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(@inject('CategoriesRepository') private readonly categoriesRepository: ICategoriesRepository) { }

    private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const parseFile = csvParse();
            const stream = fs.createReadStream(file.path);
            stream.pipe(parseFile);

            parseFile
                .on('data', async (line) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on('end', () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on('error', reject);
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.forEach(async (category) => {
            const { description, name } = category;
            const existsCategory = await this.categoriesRepository.findByName(name);
            if (!existsCategory) await this.categoriesRepository.create({ name, description });
        });
    }
}

export { ImportCategoryUseCase };
