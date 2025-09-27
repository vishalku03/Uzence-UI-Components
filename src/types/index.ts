// Common type definitions for the application
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// Re-export component types
export type { DataTableProps, Column } from '../components/DataTable/DataTable';
export type { InputFieldProps } from '../components/InputField/InputField';
