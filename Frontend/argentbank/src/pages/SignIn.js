import React from 'react';
import Navbar from '../components/layout/navbar/navbar';
import SignInForm from '../components/form/form.js';
import Footer from '../components/layout/footer/footer.js';

const SignInPage = () => {
  return (
    <body>
        <Navbar />
        <SignInForm />
        <Footer />
    </body>
  );
}

export default SignInPage;
