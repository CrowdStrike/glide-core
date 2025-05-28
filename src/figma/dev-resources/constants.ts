export const figmaFileId = 'A4B1kaT5HVLqcijwK4GXzt';
export const resourcesDirectory = './dist/figma/dev-resources';

export interface DeveloperResource {
  urls: {
    github: string;
    storybook: string;
  };
  nodeIds: string[];
}

// It would be awesome to not have a human-maintained list of
// resources to keep track of, but the way things are structured in
// Figma is different than in code. Unfortunately we can't simply
// walk all of the pages from the API, fetch the sections, frames,
// and components, and generate this list. Maybe one day though.
//
// Instead, this is a collection of all Figma components we want to
// explicitly assign resources to.
//
// A single section¹ has multiple variants of the same component in
// it. This is called a "component set" in Figma's UI. The component
// set's node ID is used to apply resources to all components within
// that set.
//
// Each section in the Figma UI Kit is a separate object in this
// array. When a single section has multiple component sets, it will
// have an ID in `nodeIds` for each one.
//
// We typically don't add resources to our "hidden components", but
// there are cases, such as when detaching, where it is helpful. Use
// your best judgement on these.
//
// To audit this list and make updates, walk each section
// left-to-right, top-to-bottom checking the component set node ID.
//
// 1: https://help.figma.com/hc/en-us/articles/9771500257687-Organize-your-canvas-with-sections
export const resources: DeveloperResource[] = [
  // Page: Accordion
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/accordion.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/accordion--overview',
    },
    nodeIds: ['2439-82'],
  },
  // Page: Alert
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/inline-alert.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/inline-alert--overview',
    },
    nodeIds: ['1842-8071'],
  },
  // Page: Button
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/button.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/button--overview',
    },
    nodeIds: [
      '517-232',
      '544-282',
      '544-280',
      '544-309',
      '544-281',
      '544-367',
      '547-220',
      '1126-1973',
      '1126-1765',
      '1126-1994',
      '1126-1856',
      '1126-2015',
    ],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/icon-button.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/icon-button--overview',
    },
    nodeIds: ['544-424', '16245-1346', '588-348', '16245-1376', '547-183'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/dropdown.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/dropdown--overview',
    },
    nodeIds: ['4912-1322'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/split-button.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/split-button--overview',
    },
    nodeIds: ['908-1675', '908-1944'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/button-group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/button-group--overview',
    },
    nodeIds: ['908-1702', '813-4054'],
  },
  // Page: Checkbox
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/checkbox.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/checkbox--overview',
    },
    nodeIds: ['1911-14737', '592-1622'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/checkbox-group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/checkbox-group--overview',
    },
    nodeIds: ['1817-7280', '1817-7255'],
  },
  // Page: Date Picker
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['2349-11825'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['2351-15354'],
  },
  // Page: Dialog and Modal
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/modal.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/modal--overview',
    },
    nodeIds: [
      '1244-7611',
      '1284-2914',
      '1284-2985',
      '1284-3027',
      '1284-3361',
      '1284-4450',
      '1284-4526',
      '1284-4602',
    ],
  },
  // Page: Form Element
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['1295-3164'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/dropdown.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/dropdown--overview',
    },
    nodeIds: ['1558-5235', '1590-2017'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/textarea.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/textarea--overview',
    },
    nodeIds: ['1641-5617'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['1663-6662'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/radio-group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/radio-group--overview',
    },
    nodeIds: ['1812-9696'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/checkbox-group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/checkbox-group--overview',
    },
    nodeIds: ['1817-7248'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['2268-5864'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['2273-11057'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/slider.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/slider--overview',
    },
    nodeIds: ['7007-13511'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/slider.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/slider--overview',
    },
    nodeIds: ['7007-14405'],
  },
  // Page: Input
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['1222-48858'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/textarea.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/textarea--overview',
    },
    nodeIds: ['1636-6435'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['1663-6669'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/input.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/input--overview',
    },
    nodeIds: ['1743-21173'],
  },
  // Page: Loader
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/spinner.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/spinner--overview',
    },
    nodeIds: ['10331-1540'],
  },
  // Page: Popover
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/popover.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/popover--overview',
    },
    nodeIds: ['1114-5239'],
  },
  // Page: Radio
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/radio-group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/radio-group--overview',
    },
    nodeIds: ['1905-8533'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/radio-group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/radio-group--overview',
    },
    nodeIds: ['677-589'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/radio-group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/radio-group--overview',
    },
    nodeIds: ['1566-4027'],
  },
  // Page: Select
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/dropdown.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/dropdown--overview',
    },
    nodeIds: ['1527-7624'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/dropdown.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/dropdown--overview',
    },
    nodeIds: ['1590-2043'],
  },
  // Page: Slider
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/slider.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/slider--overview',
    },
    nodeIds: ['1122-15317', '1141-2182'],
  },
  // Page: Tabs
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/tab.group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/tab-group--overview',
    },
    nodeIds: ['1677-9933'],
  },
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/tab.group.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/tab-group--overview',
    },
    // "Hidden component", as Tab Groups are typically detached,
    // so we need to use the individual Tab elements instead.
    nodeIds: ['1156-5926'],
  },
  // Page: Tag
  {
    urls: {
      github: 'https://github.com/CrowdStrike/glide-core/blob/main/src/tag.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/tag--overview',
    },
    nodeIds: ['11567-11125'],
  },
  // Page: Toast
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/toast.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/toast--overview',
    },
    nodeIds: ['969-8723'],
  },
  // Page: Toggle
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/toggle.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/toggle--overview',
    },
    nodeIds: ['555-301', '555-324', '8637-51'],
  },
  // Page: Tooltip
  {
    urls: {
      github:
        'https://github.com/CrowdStrike/glide-core/blob/main/src/tooltip.ts',
      storybook:
        'https://glide-core.crowdstrike-ux.workers.dev/?path=/docs/tooltip--overview',
    },
    nodeIds: ['1049-5865'],
  },
];
