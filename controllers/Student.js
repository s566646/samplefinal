var Student = require('../models/Student');
// List of all Students

exports.Student_list = async function (req, res) {
    try {
        theStudent = await Student.find();
        res.send(theStudent);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific Student.
exports.Student_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Student.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Student create on POST.
exports.Student_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Student create POST');
};
// Handle Student delete form on DELETE.
exports.Student_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Student.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle Student update form on PUT.
exports.Student_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Student.findById(req.params.id)
        console.log(toUpdate);
        // Do updates of properties
        if (req.body.Stu_Name) toUpdate.Stu_Name = req.body.Stu_Name;
        if (req.body.Stu_Age) toUpdate.Stu_Age = req.body.Stu_Age;
        if (req.body.Mail_Id) toUpdate.Mail_Id = req.body.Mail_Id;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
        
    } catch (err) {
        // console.log(err);
        var temp = Object.keys(err.errors)[0]
        console.log(JSON.stringify(err.errors[temp].message));
        res.status(500)
        res.send(`{'error': '${err}'}`);
    // res.send(`{"error": "${err.errors[temp].message} failed"}`);
    }
};
exports.Student_view_all_Page = async function (req, res) {
    try {
        theStudent = await Student.find();
        res.render('Student', { title: 'Student Search Results', results: theStudent });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
exports.Student_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Student.findById(req.query.id)
        res.render('Studentdetail',
            { title: 'Student Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
exports.Student_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Student();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Student_type":"goat", "cost":12, "size":"large"}
    document.Stu_Name = req.body.Stu_Name;
    document.Stu_Age = req.body.Stu_Age;
    document.Mail_Id = req.body.Mail_Id;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
exports.Student_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('Studentcreate', { title: 'Student Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.Student_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Student.findById(req.query.id)
        res.render('Studentupdate', { title: 'Student Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.Student_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Student.findById(req.query.id)
        res.render('Studentdelete', {
            title: 'Student Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
