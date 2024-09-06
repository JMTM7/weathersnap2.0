import './styles/base/global.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from '@pages/Home';
import React from 'react';
/*import Weather from "pages/Weather";
import Form from "pages/Form";
import NotFound from "pages/NotFound"; */
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.appWrapper}>
      <Header />
      <div className={styles.appBody}>
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/weather/:city" element={<Weather />} />
          <Route path="/contact" element={<Form />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
