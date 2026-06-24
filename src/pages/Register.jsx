import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand.jsx";
import { heroAssets } from "../data/assets.js";
import { useSuperStore } from "../store/useSuperStore.js";

const emptyForm = {
  name: "",
  username: "",
  email: "",
  mobile: "",
  consent: false,
};

export default function Register() {
  const navigate = useNavigate();
  const setUser = useSuperStore((state) => state.setUser);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    const namePattern = /^[A-Za-z ]{2,}$/;
    const usernamePattern = /^[A-Za-z0-9_]{3,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;

    if (!namePattern.test(form.name.trim())) {
      nextErrors.name = "Enter a valid name.";
    }
    if (!usernamePattern.test(form.username.trim())) {
      nextErrors.username = "Use at least 3 letters, numbers, or underscores.";
    }
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!mobilePattern.test(form.mobile.trim())) {
      nextErrors.mobile = "Mobile number must be exactly 10 digits.";
    }
    if (!form.consent) {
      nextErrors.consent = "Please allow Superapp to use this registration data.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setUser({
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
    });
    navigate("/categories");
  }

  return (
    <main className="register-page">
      <section
        className="register-page__art"
        style={{ backgroundImage: `url("${heroAssets.registerHero}")` }}
      >
        <h1>Discover new things on Superapp</h1>
      </section>
      <section className="register-page__form">
        <Brand />
        <p>Create your new account</p>
        <form onSubmit={handleSubmit} noValidate>
          {[
            ["name", "Name", "text"],
            ["username", "UserName", "text"],
            ["email", "Email", "email"],
            ["mobile", "Mobile", "tel"],
          ].map(([name, placeholder, type]) => (
            <label key={name} className="field">
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                aria-invalid={Boolean(errors[name])}
              />
              {errors[name] && <span>{errors[name]}</span>}
            </label>
          ))}
          <label className="checkbox-field">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
            />
            <span>Share my registration data with Superapp</span>
          </label>
          {errors.consent && <p className="form-error">{errors.consent}</p>}
          <button type="submit" className="primary-button">SIGN UP</button>
        </form>
        <p className="legal-copy">
          By clicking on Sign up, you agree to Superapp Terms and Conditions of
          Use.
        </p>
        <p className="legal-copy">
          To learn more about how Superapp collects, uses, shares and protects
          your personal data please read Superapp Privacy Policy.
        </p>
      </section>
    </main>
  );
}
