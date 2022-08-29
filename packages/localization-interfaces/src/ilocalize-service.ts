/**
 * Localization service interface. Provides support to retrieve localized values for user visible strings/numbers/dates
 */
interface ILocalizeService {
    /**
     * Retrieve a localized string value based on the application name and a localization key
     * 
     * @param { string } appName - The application name
     * @param { string } localizationKey - The localization key
     * 
     * @returns { string } The localized string, or the localization key if the localizedstring is not found.
     */
    getLocalizedString: (appName: string, localizationKey: string) => string;

    /**
     * Retrieve a localized number based on the currently configured locale
     * 
     * @param { number } number - The number to be localized
     * 
     * @returns { number | string } - The localized number, as a number or a string
     */
    getLocalizedNumber: (number: string) => number | string;

    /**
     * Retrieve a localized Date, based on the currently configured locale
     * 
     * @param { number | Date } - The date to be localized
     * 
     * @returns { string } - The formatted date, as a string.
     */
    getLocalizedDate: (date: number | Date) => string;
}

export default ILocalizeService;
