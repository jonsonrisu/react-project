export default function validate(values) {
    let errors = {};
    if (!values.title) {
      errors.title = 'Title is required';
    }  else if (values.title.length < 5) {
      errors.title = 'Title must be 5 characters';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    } else if (values.description.length < 50) {
      errors.description = 'Description must be 50 or more characters';
    }
    if (!values.status) {
        errors.status = 'Status is required';
      }
    return errors;
  };