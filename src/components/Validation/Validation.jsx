export const validationRules = {
  username: {
    required: "Username is required.",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters long.",
    },
  },
  title: {
    required: "Title is required.",
    minLength: {
      value: 3,
      message: "Title must be at least 3 characters long.",
    },
    maxLength: {
      value: 50,
      message: "Title must be less than 50 characters long.",
    },
  },
  content: {
    required: "Content is required.",
    minLength: {
      value: 3,
      message: "Content must be at least 3 characters long.",
    },
  },
  email: {
    required: "Email is required.",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Please enter a valid email.",
    },
  },
  password: {
    required: "Password is required.",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long.",
    },
  },
};

export const validateField = (fieldName, value, formData = {}) => {
  const rules = validationRules[fieldName];
  if (!rules) return "";

  if (rules.required && !value.trim()) {
    return rules.required;
  }

  if (rules.minLength && value.length < rules.minLength.value) {
    return rules.minLength.message;
  }

  if (rules.maxLength && value.length > rules.maxLength.value) {
    return rules.maxLength.message;
  }

  if (rules.pattern && !rules.pattern.value.test(value)) {
    return rules.pattern.message;
  }

  if (rules.match) {
    const matchValue = formData[rules.match.field];
    if (value !== matchValue) {
      return rules.match.message;
    }
  }

  return ""; // No error
};
