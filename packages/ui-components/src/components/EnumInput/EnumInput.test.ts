/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/svelte';

import { ViewType } from '../../types';
import EnumInputComponent from './EnumInput.svelte';

import type { View, EnumInput } from '../../types';

describe('EnumInput Radio', () => {
  const enumInputRadio: View & EnumInput = {
    id: 'enum-input',
    testId: 'enum-input-test-id',
    type: ViewType.ENUM_INPUT,
    args: {
      labelConfig: {
        label: 'Description',
        localizationKey: 'first-name-key',
      },
      type: 'radio',
      items: [
        { value: 'val1', localizationKey: 'val1-key' },
        { value: 'val2', localizationKey: 'val2-key' },
        { value: 'val3', localizationKey: 'val3-key' },
      ],
    },
  };

  const setup = (view: View & EnumInput) => {
    render(EnumInputComponent, { view });
  };

  it('should render the enum input', () => {
    setup(enumInputRadio);

    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    expect(layoutContainer).not.toBeNull();
  });

  it('should have at least one radio input', () => {
    setup(enumInputRadio);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const inputType = layoutContainer
      .getElementsByTagName('input')
      .item(0)
      .getAttribute('type');

    expect(inputType).toBe('radio');
  });

  it('should have the current number of inputs', () => {
    setup(enumInputRadio);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const inputsCount = layoutContainer.getElementsByTagName('input').length;

    expect(inputsCount).toBe(enumInputRadio.args.items.length);
  });

  it('should check the input on click', () => {
    setup(enumInputRadio);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const input = layoutContainer.getElementsByTagName('input').item(1);
    input.click();

    expect(input.checked).toBeTruthy();
  });
});

describe('EnumInput Select', () => {
  const enumInputSelect: View & EnumInput = {
    id: 'enum-input',
    testId: 'enum-input-test-id',
    type: ViewType.ENUM_INPUT,
    args: {
      labelConfig: {
        label: 'Description',
        localizationKey: 'first-name-key',
      },
      type: 'select',
      items: [
        { value: 'val1', localizationKey: 'val1-key' },
        { value: 'val2', localizationKey: 'val2-key' },
        { value: 'val3', localizationKey: 'val3-key' },
      ],
    },
  };

  const setup = (view: View & EnumInput) => {
    render(EnumInputComponent, { view });
  };

  it('should render the enum input', () => {
    setup(enumInputSelect);

    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    expect(layoutContainer).not.toBeNull();
  });

  it('should have a select element', () => {
    setup(enumInputSelect);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const inputType = layoutContainer.getElementsByTagName('select').item(0);

    expect(inputType).not.toBeNull();
  });

  it('should have the correct number of options', () => {
    setup(enumInputSelect);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const optionsCount = layoutContainer
      .getElementsByTagName('select')
      .item(0)
      .getElementsByTagName('option').length;

    expect(optionsCount).toBe(enumInputSelect.args.items.length);
  });

  it('should select the correct value', () => {
    setup(enumInputSelect);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const select = layoutContainer.getElementsByTagName('select').item(0);

    select.selectedIndex = 1;

    expect(select.value).toBe(enumInputSelect.args.items[1].value);
  });
});

describe('EnumInput MultiSelect', () => {
  const enumInputSelect: View & EnumInput = {
    id: 'enum-input',
    testId: 'enum-input-test-id',
    type: ViewType.ENUM_INPUT,
    args: {
      labelConfig: {
        label: 'Description',
        localizationKey: 'first-name-key',
      },
      type: 'multiselect',
      items: [
        { value: 'val1', localizationKey: 'val1-key' },
        { value: 'val2', localizationKey: 'val2-key' },
        { value: 'val3', localizationKey: 'val3-key' },
      ],
    },
  };

  const setup = (view: View & EnumInput) => {
    render(EnumInputComponent, { view });
  };

  it('should render the enum input', () => {
    setup(enumInputSelect);

    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    expect(layoutContainer).not.toBeNull();
  });

  it('should have a select element', () => {
    setup(enumInputSelect);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const inputType = layoutContainer.getElementsByTagName('select').item(0);

    expect(inputType).not.toBeNull();
  });

  it('should have the multiple attribute', () => {
    setup(enumInputSelect);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const inputType = layoutContainer
      .getElementsByTagName('select')
      .item(0)
      .getAttribute('multiple');

    expect(inputType).toBe('');
  });

  it('should have the correct number of options', () => {
    setup(enumInputSelect);
    const layoutContainer = screen.queryByTestId('enum-input-test-id');
    const optionsCount = layoutContainer
      .getElementsByTagName('select')
      .item(0)
      .getElementsByTagName('option').length;

    expect(optionsCount).toBe(enumInputSelect.args.items.length);
  });
});
