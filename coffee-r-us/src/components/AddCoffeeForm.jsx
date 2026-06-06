// AddCoffeeForm.jsx
// Controlled form that POSTs a new coffee to the backend.
// Uses useId for accessible label/input associations.
// Validates required fields before submission.

import { useState, useId } from "react";

function AddCoffeeForm({ onAddCoffee }) {
  // useId generates stable unique IDs for label-input pairs (accessibility)
  const baseId = useId();

  const [form, setForm] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
    image: "",
  });

  // Track validation errors per field
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim())        newErrors.name = "Name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.origin.trim())      newErrors.origin = "Origin is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
      newErrors.price = "Enter a valid price";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    onAddCoffee({
      ...form,
      price: parseFloat(form.price),
      image:
        form.image ||
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80",
    }).then(() => {
      setForm({ name: "", description: "", origin: "", price: "", image: "" });
      setSubmitting(false);
    });
  }

  // Helper: render a labelled input with error message
  function Field({ label, name, type = "text", placeholder }) {
    return (
      <div className="form-group">
        <label htmlFor={`${baseId}-${name}`}>{label}</label>
        <input
          id={`${baseId}-${name}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
        />
        {errors[name] && <p className="error-msg">{errors[name]}</p>}
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2>Add New Coffee</h2>
      <form onSubmit={handleSubmit} noValidate>
        <Field label="Coffee Name" name="name" placeholder="e.g. Vanilla Bean" />
        <Field label="Description" name="description" placeholder="Roast type and flavor notes" />
        <Field label="Origin" name="origin" placeholder="e.g. Colombia" />
        <Field label="Price ($)" name="price" type="number" placeholder="e.g. 12.00" />
        <Field label="Image URL (optional)" name="image" placeholder="https://..." />
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Adding…" : "Add Coffee"}
        </button>
      </form>
    </div>
  );
}

export default AddCoffeeForm;