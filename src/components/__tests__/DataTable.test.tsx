import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import DataTable from '../DataTable/DataTable';

interface Row {
  id: number;
  name: string;
  age: number;
}

describe('DataTable (SSR)', () => {
  const data: Row[] = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
  ];

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'age', header: 'Age', sortable: false },
  ] as const;

  it('renders table structure and headers', () => {
    const html = renderToString(
      <DataTable<Row> data={data} columns={columns as any} />
    );
    expect(html).toContain('<table');
    expect(html).toContain('Data table with sortable columns and row selection');
    expect(html).toContain('>ID<');
    expect(html).toContain('>Name<');
    expect(html).toContain('>Age<');
  });

  it('renders loading state when loading=true', () => {
    const html = renderToString(
      <DataTable<Row> data={data} columns={columns as any} loading />
    );
    expect(html).toContain('Loading data...');
    expect(html).toContain('Please wait while we fetch your information');
  });

  it('renders empty state when data is empty', () => {
    const html = renderToString(
      <DataTable<Row> data={[]} columns={columns as any} />
    );
    expect(html).toContain('No data available');
    expect(html).toContain('There are no records to display at this time');
  });

  it('renders selectable controls when selectable=true', () => {
    const html = renderToString(
      <DataTable<Row> data={data} columns={columns as any} selectable />
    );
    // Select-all checkbox
    expect(html).toContain('aria-label="Select all rows"');
    // Row checkbox
    expect(html).toContain('aria-label="Select row 1"');
  });

  it('marks sortable headers with aria-sort="none" by default', () => {
    const html = renderToString(
      <DataTable<Row> data={data} columns={columns as any} />
    );
    // Two sortable columns => two aria-sort values should appear
    const ariaSortCount = (html.match(/aria-sort="none"/g) || []).length;
    expect(ariaSortCount).toBeGreaterThanOrEqual(2);
  });

  it('uses custom render function when provided', () => {
    const html = renderToString(
      <DataTable<Row>
        data={data}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'age', header: 'Age', render: (v: number) => `Age: ${v}` },
        ] as any}
      />
    );
    expect(html).toContain('Age: 30');
    expect(html).toContain('Age: 25');
  });
});
