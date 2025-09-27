import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import InputField from '../components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'inline-radio' },
      options: ['text', 'password', 'email', 'number'],
    },
    theme: {
      control: { type: 'inline-radio' },
      options: ['light', 'dark'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    placeholder: 'Enter value',
    variant: 'outlined',
    size: 'md',
    type: 'text',
    theme: 'light',
    disabled: false,
    invalid: false,
    showClearButton: true,
  },
};
export default meta;

// Controlled wrapper for stories
function ControlledInput(props: React.ComponentProps<typeof InputField>) {
  const [val, setVal] = useState(props.value ?? '');
  return (
    <InputField
      {...props}
      value={val}
      onChange={(e) => setVal(e.currentTarget.value)}
    />
  );
}

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const Outlined: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { variant: 'outlined' },
};

export const Filled: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { variant: 'filled' },
};

export const Ghost: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { variant: 'ghost' },
};

export const Small: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { size: 'sm', label: 'Small' },
};

export const Medium: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { size: 'md', label: 'Medium' },
};

export const Large: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { size: 'lg', label: 'Large' },
};

export const PasswordWithToggle: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { label: 'Password', type: 'password', placeholder: '••••••••' },
};

export const WithHelperText: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Username',
    helperText: 'This will be shown publicly.',
  },
};

export const InvalidWithError: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    label: 'Email',
    value: 'not-an-email',
    invalid: true,
    errorMessage: 'Please enter a valid email',
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { label: 'Disabled', disabled: true, value: 'Cannot edit' },
};

export const WithClearButton: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: { label: 'Search', placeholder: 'Type to show clear', value: 'Hello' },
};

export const DarkThemeOutlined: Story = {
  render: (args) => (
    <div className="bg-gray-900 p-6 rounded-md">
      <ControlledInput {...args} />
    </div>
  ),
  args: { label: 'Email', theme: 'dark', variant: 'outlined' },
};

export const DarkThemeFilled: Story = {
  render: (args) => (
    <div className="bg-gray-900 p-6 rounded-md">
      <ControlledInput {...args} />
    </div>
  ),
  args: { label: 'Name', theme: 'dark', variant: 'filled' },
};

export const DarkThemeGhost: Story = {
  render: (args) => (
    <div className="bg-gray-900 p-6 rounded-md">
      <ControlledInput {...args} />
    </div>
  ),
  args: { label: 'Search', theme: 'dark', variant: 'ghost' },
};

export const Playground: Story = {
  render: (args) => <ControlledInput {...args} />,
};
