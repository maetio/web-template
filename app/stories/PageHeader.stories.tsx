import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '../components/PageHeader';

const meta: Meta<typeof PageHeader> = {
	/* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
	title: 'PageHeader',
	component: PageHeader,
};

export default meta;
  type Story = StoryObj<typeof PageHeader>;

export const Primary: Story = {
	render: () => <PageHeader />,
};
