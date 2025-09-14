export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateName = (name) => {
  return name.trim().length >= 2
}

export const validateForm = (formData, isSignup = false) => {
  const errors = {}

  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters long"
  }

  if (isSignup) {
    if (!validateName(formData.name)) {
      errors.name = "Name must be at least 2 characters long"
    }

    if (!formData.role) {
      errors.role = "Please select a role"
    }

    if (!formData.region) {
      errors.region = "Please select a region"
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
