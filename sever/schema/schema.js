const graphql = require('graphql')


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

//create type 

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
    fields: () => ({
        user: {
            type:UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                //we resolve with data
                //get and return data from datascouce
            }
        }
    })
});

module.export  = new GraphQLSchema({
    query: RootQuery
})