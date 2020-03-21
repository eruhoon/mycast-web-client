export class DateUtils {

    public static getDateString(dateObj: Date): string {
        const date = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const dayString = this.getDayString(dateObj.getDay());
        return `${month}월 ${date}일 (${dayString})`;
    }

    public static getDayString(day: number): string {
        switch (day) {
            case 0: return '일';
            case 1: return '월';
            case 2: return '화';
            case 3: return '수';
            case 4: return '목';
            case 5: return '금';
            case 6: return '토';
            default:
                console.warn('invalid day');
                return '';
        }
    }
}
