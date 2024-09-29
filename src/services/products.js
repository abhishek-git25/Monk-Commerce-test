// apiService.js
import axios from 'axios';

const API_KEY = '72njgfa948d9aS7gs5';

// Function to fetch products from the API
export const fetchProducts = async (page = 1, searchKey) => {
    try {
        console.log(searchKey , "9");
        
        // Construct the URL dynamically based on the searchKey
        const url = `https://stageapi.monkcommerce.app/task/products/search?page=${page}&limit=10${searchKey ? `&search=${searchKey}` : ''}`;
        
        const response = await axios.get(url, {
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
