const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/employeeSchema"); 
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// enable CORS
app.use(cors());


connectDB();

// set up graphQL endpoint
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true, 
    })
);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App is running on port ${port}`));
