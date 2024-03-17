import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dialog from './Dialog';

const meta = {
    title: 'Components/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    args: {
        title: 'Add Movie',
        children: null,
        onCloseClick: action('close-click'),
    },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
