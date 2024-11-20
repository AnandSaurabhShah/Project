import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import 'aos/dist/aos.css';

import Layout from './layout/Layout';
import Home from './pages/Home';
import AutismForm from './pages/AutismForm';

const App = () => {
  return (
    <HelmetProvider>
      < Helmet titleTemplate='%s| Autism Predictor' defaultTitle='Autism Predictor' />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/Autism-form' element={<AutismForm />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;