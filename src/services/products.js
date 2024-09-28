// apiService.js
import axios from 'axios';

const API_KEY = '72njgfa948d9aS7gs5';

// Function to fetch products from the API
export const fetchProducts = async (page , searchKey) => {
    try {
        const response = await axios.get(`https://stageapi.monkcommerce.app/task/products/search?&page=2&limit=10`, {
            headers: {
                'X-API-Key': API_KEY, // Pass the API key in the headers
            },
        });
        return response; // Return the response data
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to fetch products. Please try again later.'); // Throw an error to be caught in the component
    }
};
