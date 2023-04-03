const graphql = require('graphql')
var _ = require('lodash');
//dummy data 

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

//create type 
let userData = [
    {id:"1", name: "Bond", age: 36},
    {id:"13", name: "Anna", age: 36},
    {id:"211", name: "Bella", age: 36},
    {id:"19", name: "Gina", age: 36},
    {id:"150", name: "Geogina", age: 36},
];

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})


//Root query

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields:{
        user: {
            type:UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
               
                return 
                //we resolve with data
                //get and return data from datascouce
            }
        }
    }
});

module.exports  = new GraphQLSchema({
    query: RootQuery
})