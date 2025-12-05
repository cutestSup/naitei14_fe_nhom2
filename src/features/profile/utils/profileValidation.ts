import { commonValidations, ValidationErrors } from "@/lib/user.validator";
import { ProfileFormData } from "../types";

export const validateProfileForm = async (
  formData: ProfileFormData
): Promise<ValidationErrors> => {
  const errors: ValidationErrors = {};

  // Full name: required
  const fullNameError = commonValidations.fullNameRequired(formData.fullName);
  if (fullNameError) errors.fullName = fullNameError;

  // Phone: required, basic phone validation
  const phoneError = commonValidations.phoneRequired(formData.phone);
  if (phoneError) errors.phone = phoneError;

  // Website: optional, but if provided, valid URL
  const websiteError = commonValidations.websiteOptional(formData.website);
  if (websiteError) errors.website = websiteError;

  return errors;
};
