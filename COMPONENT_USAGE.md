# Component Usage Examples

Complete examples for using the new UI/UX components in your application.

---

## Navigation Component

### Basic Usage
The Navigation component is automatically used when you import Header:

```jsx
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      {/* Page content */}
    </div>
  );
}
```

### Features
- Automatic scroll detection for styling changes
- Active route highlighting based on current path
- Mobile hamburger menu at < 768px
- Full keyboard navigation support
- ARIA labels for accessibility

---

## Button Component

### Primary Button (Default)
```jsx
import Button from '../components/Button';

<Button variant="primary" size="large">
  Click Me
</Button>
```

### With Icon
```jsx
<Button 
  variant="primary" 
  size="large"
  icon="→"
  iconPosition="right"
>
  Start Learning
</Button>

<Button 
  variant="primary"
  icon="✓"
  iconPosition="left"
>
  Confirm
</Button>
```

### Different Variants
```jsx
{/* Primary - Default, most important action */}
<Button variant="primary">Primary Button</Button>

{/* Secondary - Secondary actions */}
<Button variant="secondary">Secondary Button</Button>

{/* Outline - Alternative style */}
<Button variant="outline">Outline Button</Button>

{/* Ghost - Minimal style */}
<Button variant="ghost">Ghost Button</Button>

{/* Danger - Destructive actions */}
<Button variant="danger">Delete</Button>

{/* Success - Positive actions */}
<Button variant="success">Confirm</Button>
```

### Different Sizes
```jsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Full Width
```jsx
<Button fullWidth>Full Width Button</Button>
```

### Loading State
```jsx
const [isLoading, setIsLoading] = useState(false);

<Button 
  isLoading={isLoading}
  disabled={isLoading}
  onClick={async () => {
    setIsLoading(true);
    // Do something
    setIsLoading(false);
  }}
>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

### As Link
```jsx
<Button href="/contact" variant="primary">
  Go to Contact
</Button>

<Button href="/courses" icon="→" iconPosition="right">
  View Courses
</Button>
```

### Disabled State
```jsx
<Button disabled>Disabled Button</Button>
```

---

## FormInput Component

### Basic Email Input
```jsx
import FormInput from '../components/FormInput';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleBlur = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError('Invalid email');
    }
  };

  return (
    <FormInput
      label="Email Address"
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={handleBlur}
      error={error}
      placeholder="you@example.com"
      required
    />
  );
}
```

### With Validation
```jsx
const [name, setName] = useState('');
const [nameError, setNameError] = useState('');
const [touched, setTouched] = useState(false);

const validateName = (value) => {
  if (!value.trim()) return 'Name is required';
  if (value.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
};

<FormInput
  label="Full Name"
  type="text"
  name="name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  onBlur={() => {
    setTouched(true);
    setNameError(validateName(name));
  }}
  error={touched ? nameError : ''}
  placeholder="John Doe"
  required
/>
```

### Different Input Types
```jsx
{/* Text */}
<FormInput
  label="Username"
  type="text"
  name="username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

{/* Email */}
<FormInput
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

{/* Phone */}
<FormInput
  label="Phone Number"
  type="tel"
  name="phone"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  placeholder="+1 (555) 000-0000"
/>

{/* Password */}
<FormInput
  label="Password"
  type="password"
  name="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

{/* Number */}
<FormInput
  label="Age"
  type="number"
  name="age"
  value={age}
  onChange={(e) => setAge(e.target.value)}
/>
```

---

## FormTextarea Component

### Basic Usage
```jsx
import FormTextarea from '../components/FormTextarea';

<FormTextarea
  label="Message"
  name="message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Type your message here..."
  rows={5}
/>
```

### With Character Limit
```jsx
const [message, setMessage] = useState('');
const [error, setError] = useState('');
const maxLength = 500;

const handleChange = (e) => {
  setMessage(e.target.value);
  if (e.target.value.length > maxLength) {
    setError('Message is too long');
  } else {
    setError('');
  }
};

<FormTextarea
  label="Comments"
  name="comments"
  value={message}
  onChange={handleChange}
  error={error}
  maxLength={maxLength}
  rows={6}
/>
```

