const axios = require('axios');

module.exports = {
    getAllSales: () => {
        return axios.get('/api/getAllSales').then(res => {
            return res.data
        })
    },
    formatDate: (str1, str2) => {
        var tempArr1 = []
        var tempArr2 = []
        var tempDate = str1.split('-').reverse()
        tempArr1[0] = tempDate[1]
        tempArr1[1] = tempDate[0]
        tempArr1[2] = tempDate[2]
        tempDate = str2.split('-').reverse()
        tempArr2[0] = tempDate[1]
        tempArr2[1] = tempDate[0]
        tempArr2[2] = tempDate[2]
        return tempArr1.join('/') + ' - ' + tempArr2.join('/')
    },
    countTrack: (e, num) => {
        return num - e.split('').length
    },
    formatTime: (start, end) => {
        return start.split('').splice(0,5).join('') + ' - ' + end.split('').splice(0,5).join('')
    },
    getAddress:(str) =>{
        let getGeoForAddress = str
        return axios.get(`/api/geo/${getGeoForAddress}`).then((response) => {
            console.log(response.data)
            return response.data
        })
    },
    getAddress2:(str) =>{
        let getGeoForAddress = str
        return axios.get(`/api/geo/${getGeoForAddress}`).then((response) => {
            return response.data.results[0].geometry.location
        })
    },
    getAddress3:(str) =>{
        let getGeoForAddress = str
        return axios.get(`/api/geo/${getGeoForAddress}`).then((response) => {
            return response.data.results[0].geometry.location.lat
        })
    }
}