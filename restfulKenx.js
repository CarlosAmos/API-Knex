const express = require('express');
const app = express()
const router = express.Router()

const config = require('./config')
const data = require('./data')

const middlewares = require('./middlewares')

/* 
We are going to require knex and then immediately going to pass in a configuration object,
first of all we need to specify the client and then connection
 */
const knex = require('knex')({
    client: 'mysql',
    connection: config.database
})

/*
Then we will take app.locals again and add the knex object 
 */
app.locals.knex = knex

/*  We are going to require routes */
const routes = require('./routes')

// router.get('/employees', routes.employeesList.listAllEmployees); // This line is for mysql native package
router.get('/employees', routes.employeesList.listAllEmployeesKnex);
/* Here we are going to get a single employee by accessing id parameter */
router.get('/employees/:id', middlewares.checkID, routes.employeesList.listSingleEmployee);

app.use('/api', router);


app.listen(config.APIServerPort, () => {
    console.log(`Server started on port ${config.APIServerPort}`);
});
