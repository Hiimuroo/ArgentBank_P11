import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Importation de createAsyncThunk et createSlice depuis Redux Toolkit
import axios from 'axios'; // Importation du module axios pour effectuer des requêtes HTTP
// INITIATION DE L'ETAT INITIAL
const initialState = {
    email: '', // Champ pour stocker l'e-mail de l'utilisateur
    firstName: '', // Champ pour stocker le prénom de l'utilisateur
    lastName: '', // Champ pour stocker le nom de famille de l'utilisateur
    userName: '', // Champ pour stocker le nom d'utilisateur de l'utilisateur
    createdAt: '', // Champ pour stocker la date de création du profil de l'utilisateur
    updatedAt: '', // Champ pour stocker la date de mise à jour du profil de l'utilisateur
    id: '', // Champ pour stocker l'identifiant de l'utilisateur
};
// API RÉCUPÉRATION DES DONNÉES DE L'UTILISATEUR
export const fetchUserData = createAsyncThunk(
    'user/getUserData', // Nom de l'action pour récupérer les données utilisateur
    async () => {
        const token = localStorage.getItem('token'); // Récupération du token d'authentification depuis le stockage local
        const res = await axios({ // Envoi d'une requête HTTP avec axios
            method: 'post', // Méthode POST
            url: 'http://localhost:3001/api/v1/user/profile', // URL de l'API pour récupérer le profil utilisateur
            headers: { Authorization: `Bearer ${token}` }, // En-tête d'autorisation avec le token
        });
        return res.data.body; // Renvoie des données de la réponse de l'API
    }
);
// API CHANGEMENT D'USERNAME
export const updateUserData = createAsyncThunk(
    'user/updateUserData', // Nom de l'action pour mettre à jour les données utilisateur
    async (data) => {
        const res = await axios({ // Envoi d'une requête HTTP avec axios
            method: 'put', // Méthode PUT
            url: 'http://localhost:3001/api/v1/user/profile', // URL de l'API pour mettre à jour le profil utilisateur
            headers: { Authorization: `Bearer ${data.token}` }, // En-tête d'autorisation avec le token
            data: data.userNames, // Données à envoyer dans le corps de la requête
        });

        return { userData: res.data.body, newUserName: data.userNames.userName }; // Renvoie des données de la réponse de l'API et du nouveau nom d'utilisateur
    }
);
// Création du slice pour gérer l'état de l'utilisateur
export const userSlice = createSlice({
    name: 'user', // Nom du slice
    initialState, // État initial
    reducers: {
        // Reducer pour vider les données utilisateur (local)
        emptyUserData(state) {
            // Réinitialise tous les champs de l'état de l'utilisateur à des valeurs vides
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.userName = '';
            state.id = '';
            state.createdAt = '';
            state.updatedAt = '';
        },
        // Reducer pour définir le nom d'utilisateur
        setUserName(state, action) {
            // Modifie le champ userName de l'état avec la valeur fournie dans l'action
            state.userName = action.payload;
        },
        // Reducer pour effacer le nom d'utilisateur
        clearUserName(state) {
            // Réinitialise le champ userName de l'état à une valeur vide
            state.userName = '';
        },
    },
    // Gestion des actions asynchrones (http)
    extraReducers: (builder) => {
        builder
            // Gestion de l'action de récupération des données utilisateur réussie
            .addCase(fetchUserData.fulfilled, (state, { payload }) => {
                // Met à jour l'état avec les données de l'utilisateur récupérées depuis l'API
                state.email = payload.email;
                state.firstName = payload.firstName;
                state.lastName = payload.lastName;
                state.userName = payload.userName;
                state.id = payload.id;
                state.createdAt = payload.createdAt;
                state.updatedAt = payload.updatedAt;
            })
            // Gestion de l'action de mise à jour des données utilisateur réussie
            .addCase(updateUserData.fulfilled, (state, { payload }) => {
                // Met à jour l'état avec les nouvelles données de l'utilisateur après la mise à jour
                state.firstName = payload.userData.firstName;
                state.lastName = payload.userData.lastName;
                state.updatedAt = payload.userData.updatedAt;
                state.userName = payload.newUserName;
            });
    },
});
// Sélecteur pour récupérer les données utilisateur depuis le state Redux
export const getUserData = (state) => state.user;
// Exportation des actions et du reducer
export const { emptyUserData, setUserName } = userSlice.actions;
export const userReducer = userSlice.reducer;
