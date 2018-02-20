module.exports = {
    getUser: (req,res) => {
        const db = req.app.get('db')

        var {id} = req.user


    },
    getAllSales: (req,res) => {
        const db = req.app.get('db')
        db.sale.find_all_sales().then(result => res.send(result))
    }
}