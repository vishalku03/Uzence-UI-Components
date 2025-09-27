import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DataTable from '../components/DataTable';

// Define a sample row type for stories
interface Row {
  id: number;
  name: string;
  age: number;
  role?: string;
}

const columns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
] as const;

const sampleData: Row[] = [
  { id: 1, name: 'Alice', age: 30, role: 'Admin' },
  { id: 2, name: 'Bob', age: 25, role: 'Editor' },
  { id: 3, name: 'Carol', age: 40, role: 'Viewer' },
];

// Wrapper component to bind generic T for Storybook
function SampleTable(props: React.ComponentProps<typeof DataTable<Row>>) {
  return <DataTable<Row> {...props} />;
}

const meta: Meta<typeof SampleTable> = {
  title: 'Components/DataTable',
  component: SampleTable,
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    data: sampleData,
    columns: columns as unknown as any, // satisfy Storybook controls; component uses correct types
    selectable: false,
    loading: false,
  },
};
export default meta;

type Story = StoryObj<typeof SampleTable>;

export const Default: Story = {
  render: (args) => <SampleTable {...args} />,
};

export const SortableColumns: Story = {
  name: 'Sortable Columns',
  render: (args) => (
    <SampleTable
      {...args}
      columns={columns as unknown as any}
    />
  ),
};

export const SelectableRows: Story = {
  name: 'Selectable Rows',
  render: (args) => (
    <SampleTable
      {...args}
      selectable
      onRowSelect={(rows) => {
        // eslint-disable-next-line no-console
        console.log('Selected rows:', rows);
      }}
    />
  ),
};

export const Loading: Story = {
  render: (args) => <SampleTable {...args} loading />,
  args: {
    data: sampleData,
  },
};

export const Empty: Story = {
  render: (args) => <SampleTable {...args} data={[]} />,
};

export const CustomRenderer: Story = {
  name: 'Custom Cell Renderer',
  render: (args) => (
    <SampleTable
      {...args}
      columns={[
        { key: 'name', header: 'Name', sortable: true },
        {
          key: 'age',
          header: 'Age',
          sortable: true,
          render: (value: Row['age'], row: Row) => (
            <span className="inline-flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium">{value}</span>
              <em className="text-gray-500 text-xs">({row.role ?? 'Unknown'})</em>
            </span>
          ),
        },
      ] as unknown as any}
    />
  ),
  args: {
    data: sampleData,
  },
};

export const ManyRows: Story = {
  name: 'Many Rows (Scrolling)',
  render: (args) => (
    <div style={{ maxHeight: 360, overflow: 'auto' }}>
      <SampleTable
        {...args}
        data={Array.from({ length: 25 }).map((_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          age: 18 + ((i * 7) % 50),
          role: ['Admin', 'Editor', 'Viewer'][i % 3],
        }))}
      />
    </div>
  ),
};
