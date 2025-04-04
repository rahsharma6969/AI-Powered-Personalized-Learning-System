import axios from 'axios';

export const getRecommendations = async (req, res) => {
    const { response } = req.body;

    try {
        const { data } = await axios.post('http://localhost:8000/recommend', { response });
        res.json(data);
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        res.status(500).send('Internal Server Error');
    }
};


