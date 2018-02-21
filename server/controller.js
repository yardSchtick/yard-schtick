module.exports = {

    // GETS

    getUser: (req, res) => {
        const db = req.app.get('db')

        var { id } = req.session.user

        db.users.find_user(id).then(result => 
            res.send(result))
    },

    getAllSales: (req, res) => {
        const db = req.app.get('db')

        db.sale.find_all_sales().then(result => {
            res.status(200).send(result)
        })
    },

    getInventory: (req, res) => {
        const db = req.app.get('db')

        var {id} = req.params

        db.inventory.find_one_inventory(id).then(result => res.send(result))
    },

    getUserSales: (req, res) => {
        const db = req.app.get('db')

        var { id } = req.session.user

        db.sale.find_one_sale(id).then(result => res.send(result))
    },

    // POSTS

    newSale: (req, res) => {
        const db = req.app.get('db')

        var {start_time, end_time, sale_desc, sale_name, start_date, end_date, sale_img} = req.body
        var { id } = req.session.user

        db.sale.create_sale(id, start_time, end_time, sale_desc, sale_name, start_date, end_date, sale_img).then(result => res.send({gift: 'hello'}))
    },

    newInventory: (req, res) => {
        const db = req.app.get('db')

        var {inv_name, inv_picture, inv_desc, inv_price, sale_id} = req.body

        db.inventory.create_inventory(inv_name, inv_picture, inv_desc, inv_price, sale_id).then(result => res.send(result))
    },


    // PUT
    updateSale: (req, res) => {
        const db = req.app.get('db')

        var {start_time, end_time, sale_desc, id, sale_name, start_date, end_date, sale_img} = req.body

        db.sale.update_sale(start_time, end_time, sale_desc, id, sale_name, start_date, end_date, sale_img).then(result => res.send(result))
    },

    updateUser: (req, res) => {
        const db = req.app.get('db')

        var {id, address_street, address_city, address_state, address_zip, user_img, user_name} = req.body

        db.users.update_user(address_street, address_city, address_state, address_zip, user_name, user_img, id).then(result => res.send(result))
    },

    //DELETE
    deleteSale: (req, res) => {
        const db = req.app.get('db')

        db.sale.delete_one_sale(req.params.id).then(result => res.send({gift: 'hello'}))
    }
}