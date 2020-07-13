export class LinkUtils {

    public static addTimestamp(link: string): string {
        const timestamp = new Date().getTime();
        return this.addQuery(link, 'timestamp', timestamp.toString());
    }

    private static addQuery(link: string, key: string, value: string): string {
        const splited = link.split('?');
        const query = splited[1] || '';
        const queries = query.split('&');
        queries.push(`${key}=${value}`);
        return `${splited[0]}?${queries.join('&')}`;
    }
}