### With Validation
```jsx
const [feedback, setFeedback] = useState('');
const [feedbackError, setFeedbackError] = useState('');
const [touched, setTouched] = useState(false);

const validateFeedback = (value) => {
  if (!value.trim()) return 'Feedback is required';
  if (value.trim().length < 10) return 'Feedback must be at least 10 characters';
  return '';
};

<FormTextarea
  label="Your Feedback"
  name="feedback"
  value={feedback}
  onChange={(e) => setFeedback(e.target.value)}
  onBlur={() => {
    setTouched(true);
    setFeedbackError(validateFeedback(feedback));
  }}
  error={touched ? feedbackError : ''}
  placeholder="Tell us what you think..."
  rows={6}
  maxLength={1000}
/>
```

---

## Complete Form Example

```jsx
import React, { useState } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error on change if field was touched
    if (touched[name] && errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate field
    const newErrors = { ...errors };
    switch (name) {
      case 'name':
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Form submitted:', formData);
      setSubmitted(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
      setTouched({});

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {submitted && (
        <div className="form-success" role="alert">
          <span className="message-icon">✓</span>
          <div>
            <strong>Success!</strong> Your message has been sent.
          </div>
        </div>
      )}

      <FormInput
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : ''}
        placeholder="John Doe"
        required
      />

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : ''}
        placeholder="you@example.com"
        required
      />

      <FormInput
        label="Subject"
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.subject ? errors.subject : ''}
        placeholder="How can we help?"
        required
      />

      <FormTextarea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.message ? errors.message : ''}
        placeholder="Tell us more..."
        required
        rows={6}
        maxLength={1000}
      />

      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        isLoading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

---

## Component Props Reference

### Button Props
```jsx
{
  children: ReactNode,              // Button text
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success',
  size: 'small' | 'medium' | 'large' | 'xl',
  disabled: boolean,
  isLoading: boolean,
  onClick: function,
  type: 'button' | 'submit' | 'reset',
  className: string,
  icon: string | ReactNode,
  iconPosition: 'left' | 'right',
  fullWidth: boolean,
  href: string,                     // Makes it a link
}
```

### FormInput Props
```jsx
{
  label: string,
  type: 'text' | 'email' | 'tel' | 'password' | 'number',
  name: string,
  value: string | number,
  onChange: function,
  onBlur: function,
  error: string,
  placeholder: string,
  required: boolean,
  'aria-label': string,
}
```

### FormTextarea Props
```jsx
{
  label: string,
  name: string,
  value: string,
  onChange: function,
  onBlur: function,
  error: string,
  placeholder: string,
  required: boolean,
  rows: number,                     // Default: 5
  maxLength: number,                // Default: 1000
  'aria-label': string,
}
```

---

## Styling Custom Forms

You can style form elements using these CSS classes:

```css
/* Form container */
.contact-form { }

/* Form group (wraps input + label + error) */
.form-group { }

/* Label */
.form-label { }

/* Required indicator */
.required { }

/* Input styling */
.form-input { }
.form-input:focus { }
.form-input.error { }

/* Textarea styling */
.form-textarea { }
.form-textarea:focus { }
.form-textarea.error { }

/* Error message */
.form-error-message { }

/* Character counter */
.char-count { }
```

---

## Tips & Best Practices

1. **Always validate on blur** - Provides better UX than validation on change
2. **Use touched state** - Show errors only after user interacts with field
3. **Provide helpful error messages** - Be specific about what's wrong
4. **Test loading states** - Ensure users see feedback during submission
5. **Keyboard navigate** - Test Tab and Enter keys
6. **Mobile test** - Check on actual mobile devices
7. **Dark mode test** - Test your forms in dark mode
8. **Accessibility test** - Use screen reader to verify

---

For more information, see `UIUX_IMPROVEMENTS.md` and `UI_UX_SUMMARY.md`.
