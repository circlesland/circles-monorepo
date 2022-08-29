import type { ILocalizeService } from '../interfaces';
import LocalizeService from './localize-service';

describe('Localize Service', () => {
  let service: ILocalizeService = new LocalizeService('en-US');
  const appName = 'test-app-name';
  const localizationKeys = {
    'app.title': 'AppTitle',
    'app.button.label': 'AppLabel',
    'with.insert.params': 'A string with {count} insert params of type {type}.'
  };

  beforeAll(() => {
    service.registerAppLocalization(appName, localizationKeys);
  });

  describe('Localized translations', () => {
    it('should corectly localize a string', () => {
      const localizationKey = 'app.title';

      const localizedString = service.getLocalizedString(
        appName,
        localizationKey
      );

      expect(localizedString).toEqual(localizationKeys[localizationKey]);
    });

    it('should corectly localize a string with insert parameters', () => {
      const localizationKey = 'with.insert.params';
      const insertParams = {
        count: 2,
        type: 'number and string'
      };
      const localizedString = service.getLocalizedString(appName, localizationKey, insertParams);

      const expectedLocalizedString = 'A string with 2 insert params of type number and string.';
      expect(localizedString).toEqual(expectedLocalizedString);
    });

    it('should return localization key if app name is not registered', () => {
      const localizationKey = 'app.title';

      const localizedString = service.getLocalizedString(
        'unknown-app-name',
        localizationKey
      );

      expect(localizedString).toEqual(localizationKey);
    });

    it('should return localization key if key is not registered for app', () => {
      const localizationKey = 'unknwon-localization-key';

      const localizedString = service.getLocalizedString(
        appName,
        localizationKey
      );

      expect(localizedString).toEqual(localizationKey);
    });
  });

  describe('Localized Dates', () => {
    it('should format date based on EN-US locale', () => {
      const localizedDate = service.getLocalizedDate(new Date(2019, 3, 24));
      expect(localizedDate).toEqual('04/24/2019');

      const localizedDateString = service.getLocalizedDateString(
        new Date(2019, 3, 23)
      );
      expect(localizedDateString).toEqual('April 23, 2019');

      const localizedDateFullString = service.getLocalizedDateFullString(
        new Date(2020, 3, 3, 13, 3, 3)
      );
      expect(localizedDateFullString).toEqual('April 3, 2020 1:03 PM');
    });

    it('should format date based on FR locale', () => {
        const frenchService = new LocalizeService('FR');

        const localizedDate = frenchService.getLocalizedDate(new Date(2019, 3, 24));
        expect(localizedDate).toEqual('24/04/2019');
  
        const localizedDateString = frenchService.getLocalizedDateString(
          new Date(2019, 3, 23)
        );
        expect(localizedDateString).toEqual('23 avril 2019');
  
        const localizedDateFullString = frenchService.getLocalizedDateFullString(
          new Date(2020, 3, 3, 13, 3, 3)
        );
        expect(localizedDateFullString).toEqual('3 avril 2020 13:03');
    });
  });

  describe('Localized Time', () => {
    it('should format time based on EN-US locale', () => {
        const localizedTime = service.getLocalizedTime(new Date(2020, 4, 3, 13, 30, 34));
        expect(localizedTime).toEqual('1:30 PM');

        const localizedTimeWithSeconds = service.getLocalizedTimeWithSeconds(new Date(2021, 5, 4, 15, 44, 35));
        expect(localizedTimeWithSeconds).toEqual('3:44:35 PM');
    });

    it('should format time based on FR locale', () => {
        const frenchService = new LocalizeService('FR');

        const localizedTime = frenchService.getLocalizedTime(new Date(2020, 4, 3, 13, 30, 34));
        expect(localizedTime).toEqual('13:30');

        const localizedTimeWithSeconds = frenchService.getLocalizedTimeWithSeconds(new Date(2021, 5, 4, 15, 44, 35));
        expect(localizedTimeWithSeconds).toEqual('15:44:35');
    });
  });

  describe('Localized numbers', () => {
    it('should format number based on EN-US locale', () => {
        const localizedNumber = service.getLocalizedNumber(1.33);

        expect(localizedNumber).toEqual('1.33');
    });

    it('should format number based on FR locale', () => {
        const frenchService = new LocalizeService('FR');

        const localizedNumber = frenchService.getLocalizedNumber(1.33);

        expect(localizedNumber).toEqual('1,33');
    })
  });
});
