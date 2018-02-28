// module.exports = {
//     checkForSession : (req, res, next) => {
//         // console.log(req.session.cart);
//         if(!req.session.user) {//is this where it is checking to see if they have visisted before?
//             req.session.user = []
//             // console.log('something more descriptive');

//         }
//         // req.session.cart = [('hello')];
//         next();
//     }
// }