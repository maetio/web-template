import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
	stories: [
		"../app/components/**/*.mdx",
		"../app/components/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	core: {
		builder: {
			name: '@storybook/builder-webpack5',
			options: {
			  fsCache: true,
			  lazyCompilation: true,
			},
		},
	},
	docs: {
		autodocs: "tag",
	},
	webpackFinal: async (config, { configType }) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
                ...(config.resolve || {}).fallback,
                fs: false,
                stream: false,
                os: false,
            },
        }

        // Return the altered config
        return config
    },
};
export default config;
