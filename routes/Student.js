var express = require('express');
var router = express.Router();
const Student_controlers= require('../controllers/Student');
/* GET home page. */
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    console.log(req.session.returnTo);
    res.redirect("/login");
}
router.get('/',secured, Student_controlers.Student_view_all_Page);
router.get('/detail',secured, Student_controlers.Student_view_one_Page);
/* GET create Student page */
router.get('/create',secured, Student_controlers.Student_create_Page);
router.get('/update',secured, Student_controlers.Student_update_Page);
router.get('/delete',secured, Student_controlers.Student_delete_Page);
module.exports = router;
