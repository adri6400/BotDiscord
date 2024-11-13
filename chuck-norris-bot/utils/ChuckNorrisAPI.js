// utils/ChuckNorrisAPI.js
const axios = require('axios');

class ChuckNorrisAPI {
    constructor() {
        this.baseURL = 'https://api.chucknorris.io';
    }

    async getRandomJoke() {
        try {
            const response = await axios.get(`${this.baseURL}/jokes/random`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la récupération de la blague aléatoire.');
        }
    }

    async getJokeCount() {
        try {
            const response = await axios.get(`${this.baseURL}/jokes/categories`);
            return response.data.length;
        } catch (error) {
            throw new Error('Erreur lors de la récupération du nombre de catégories.');
        }
    }

    async getCategories() {
        try {
            const response = await axios.get(`${this.baseURL}/jokes/categories`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des catégories.');
        }
    }

    async getRandomJokeByCategory(category) {
        try {
            const response = await axios.get(`${this.baseURL}/jokes/random`, {
                params: { category }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la blague pour la catégorie "${category}".`);
        }
    }

    async getJokeById(id) {
        try {
            const response = await axios.get(`${this.baseURL}/jokes/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la blague avec l'ID "${id}".`);
        }
    }
}

module.exports = new ChuckNorrisAPI();
