export class ClipboardImageParser {

    public parseImageFile(rawData: DataTransfer | null): File | null {
        if (!rawData || !rawData.files || !rawData.files.item(0)) {
            console.log(rawData);
            console.warn('no data');
            return null;
        }
        const file = rawData.files.item(0);
        if (!file || file.type.indexOf('image') === -1) {
            console.warn('no image');
            return null;
        }
        return file;
    }
}
