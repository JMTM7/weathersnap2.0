import './styles/base/global.scss';
import { Route, Routes } from 'react-router-dom';
import ContactForm from '@pages/ContactForm';
import Header from './components/Header';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Weather from '@pages/Weather';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <div className={styles.appBody}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/weather/:city" element={<Weather />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
