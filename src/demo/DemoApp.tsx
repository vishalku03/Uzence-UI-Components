import React, { useEffect, useState } from 'react';
import { InputField, DataTable } from '../components';
import type { Column } from '../components';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Editor', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', role: 'User', status: 'pending', joinDate: '2023-04-05' },
  { id: 5, name: 'David Brown', email: 'david.brown@example.com', role: 'Admin', status: 'active', joinDate: '2023-05-12' },
];


const DemoApp: React.FC = () => {
  // InputField states
  const [searchValue, setSearchValue] = useState('');
  const [searchValue1, setSearchValue1] = useState('');
  const [demoEmailValue, setDemoEmailValue] = useState('');
  const [demoEmailError, setDemoEmailError] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [demoNameValue, setDemoNameValue] = useState('');
  const [demoNameError, setDemoNameError] = useState('');
  const [smallInputValue, setSmallInputValue] = useState('');

  // Form validation states
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');

  // DataTable states
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentData, setCurrentData] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);


  // Demo email validation
  const validateDemoEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setDemoEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setDemoEmailError('Please enter a valid email address');
    } else {
      setDemoEmailError('');
    }
  };

  // Form email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  useEffect(() => {
    setFilteredUsers(currentData)
  }, [currentData])

  // Filter users based on search input
  useEffect(() => {
    const term = searchValue.trim().toLowerCase();
    if (!term) {
      setFilteredUsers(currentData);
      return;
    }
    setFilteredUsers(
      currentData.filter((u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term) ||
        u.status.toLowerCase().includes(term)
      )
    );
  }, [searchValue, currentData]);

  // Demo name validation (isolated from form)
  const validateDemoName = (name: string) => {
    if (!name.trim()) {
      setDemoNameError('Name is required');
    } else if (name.trim().length < 2) {
      setDemoNameError('Name must be at least 2 characters');
    } else {
      setDemoNameError('');
    }
  };

  // Name validation
  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError('Name is required');
    } else if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
    } else {
      setNameError('');
    }
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: User['status'] }> = ({ status }) => {
    const getStatusColor = (status: User['status']) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'inactive': return 'bg-red-100 text-red-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // DataTable columns configuration
  const columns: Column<User>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value as User['status']} />,
    },
    {
      key: 'joinDate',
      header: 'Join Date',
      sortable: true,
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
  ];

  // Simulate loading and load sample data
  const handleLoadingDemo = () => {
    console.log('Loading demo started');
    setIsLoading(true);
    setTimeout(() => {
      console.log('Setting currentData to:', sampleUsers);
      setCurrentData(sampleUsers);
      setIsLoading(false);
      console.log('Loading demo completed');
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateName(nameValue);
    validateEmail(emailValue);

    if (!nameError && !emailError && nameValue && emailValue) {
      alert(`Form submitted!\nName: ${nameValue}\nEmail: ${emailValue}`);
    }
  };

  return (
    <div className="min-h-screen w-full py-8">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Uzence UI Components Demo
          </h1>
          <p className="text-lg text-gray-600">
            Interactive showcase of InputField and DataTable components
          </p>
        </div>

        {/* InputField Demo Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">InputField Component</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Search Input */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Search (Ghost Variant)</h3>
              <InputField
                value={searchValue1}
                onChange={(e) => setSearchValue1(e.target.value)}
                label="Search Users"
                placeholder="Search by name, email, or role..."
                variant="ghost"
                size="md"
                helperText="Demo input - type to test functionality"
              />
            </div>

            {/* Email Input with Validation */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Email (Outlined with Validation)</h3>
              <InputField
                value={demoEmailValue}
                onChange={(e) => {
                  setDemoEmailValue(e.target.value);
                  validateDemoEmail(e.target.value);
                }}
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                variant="outlined"
                size="md"
                invalid={!!demoEmailError}
                errorMessage={demoEmailError}
                helperText={!demoEmailError ? "Demo email validation" : undefined}
              />
            </div>

            {/* Password Input */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Password (Filled Variant)</h3>
              <InputField
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                label="Password"
                type="password"
                placeholder="Enter your password"
                variant="filled"
                size="md"
                helperText="Password will be hidden"
              />
            </div>

            {/* Name Input with Validation */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Name (Large Size)</h3>
              <InputField
                value={demoNameValue}
                onChange={(e) => {
                  setDemoNameValue(e.target.value);
                  validateDemoName(e.target.value);
                }}
                label="Full Name"
                placeholder="Enter your full name"
                variant="outlined"
                size="lg"
                invalid={!!demoNameError}
                errorMessage={demoNameError}
              />
            </div>

            {/* Disabled Input */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Disabled State</h3>
              <InputField
                value="This field is disabled"
                onChange={() => { }}
                label="Disabled Field"
                placeholder="Cannot edit this"
                variant="outlined"
                size="md"
                disabled
                helperText="This field cannot be edited"
              />
            </div>

            {/* Small Size Input */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Small Size</h3>
              <InputField
                value={smallInputValue}
                onChange={(e) => setSmallInputValue(e.target.value)}
                label="Compact Input"
                placeholder="Small input field"
                variant="outlined"
                size="sm"
                helperText="Compact size for tight spaces"
              />
            </div>
          </div>

          {/* Form Demo */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Form Example</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                    validateName(e.target.value);
                  }}
                  label="Full Name *"
                  placeholder="Enter your name"
                  invalid={!!nameError}
                  errorMessage={nameError}
                />
                <InputField
                  value={emailValue}
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  label="Email Address *"
                  type="email"
                  placeholder="Enter your email"
                  invalid={!!emailError}
                  errorMessage={emailError}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>

        {/* DataTable Demo Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">DataTable Component</h2>
            <div className="flex space-x-3">
              <button
                onClick={handleLoadingDemo}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Show Loading
              </button>
              <button
                onClick={() => setCurrentData([])}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Clear Data
              </button>
            </div>
          </div>

          {/* Selection Info */}
          {selectedUsers.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>{selectedUsers.length}</strong> user{selectedUsers.length !== 1 ? 's' : ''} selected:
                <span className="ml-2">
                  {selectedUsers.map(user => user.name).join(', ')}
                </span>
              </p>
            </div>
          )}

          {/* DataTable */}
          <DataTable
            data={filteredUsers}
            columns={columns}
            selectable
            onRowSelect={setSelectedUsers}
            loading={isLoading}
          />

          {/* Features List */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">DataTable Features Demonstrated:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Sorting:</strong> Click column headers to sort (ID, Name, Email, Role, Status, Join Date)</li>
              <li>• <strong>Selection:</strong> Use checkboxes to select individual rows or select all</li>
              <li>• <strong>Custom Rendering:</strong> Status badges and formatted dates</li>
              <li>• <strong>Loading State:</strong> Click "Show Loading" to see loading spinner</li>
              <li>• <strong>Empty State:</strong> Click "Clear Data" to see empty state</li>
              <li>• <strong>Filtering:</strong> Use the search input above to filter data</li>
              <li>• <strong>Responsive:</strong> Table scrolls horizontally on smaller screens</li>
              <li>• <strong>Accessibility:</strong> Full keyboard navigation and screen reader support</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default DemoApp;
