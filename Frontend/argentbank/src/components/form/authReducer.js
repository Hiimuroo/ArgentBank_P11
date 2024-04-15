// Importation des fonctions `createSlice` et `createAsyncThunk` depuis Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
// Importation du module axios pour effectuer des requêtes HTTP
import axios from 'axios';
// Définition de l'état initial de l'authentification
const initialState = {
    credentials: '', // Informations d'identification de l'utilisateur
    token: '', // Token d'authentification
    connected: false, // Indique si l'utilisateur est connecté
    status: 'idle', // État actuel de l'authentification (idle, loading, succeeded, failed)
    error: null, // Erreur rencontrée lors de l'authentification
};
// URL de base de l'API pour la connexion de l'utilisateur
const BASE_URL = 'http://localhost:3001/api/v1/user/login';
// Création d'une action asynchrone pour obtenir le token d'authentification de l'utilisateur
export const getUserToken = createAsyncThunk(
    'auth/getUserToken', // Nom de l'action
    async (credentials, { rejectWithValue }) => { // Fonction asynchrone pour effectuer la requête HTTP
        try {
            // Envoi d'une requête POST à l'API pour obtenir le token d'authentification
            const response = await axios.post(BASE_URL, credentials);
            const token = response.data.body.token; // Extraction du token de la réponse
            localStorage.setItem('token', token); // Stockage du token dans le stockage local
            return token; // Renvoie du token
        } catch (error) { // Gestion des erreurs
            // Renvoie de l'erreur avec la valeur rejetée en cas d'échec de la requête
            return rejectWithValue(error.response ? error.response.data : 'Serveur non connecté');
        }
    }
);
// Création d'un slice Redux pour gérer l'état de l'authentification
export const authSlice = createSlice({
    name: 'auth', // Nom du slice
    initialState, // État initial
    reducers: {
        // Reducer pour effacer l'erreur
        clearError: (state) => {
            state.error = null; // Réinitialisation de l'erreur à `null`
        }
    },
    extraReducers: (builder) => { // Gestion des actions asynchrones
        builder
            // Gestion de l'action de récupération du token en cours
            .addCase(getUserToken.pending, (state) => {
                state.status = 'loading'; // Définition de l'état comme en cours de chargement
            })
            // Gestion de l'action de récupération du token réussie
            .addCase(getUserToken.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Définition de l'état comme réussi
                state.token = action.payload; // Stockage du token dans l'état
                state.connected = true; // Définition de l'utilisateur comme connecté
            })
            // Gestion de l'action de récupération du token rejetée
            .addCase(getUserToken.rejected, (state, action) => {
                state.status = 'failed'; // Définition de l'état comme ayant échoué
                state.error = action.payload.message || 'Serveur non connecté'; // Gestion de l'erreur
            });
    },
});
// Sélecteurs pour récupérer des parties spécifiques de l'état de l'authentification
export const selectAuthStatus = (state) => state.auth.status; // Sélecteur pour l'état de l'authentification
export const selectAuthError = (state) => state.auth.error; // Sélecteur pour l'erreur d'authentification
export const selectAuthToken = (state) => state.auth.token; // Sélecteur pour le token d'authentification
// Actions exportées du slice pour être utilisées dans d'autres parties de l'application
export const { clearError } = authSlice.actions;
// Exportation du reducer du slice pour être inclus dans le store Redux
export default authSlice.reducer;