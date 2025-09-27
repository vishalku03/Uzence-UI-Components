import React, { useState } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  showClearButton?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = true
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  React.useEffect(() => {
    if (type === 'password') {
      setInputType(showPassword ? 'text' : 'password');
    } else {
      setInputType(type);
    }
  }, [type, showPassword]);
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'lg':
        return 'px-4 py-3 text-lg';
      default:
        return 'px-3 py-2 text-base';
    }
  };

  const getLabelSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  const getHelperTextSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  const getIconSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const getVariantStyles = () => {
    const hasIcons = (showClearButton && value && !disabled) || type === 'password';
    const rightPadding = hasIcons ? (size === 'sm' ? 'pr-8' : size === 'lg' ? 'pr-12' : 'pr-10') : '';
    const baseSizeStyles = getSizeStyles().replace(/px-\d+/, `pl-${size === 'sm' ? '2' : size === 'lg' ? '4' : '3'} ${rightPadding}`);
    const baseStyles = `${baseSizeStyles} transition-colors`;
    
    if (disabled) {
      return `${baseStyles} text-gray-500 px-4 cursor-not-allowed ${
        variant === 'filled' ? 'bg-gray-200 border-0' :
        variant === 'ghost' ? 'bg-transparent border-0 border-b border-gray-200' :
        'bg-gray-100 border border-gray-200 rounded-md shadow-sm'
      }`;
    }
    
    if (invalid) {
      return `${baseStyles} text-red-900 focus:outline-none ${
        variant === 'filled' ? 'bg-red-50 border-0 focus:bg-red-100' :
        variant === 'ghost' ? 'bg-transparent border-0 border-b-2 border-red-500 focus:border-red-600' :
        'bg-white border border-red-500 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500'
      }`;
    }
    
    return `${baseStyles} ${
      variant === 'filled' ? 'bg-gray-50 border-0 focus:outline-none focus:bg-gray-100' :
      variant === 'ghost' ? 'bg-transparent border-0 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-blue-500' :
      'bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    }`;
  };
  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ClearIcon = () => (
    <svg className={getIconSizeStyles()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className={getIconSizeStyles()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg className={getIconSizeStyles()} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  );

  return (
    <div className="flex flex-col space-y-2">
      <label className={`${getLabelSizeStyles()} font-medium text-gray-700`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={getVariantStyles()}
        />
        {((showClearButton && value && !disabled) || type === 'password') && (
          <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
            {showClearButton && value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                <ClearIcon />
              </button>
            )}
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
          </div>
        )}
      </div>
      <div className={`min-h-[1.25rem] ${getHelperTextSizeStyles()}`}>
        {(invalid && errorMessage) || errorMessage ? (
          <span className="text-red-600">{errorMessage}</span>
        ) : helperText ? (
          <span className="text-gray-500">{helperText}</span>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
export type { InputFieldProps };
