import axios from 'axios';

module.exports = {
    getAllSales:  () => {
        return axios.get('/api/getAllSales').then(res => {
            return res.data
        })
    }
}