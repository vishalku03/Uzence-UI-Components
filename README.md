Uzence UI Components

A modern React + TypeScript component library styled with Tailwind CSS and documented using Storybook.

🚀 Features

Built with TypeScript for type safety and better developer experience.

Tailwind CSS for fast and consistent styling.

Storybook documentation to explore components in isolation.

Accessible components with proper labels and ARIA support.

Responsive design for mobile and desktop.

Organized folder structure for maintainable code.

🧭 How I Built It

TypeScript everywhere – used generics (e.g., DataTable<T>) to ensure type safety.

Accessibility-first – labels, ARIA, and keyboard interactions included.

Tailwind setup – configured via Vite; Storybook imports src/index.css.

Storybook – stories live in src/stories/ with controls and a11y checks.

Testing – Vitest and Testing Library integrated; Storybook stories help with tests.

Performance – Vite + React SWC for fast dev experience.

Theming – components like InputField support theme prop (light/dark).

Folder structure – components, stories, and tests colocated for clarity.

🧰 Prerequisites

Node.js 18+

npm 9+

Git

⚙️ Setup

Install dependencies

npm install


Useful npm scripts

{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build",
  "test": "vitest run"
}


Run the demo app

npm run dev


Open Storybook

npm run storybook
# If 6006 is busy:
npm run storybook -- -p 6007 --no-open


Run tests

npm run test

📦 Components
InputField

A customizable input box with support for helper text, errors, clear button, password toggle, and light/dark themes.

import InputField from '@/components/InputField';
import { useState } from 'react';

function Example() {
  const [email, setEmail] = useState('');
  return (
    <InputField
      label="Email"
      value={email}
      onChange={(e) => setEmail(e.currentTarget.value)}
      placeholder="you@example.com"
      variant="outlined"
      size="md"
      type="text"
      theme="light"
      helperText="We’ll never share your email."
    />
  );
}


Key Props:

variant: 'filled' | 'outlined' | 'ghost'

size: 'sm' | 'md' | 'lg'

type: 'text' | 'password' | 'email' | 'number'

showClearButton: boolean

invalid, errorMessage, helperText

theme: 'light' | 'dark'

DataTable

A type-safe table supporting sorting, row selection, loading/empty states, and custom cell rendering.

import DataTable, { type Column } from '@/components/DataTable';

type Row = { id: number; name: string; age: number };

const columns: Column<Row>[] = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'age', header: 'Age' },
];

const data: Row[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
];

export default function TableExample() {
  return (
    <DataTable<Row>
      data={data}
      columns={columns}
      selectable
      onRowSelect={(rows) => console.log(rows)}
      loading={false}
    />
  );
}

🎨 Theming

Components like InputField use a theme prop (light | dark).

For dark-mode previews in Storybook, use a dark background for proper contrast.

♿ Accessibility

Inputs link htmlFor and id for proper labeling.

ARIA attributes (aria-invalid, aria-describedby) are applied.

Table headers use aria-sort and support keyboard sorting.

Row checkboxes have clear labels; select-all shows the indeterminate state.

🗂️ Project Structure
src/
  components/
    DataTable/
      DataTable.tsx
      index.ts
    InputField.tsx
    __tests__/
      InputField.test.tsx
      DataTable.test.tsx
  stories/
    InputField.stories.tsx
    DataTable.stories.tsx
  docs/
    DataTable.docs.mdx
.storybook/
  main.ts
  preview.ts
  vitest.setup.ts

🤝 Contributing

Create a new branch.

Add/update stories and tests.

Run lint and tests.

Open a pull request.

📄 License

MIT