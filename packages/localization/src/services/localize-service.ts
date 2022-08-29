import type { ILocalizeService } from '../interfaces';
import type { LocalizationMap } from '../types/localization-map';
import moment from 'moment';

class LocalizeService implements ILocalizeService {
    private localizationMap: LocalizationMap = {};
    private locale: string;

    constructor(locale: string) {
        this.locale = locale;
    }
    
    public registerAppLocalization(appName: string, localizationKeys: { [key: string]: string }) {
        const appLocalization = this.localizationMap.appName;
        if (appLocalization) {
            const updatedLocalizedStrings = Object.assign(appLocalization, localizationKeys);
            this.localizationMap.appName = updatedLocalizedStrings;
        } else {
            this.localizationMap[appName] = localizationKeys;
        }
    }

    public getLocalizedString(appName: string, localizationKey: string): string {
        const appLocalization = this.localizationMap[appName];
        if (!appLocalization) {
            return localizationKey;
        }
        const localizedValue = appLocalization[localizationKey];
        return localizedValue ?? localizationKey;
    }

    public getLocalizedNumber(number: number): string {
        // Use the default browser Intl support to localize numbers
        return Intl.NumberFormat(this.locale).format(number);
    }

    public getLocalizedDate(date: Date): string {
        return moment(date).locale(this.locale).format('L');
    }

    public getLocalizedDateString(date: Date): string {
        return moment(date).locale(this.locale).format('LL');
    }

    public getLocalizedDateFullString(date: Date) {
        return moment(date).locale(this.locale).format('LLL');
    }

    public getLocalizedTime(date: Date): string {
        return moment(date).locale(this.locale).format('LT');
    }

    public getLocalizedTimeWithSeconds(date: Date): string {
        return moment(date).locale(this.locale).format('LTS');
    }
}

export default LocalizeService;
