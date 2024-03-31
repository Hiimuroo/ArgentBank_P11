import React from 'react';
import Account from './comptes';
import { useSelector } from 'react-redux';

const UserHome = () => {
  const { firstName, lastName } = useSelector((state) => state.user); // Affichage Prenom et Nom du client page accueil (userName si on veut afficher seulement son pseudo)

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back </h1>
        <h1> {firstName} {lastName} !</h1>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
      <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
      <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
    </main>
  );
}

export default UserHome