import { Form } from './components/Form';
import { Trans } from '@lingui/macro';
import styles from './contact-form.module.scss';

function ContactForm() {
  return (
    <div className={styles.wrapper}>
      <p className={styles['page-title']}>
        <Trans>Contact Form</Trans>
      </p>
      <Form />
    </div>
  );
}

export default ContactForm;
