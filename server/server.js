var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const axios = require('axios');

//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


//https://ged6om2525wihwkainlusydpey0yjkrd.lambda-url.us-east-2.on.aws/

var corsOptions = {
    origin: "http://localhost:3001"
};

const options = {
    swaggerDefinition: {
         info: {
             title: 'ITIS-6177 APIs',
             version: '1.0.0',
             description: 'Swagger endpoints for API calls for assignmnet 8',
         },
         host: '137.184.110.150:3000',
         basePath: '/',
     },
     apis: ['./server.js'],
};
const specs = swaggerJsdoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors(corsOptions));

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'Testing' })
});

    // connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample'
});

// connect to database
dbConn.connect(); 

//FOOD
/**
 * @swagger
 * /food:
 *  get:
 *      description: Get list of all food items
 *      responses:
 *          200:
 *              description: Food List
 */
app.get('/food', function (req, res) {
    dbConn.query('SELECT * FROM foods', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'foods list.' });
    });
});

/**
 * @swagger
 * /say:
 *   get:
 *     summary: Function for Assignment 09
 *     description: Returns a response from AWS Lambda given a query parameter
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         description:  phrase
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: Food by ID
 */
 app.get('/say', function (req, res) {
    //let keyword = req.params.keyword;
    
    

    return res.send({ error: false, message: 'Keyword is: ...'});

});


/**
 * @swagger
 * /food/{id}:
 *   get:
 *     summary: Retrieve a single food item by ID.
 *     description: Retrieve a single food item by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the food to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *          description: Food by ID
 */
app.get('/food/:id', function (req, res) {
    let food_id = req.params.id;
    if (!food_id) {
        return res.status(400).send({ error: true, message: 'Please provide food_id' });
    }
    dbConn.query('SELECT * FROM foods where ITEM_ID=?', food_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'foods list.' });
    });
});

/**
 * @swagger
 * /food:
 *   post:
 *     summary: Create a food item.
 *     responses:
 *       201:
 *          description: Food by ID
*/
app.post('/food', function (req, res) {
    let food = req.body.food;
    if (!food) {
        return res.status(400).send({ error:true, message: 'Please provide food' });
    }
    dbConn.query("INSERT INTO foods SET ? ", { food: food }, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New food has been created successfully.' });
    });
});

/**
 * @swagger
 * /food:
 *   put:
 *     summary: Add a food item
 *     description: Add a food item
 *     responses:
 *       200:
 *          description: Food by ID
 */
app.put('/food', function (req, res) {
    let food_id = req.body.food_id;
    let food = req.body.food;
    if (!food_id || !food) {
        return res.status(400).send({ error: food, message: 'Please provide food and food_id' });
    }
    dbConn.query("UPDATE foods SET food = ? WHERE ITEM_ID = ?", [food, food_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'food has been updated successfully.' });
    });
});

/**
 * @swagger
 * /food:
 *  delete:
 *      description: Delete food with 
 *      responses:
 *          200:
 *              description: Food that was deleted
 */
app.delete('/food', function (req, res) {
    let food_id = req.body.food_id;
    if (!food_id) {
        return res.status(400).send({ error: true, message: 'Please provide food_id' });
    }
    dbConn.query('DELETE FROM foods WHERE ITEM_ID = ?', [food_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Food has been deleted successfully.' });
    });
}); 

//COMPANY
/**
 * @swagger
 * /company:
 *  get:
 *      description: Get list of all companies
 *      responses:
 *          200:
 *              description: Company List
 */
app.get('/company', function (req, res) {
    dbConn.query('SELECT * FROM company', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'company list.' });
    });
});

/**
 * @swagger
 * /api/v1/agents:
 *  get:
 *      description: Get list of all agents by name/country
 *      responses:
 *          200:
 *              description: Food List
 */
 app.get('/api/v1/agents', function (req, res) {
    dbConn.query('SELECT AGENT_NAME, WORKING_AREA FROM agents', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'agents list.' });
    });
});

/**
 * @swagger
 * /api/v1/food:
 *  get:
 *      description: Get list of all food items
 *      responses:
 *          200:
 *              description: Food List
 */
 app.get('/api/v1/food', function (req, res) {
    dbConn.query('SELECT ITEM_NAME FROM foods', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'food list.' });
    });
});

/**
 * @swagger
 * /api/v1/students:
 *  get:
 *      description: Get list of all students
 *      responses:
 *          200:
 *              description: Student List
 */
 app.get('/api/v1/students', function (req, res) {
    dbConn.query('SELECT NAME, TITLE FROM student', function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'student list.' });
    });
});


// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;