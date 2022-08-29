import type { ILocalizeService } from '@circlesland/localization-interfaces';
import type { LocalizationMap } from './types/localization-map';
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

    public getLocalizedNumber(number: string): number | string {
        return 1234;
    }

    public getLocalizedDate(date: number | Date): string {
        return moment(date, 'DD/MM/YYYY').toString();
    }
}

export default LocalizeService;
