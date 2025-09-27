import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import InputField from '../InputField';

const noop = () => {};

describe('InputField (SSR)', () => {
  it('renders label and associates it with input via htmlFor/id', () => {
    const html = renderToString(
      <InputField
        id="email"
        label="Email"
        value=""
        onChange={noop as any}
        placeholder="you@example.com"
      />
    );
    expect(html).toContain('<label');
    expect(html).toContain('for="email"');
    expect(html).toContain('id="email"');
  });

  it('applies aria-invalid and error messaging when invalid', () => {
    const html = renderToString(
      <InputField
        id="username"
        label="Username"
        value="bad"
        onChange={noop as any}
        invalid
        errorMessage="Required"
      />
    );
    // input has aria-invalid and aria-errormessage
    expect(html).toMatch(/aria-invalid="true"/);
    expect(html).toMatch(/aria-errormessage="username-error"/);
    // error container exists and is linked
    expect(html).toMatch(/id="username-error"/);
    expect(html).toMatch(/role="alert"/);
    expect(html).toContain('Required');
  });

  it('describes input with helper text when not invalid', () => {
    const html = renderToString(
      <InputField
        id="firstName"
        label="First name"
        value="John"
        onChange={noop as any}
        helperText="This will be public"
      />
    );
    expect(html).toMatch(/aria-describedby="firstName-help"/);
    expect(html).toMatch(/id="firstName-help"/);
    expect(html).toContain('This will be public');
  });

  it('renders clear button when value is non-empty and not disabled', () => {
    const html = renderToString(
      <InputField
        id="city"
        label="City"
        value="NYC"
        onChange={noop as any}
        showClearButton
      />
    );
    // Clear button has accessible label
    expect(html).toContain('aria-label="Clear City"');
  });

  it('renders password toggle with accessible labels', () => {
    const html = renderToString(
      <InputField
        id="pwd"
        label="Password"
        type="password"
        value="secret"
        onChange={noop as any}
      />
    );
    // Default state is hidden password, so button should say Show password
    expect(html).toContain('aria-label="Show password"');
  });

  it('applies light theme classes by default (outlined)', () => {
    const html = renderToString(
      <InputField
        id="company"
        label="Company"
        value="ACME"
        onChange={noop as any}
        variant="outlined"
      />
    );
    // outlined light uses border-gray-300 on the input
    expect(html).toContain('border-gray-300');
  });

  it('applies dark theme classes when theme="dark"', () => {
    const html = renderToString(
      <InputField
        id="phone"
        label="Phone"
        value=""
        onChange={noop as any}
        theme="dark"
        variant="outlined"
      />
    );
    // label color for dark theme
    expect(html).toContain('text-gray-200');
    // outlined dark uses border-gray-600 on the input
    expect(html).toContain('border-gray-600');
  });
});
