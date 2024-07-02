import './translate-with-lit-i18n.js';
import './translate-with-lit-localize.js';
import * as templates_es_419 from './generated/locales/es-419.js';
import * as templates_zh_hans from './generated/locales/zh-Hans.js';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { initLitI18n } from 'lit-i18n';
import { sourceLocale, targetLocales } from './generated/locale-codes.js';
import i18next from 'i18next';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Translations',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Demonstrating 2 different translation approaches',
      },
      story: {
        autoplay: true,
      },
    },
  },
  render: () => html` <div></div> `,
};

export default meta;

export const Default: StoryObj = {};

export const LitLocalize: StoryObj = {
  async play() {
    const localizedTemplates = new Map([
      ['es-419', templates_es_419],
      ['zh-Hans', templates_zh_hans],
    ]);

    const { setLocale } = configureLocalization({
      sourceLocale,
      targetLocales,
      // @ts-expect-error -- could be undefined
      // eslint-disable-next-line @typescript-eslint/require-await
      loadLocale: async (locale) => localizedTemplates.get(locale), // eslint-disable @typescript-eslint/require-await
    });

    await setLocale('es-419');
  },
  render: () => html`
    <translate-with-lit-localize> </translate-with-lit-localize>
  `,
};

export const LitI18n: StoryObj = {
  name: 'Lit I18n (i18next)',
  play() {
    i18next.use(initLitI18n).init({
      lng: 'en',
      resources: {
        en: {
          translation: {
            Static: 'Static - translated',
            Dynamic: '{{dynamicString}} - translated',
          },
        },
      },
    });
  },
  render: () => html` <translate-with-lit-i18n> </translate-with-lit-i18n> `,
};
