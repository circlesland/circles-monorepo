/**
 * Localization service interface. Provides support to retrieve localized values for user visible strings/numbers/dates
 */
 interface ILocalizeService {
    /**
     * Registers localization keys for the app with the specified name
     * @param { string } appName - The name of the app to register localization strings for
     * @param { { [key: string]: string } } localizationKeys - The localization keys of the app
     */
    registerAppLocalization(appName: string, localizationKeys: { [key: string]: string });

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
     * @returns { string } - The localized number, as a number or a string
     */
    getLocalizedNumber: (number: number) => string;

    /**
     * Retrieve a localized Date, based on the currently configured locale.
     * 
     * The date format is "MM/DD/YYYY" - for EN-GB locale
     * 
     * @param { Date } date - The date to be localized
     * 
     * @returns { string } - The formatted date, as a string.
     */
    getLocalizedDate: (date: Date) => string;

    /**
     * Retrieve a localized Date, based on the currently configured locale.
     * 
     * The date format is "August 1, 2022" - for EN-GB locale
     * 
     * @param { Date } date - The date to be localized.
     * 
     * @returns { string } - The formatted date, as a string
     */
    getLocalizedDateString: (date: Date) => string;

    /**
     * Retrieve a localized Date, based on the currently configured locale.
     * 
     * The date format is "1 August 2022 13:24" - for EN-GB locale
     * 
     * @param { Date } date - The date to be localized
     * 
     * @returns { string } - The formatted date, as a string
     */
    getLocalizedDateFullString: (date: Date) => string;

    /**
     * Retrieve a localized Time, based on the currently configured locale.
     * 
     * The time format is "HH:MM" - for EN-GB locale
     * 
     * @param { Date } date - The date to get the time localized from
     * 
     * @returns { string } - The formatted time, as a string
     */
    getLocalizedTime: (date: Date) => string;


    /**
     * Retrieve a localized time, based on the currently configured locale.
     * 
     * The time format is "14:15:33" - for EN-GB locale
     * 
     * @param { Date } - The date to get the time localized from
     * 
     * @returns { string } - The formatted time, as a string
     */
    getLocalizedTimeWithSeconds: (date: Date) => string;
}

export default ILocalizeService;
