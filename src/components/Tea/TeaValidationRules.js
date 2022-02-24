export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }  else if (values.name.length < 3) {
    errors.name = 'Name must be 3 characters';
  }

  if (!values.keywords) {
      errors.keywords = 'Keywords is required';
  }
  if (!values.origin) {
      errors.origin = 'Origin is required';
    }
    if (!values.brew_time) {
      errors.brew_time = 'Brew Time is required';
    }
    else if(isNaN(values.brew_time)){
      errors.brew_time = 'Temperature is must be numeric ';
    }
    if (!values.temperature) {
      errors.temperature = 'Brew Time is required';
    }else if(isNaN(values.temperature)){
      errors.temperature = 'Temperature is must be numeric ';
    }
  return errors;
};