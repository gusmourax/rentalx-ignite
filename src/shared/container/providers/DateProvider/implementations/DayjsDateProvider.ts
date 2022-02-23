import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        const endDateUtc = this.convertToUtc(end_date);
        const startDateUtc = this.convertToUtc(start_date);
        return dayjs(endDateUtc).diff(startDateUtc, 'hours');
    }

    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }
}

export { DayjsDateProvider };
