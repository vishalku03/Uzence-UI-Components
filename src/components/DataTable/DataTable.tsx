import React, { useState, useMemo } from 'react';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  loading?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

function DataTable<T>({ data, columns, selectable = false, onRowSelect, loading = false }: DataTableProps<T>): React.ReactElement {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key: direction ? key : null, direction });
  };

  const handleRowSelect = (rowIndex: number, isSelected: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (isSelected) {
      newSelectedRows.add(rowIndex);
    } else {
      newSelectedRows.delete(rowIndex);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map(index => sortedData[index]);
      onRowSelect(selectedData);
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    const newSelectedRows = isSelected ? new Set(sortedData.map((_, index) => index)) : new Set<number>();
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = isSelected ? [...sortedData] : [];
      onRowSelect(selectedData);
    }
  };

  const isAllSelected = selectedRows.size === sortedData.length && sortedData.length > 0;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length;

  const getAriaSortValue = (columnKey: keyof T) => {
    if (sortConfig.key !== columnKey) return 'none';
    if (sortConfig.direction === 'asc') return 'ascending';
    if (sortConfig.direction === 'desc') return 'descending';
    return 'none';
  };

  const getSortIcon = (columnKey: keyof T) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'asc') {
      return (
        <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'desc') {
      return (
        <svg className="w-4 h-4 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    
    return null;
  };

  const LoadingSpinner = () => (
    <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const renderTableContent = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td 
              colSpan={columns.length + (selectable ? 1 : 0)} 
              className="px-6 py-16 text-center text-gray-500 bg-gray-50/50"
            >
              <div className="flex flex-col items-center space-y-4">
                <LoadingSpinner />
                <div className="space-y-1">
                  <span className="text-sm font-medium text-gray-700">Loading data...</span>
                  <p className="text-xs text-gray-500">Please wait while we fetch your information</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    if (data.length === 0) {
      return (
        <tbody>
          <tr>
            <td 
              colSpan={columns.length + (selectable ? 1 : 0)} 
              className="px-6 py-16 text-center text-gray-500 bg-gray-50/30"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-gray-700">No data available</span>
                  <p className="text-xs text-gray-500">There are no records to display at this time</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="divide-y divide-gray-100 bg-white">
        {sortedData.map((row, rowIndex) => {
          const isSelected = selectedRows.has(rowIndex);
          return (
            <tr 
              key={rowIndex} 
              className={`transition-colors duration-150 hover:bg-gray-50/80 ${
                isSelected ? 'bg-blue-50/70 hover:bg-blue-50' : 'bg-white'
              }`}
            >
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap w-12">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleRowSelect(rowIndex, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                      aria-checked={isSelected}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </div>
                </td>
              )}
              {columns.map((column) => {
                const value = row[column.key];
                return (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 text-sm text-gray-900 border-b border-gray-100 last:border-r-0"
                  >
                    <div className="flex items-center min-h-[1.25rem]">
                      {column.render ? column.render(value, row) : String(value)}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 bg-white">
      <table 
        className="min-w-full divide-y divide-gray-200"
        aria-label="Data table with sortable columns and row selection"
        role="table"
      >
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            {selectable && (
              <th 
                className="px-6 py-4 w-12 text-left"
                scope="col"
              >
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    aria-checked={isAllSelected ? 'true' : isIndeterminate ? 'mixed' : 'false'}
                    aria-label="Select all rows"
                  />
                </div>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                  column.sortable 
                    ? 'cursor-pointer hover:bg-gray-200/60 select-none transition-colors duration-150 focus-within:bg-gray-200/60' 
                    : ''
                }`}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
                scope="col"
                aria-sort={column.sortable ? getAriaSortValue(column.key) : undefined}
                tabIndex={column.sortable ? 0 : undefined}
                onKeyDown={column.sortable ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSort(column.key);
                  }
                } : undefined}
                role={column.sortable ? 'columnheader button' : 'columnheader'}
                aria-label={column.sortable ? `Sort by ${column.header}` : column.header}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <span className="flex-shrink-0">
                      {getSortIcon(column.key)}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {renderTableContent()}
      </table>
    </div>
  );
}

export default DataTable;
export type { DataTableProps, Column };
