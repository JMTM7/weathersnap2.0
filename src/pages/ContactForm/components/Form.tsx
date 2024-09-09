import React, { useEffect, useState } from 'react';
import PhonePrefixesData from '@data/phonePrefixes.json';
import { Trans } from '@lingui/macro';
import styles from './form.module.scss';

type PhonePrefix = {
  value: string;
  label: string;
};

function Form() {
  const [formValues, setFormValues] = useState({
    name: '',
    birth: '',
    city: '',
    email: '',
    phone: '',
    phonePrefix: '+44',
  });

  const [phonePrefixes, setPhonePrefixes] = useState<PhonePrefix[]>([]);

  useEffect(() => {
    setPhonePrefixes(PhonePrefixesData);
  }, []);

  const handleReset = () => {
    setFormValues({
      name: '',
      birth: '',
      city: '',
      email: '',
      phone: '',
      phonePrefix: '+44',
    });
  };

  const isFormComplete = () => {
    return Object.values(formValues).every((value) => value.trim() !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormValues({ ...formValues, phonePrefix: value });
  };

  return (
    <div className={styles['form-card']}>
      <form className={styles['form-container']} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <p className={styles['text-body']}>
            <Trans>Name</Trans>*:
          </p>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="John"
            required
            className={styles['text-input']}
          />
        </div>
        <div className={styles['form-group']}>
          <p className={styles['text-body']}>
            <Trans>Date of birth</Trans>*:
          </p>
          <input
            type="date"
            id="birth"
            name="birth"
            value={formValues.birth}
            onChange={handleInputChange}
            placeholder="20/10/12"
            required
            className={styles['text-input']}
          />
        </div>
        <div className={styles['form-group']}>
          <p className={styles['text-body']}>
            <Trans>City</Trans>*:
          </p>
          <input
            type="text"
            id="city"
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            placeholder="Toronto"
            required
            className={styles['text-input']}
          />
        </div>
        <div className={styles['form-group']}>
          <p className={styles['text-body']}>
            <Trans>Email</Trans>*:
          </p>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="test@gmail.com"
            required
            className={styles['text-input']}
          />
        </div>
        <div className={styles['form-group']}>
          <p className={styles['text-body']}>
            <Trans>Phone</Trans>*:
          </p>
          <div className={styles['row-center']} style={{ gap: '1rem' }}>
            <select
              id="phone-prefix"
              name="phone-prefix"
              value={formValues.phonePrefix}
              onChange={handleSelectChange}
              className={styles['select-input']}
            >
              {phonePrefixes.map((prefix) => (
                <option key={prefix.value} value={prefix.value}>
                  {prefix.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              placeholder="123456789"
              required
              className={styles['text-input']}
            />
          </div>
        </div>

        <div className={styles['row-center']} style={{ gap: '2rem' }}>
          <button
            type="button"
            onClick={handleReset}
            className={styles['button-reset']}
          >
            <Trans>Reset</Trans>
          </button>
          <button
            type="submit"
            disabled={!isFormComplete()}
            className={styles['button-global']}
          >
            <Trans>Submit</Trans>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
