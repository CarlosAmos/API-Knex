/* In the file we are going to use knex with employee controller */


function listAllEmployeesKnex(req, res) {
    /*We are going to use the latest Object destructuring of JS and this means 
        that knex is going to be extracted from locals object forming
    */
    const {
        knex
    } = req.app.locals
    knex
        .select('name', 'address', 'email', 'salary', 'department')
        .from('employees')
        /*We going to use a promise based lib */
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

function listSingleEmployee(req, res) {
    /* Here we are going to list information for a single employee */
    const {
        knex
    } = req.app.locals
    const {
        id
    } = req.params
    knex
        .select('name', 'address', 'email', 'salary', 'department')
        .from('employees')
        .where({
            id: `${id}`
        })
        /*We going to use a promise based lib */
        .then(data => {
            if (data.length > 0) {
                return  res.status(200).json(data)
            } else {
                return res.status(404).json(`Employee with ID ${id} do not exist`);
            }
        })
        .catch(error => res.status(500).json(error))
}

module.exports = {
    listAllEmployeesKnex,
    listSingleEmployee
}