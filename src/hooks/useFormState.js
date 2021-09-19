import { useState } from "react";

const useFormState = (baseData, submitData, reset) => {
  const [formData, setFormData] = useState(baseData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData(formData);
    if (reset) {
      setFormData({ ...baseData });
    }
  };

  return [formData, handleChange, handleSubmit];
};

export default useFormState;
