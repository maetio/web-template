import type { Meta, StoryObj } from '@storybook/react';
import { CreateCompetition } from './create-competition';

const meta: Meta<typeof CreateCompetition> = {
	/* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
	title: 'CreateCompetition',
	component: CreateCompetition,
};

export default meta;
  type Story = StoryObj<typeof CreateCompetition>;

export const Primary: Story = {
	render: () => <CreateCompetition/>,
};
