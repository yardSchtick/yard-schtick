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

        var {start_time, end_time, sale_desc} = req.body
        var { id } = req.session.user

        db.sale.create_sale(id, start_time, end_time, sale_desc).then(result => res.send({gift: 'hello'}))
    },


    // PUT
    updateSale: (req, res) => {
        const db = req.app.get('db')

        var {start_time, end_time, sale_desc, id} = req.body

        db.sale.update_sale(start_time, end_time, sale_desc, id).then(result => res.send(result))
    },
    updateUser: (req, res) => {
        const db = req.app.get('db')

        var {id, address_street, address_city, address_state, address_zip, user_img, user_name} = req.body

        db.users.update_user(address_street, address_city, address_state, address_zip, user_name, user_img, id).then(result => res.send(result))
    },
    updateInventory: (req, res) => {
        const db= req.app.get('db')
        const { id } = req.session.user
        const { inv_name, inv_picture, inv_desc, inv_price } = req.body

        db.inventory.update_inventory([inv_name, inv_picture, inv_desc, inv_price])
        .then((data) => res.status(200).send(data[0]))
        .catch(() => res.status(500).send())
    },

    // DELETE
    deleteOneInv: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.session.user

        db.inventory.delete_one_inventory([sale_user, id])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send())
    }
}