// @ts-nocheck
import type {StorybookConfig} from "@storybook/nextjs";

const path = require("path");

const config: StorybookConfig = {
  stories: [
    "./stories/**/*.mdx",
    "./stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-styling',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, '../src/components')
    config.resolve.alias['@lib'] = path.resolve(__dirname, '../src/lib')
    return config
  }
};
export default config;
