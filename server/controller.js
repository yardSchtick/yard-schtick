const axios = require('axios')
module.exports = {

    // GETS

    getUser: (req, res) => {
        res.send(req.user)
    },

    getAllSales: (req, res) => {
        const db = req.app.get('db')

        db.sale.find_all_sales().then(result => {
            res.status(200).send(result)
        })
    },

    getInventory: (req, res) => {
        const db = req.app.get('db')

        const { id } = req.params

        db.inventory.find_one_inventory([id]).then(result => res.send(result))
    },

    getUserSales: (req, res) => {
        const db = req.app.get('db')

        const { id } = req.params

        db.sale.find_one_sale([id]).then(result => res.send(result))
    },

    getDistance: (req, res) => {
        const db = req.app.get('db');
        const { longitude, latitude, distance } = req.query
        const id = req.user ? req.user.id : 0;
        
        db.sale.get_sale_by_distance([latitude, longitude, distance, id]).then(response => {
            res.status(200).send(response);
        })
    },
    getGeo: (req, res)=>{
        const db = req.app.get('db');
        axios({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.geo}&key=${process.env.API_KEY}`,
            method: 'get',
        }).then((response) => {
            res.status(200).send(response.data.results[0].geometry.location)
        }).catch((error) =>{
            console.log(error)
        })
    },
     // POSTS

    newSale: (req, res) => {
        const db = req.app.get('db')

        const { newSale, user_id } = req.body
        const { start_time, end_time, sale_desc, sale_name, start_date, end_date, sale_img } = newSale

        db.sale.create_sale([user_id, start_time, end_time, sale_desc, sale_name, start_date, end_date, sale_img]).then(result => res.send(result))
    },

    newInventory: (req, res) => {
        const db = req.app.get('db')

        const { inv_name, inv_picture, inv_desc, inv_price, sale_id } = req.body

        db.inventory.create_inventory(inv_name, inv_picture, inv_desc, inv_price, sale_id).then(result => res.send(result))
    },

    searchInventory: (req, res) => {
        const db = req.app.get('db')

        const { longitude, latitude, distance, search } = req.query
        const id = req.user ? req.user.id : 0;
        const searchTerm = '%' + search.toUpperCase() + '%'
        
        db.inventory.search_inventory(latitude, longitude, distance, id, searchTerm).then(result => {
            var tempArr = []
            var searches = result.filter((val,i) => {
                if (tempArr.indexOf(val.id) === -1) {
                    tempArr.push(val.id)
                    return val
                }
            })
            res.send(searches)
        })
    },

    // PUT
    updateSale: (req, res) => {
        const db = req.app.get('db')

        const { start_time, end_time, sale_desc, id, sale_name, start_date, end_date, sale_img } = req.body

        db.sale.update_sale(start_time, end_time, sale_desc, id, sale_name, start_date, end_date, sale_img).then(result => res.send(result))
    },

    updateUser: (req, res) => {
        const db = req.app.get('db')        
        const {id, address_street, address_city, address_state, address_zip, user_name, user_img, latitude, longitude} = req.body;

        db.users.update_user([address_street, address_city, address_state, address_zip, user_name, user_img, id, latitude, longitude]).then(result => res.send(result))
    },
    updateInventory: (req, res) => {
        const db = req.app.get('db')
        // const { sale_id } = req.session.user
        const { inv_name, inv_picture, inv_desc, inv_price, sale_id } = req.body

        db.inventory.update_inventory([inv_name, inv_picture, inv_desc, inv_price, sale_id])
            .then((data) => res.status(200).send(data[0]))
            .catch(() => res.status(500).send())
    },

    //DELETE
    deleteSale: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params;

        db.inventory.delete_all_inventory([id]).then(res2 => {
            db.sale.delete_one_sale([id, req.user.id]).then(result => {
                res.send(result)
            })
        })
    },

    deleteOneInv: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.inventory.delete_one_inventory([id])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    deleteAllInv: (req, res) => {
        const db = req.app.get('db')

    }

}