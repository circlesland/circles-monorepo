import type { ILocalizeService } from '@circlesland/localization-interfaces';
import LocalizeService from './localize-service';

describe('Localize Service', () => {
    let service: ILocalizeService = new LocalizeService('en-us');
    const appName = 'test-app-name';
    const localizationKeys = {
        'app.title': 'AppTitle',
        'app.button.label': 'AppLabel'
    };
    

    beforeAll(() => {
        service.registerAppLocalization(appName, localizationKeys);
    })

    // Localized String values
    it('should corectly localize a string', () => {
        const localizationKey = 'app.title';

        const localizedString = service.getLocalizedString(appName, localizationKey);

        expect(localizedString).toEqual(localizationKeys[localizationKey]);
    });

    it('should return localization key if app name is not registered', () => {
        const localizationKey = 'app.title';

        const localizedString = service.getLocalizedString('unknown-app-name', localizationKey);

        expect(localizedString).toEqual(localizationKey);
    });

    it('should return localization key if key is not registered for app', () => {
        const localizationKey = 'unknwon-localization-key';

        const localizedString = service.getLocalizedString(appName, localizationKey);

        expect(localizedString).toEqual(localizationKey);
    });

    // Localized Dates
    it('should', () => {
        const value = service.getLocalizedDate(new Date());
        console.log(value);
    });
});