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
    {id:"1", name: "Bond", age: 36, professtion: "grate"},
    {id:"13", name: "Anna", age: 36, professtion: "nice"},
    {id:"211", name: "Bella", age: 36,professtion: "cool"},
    {id:"19", name: "Gina", age: 36,professtion: "good"},
    {id:"150", name: "Geogina", age: 36, professtion: "football"},
];

let HobbieData = [
    {id:"1", title: "programming", age: 36, hobby: "using computer to make money"},
    {id:"13", title: "coding", age: 36, hobby: "doing what he loves"},
    {id:"211", title: "sleeping", age: 36,hobby: "sleeping all day"},
    {id:"19", title: "cuddeling", age: 36,hobby: "having sex"},
    {id:"150", title: "driving", age: 36, hobby: "loves cars driving cars"},
];

let PostData = [
    {id:"1", comment:"using computer to make money"},
    {id:"13", comment:"doing what he loves"},
    {id:"211", comment: "sleeping all day"},
    {id:"19", comment:"having sex"},
    {id:"150", comment:"loves cars driving cars"},
];

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        professtion : {type: GraphQLString}
    })
})

const HobbyType = new GraphQLObjectType({

    name: "Hobby",
    description: "Hobby description",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        age: {type: GraphQLInt},
        hobby: {type: GraphQLString}
    })
})

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Users post",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString}
       
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
               
                return _.find(userData, {id: args.id})
                //we resolve with data
                //get and return data from datascouce
            }
        },

        // hobby query 
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return _.find(HobbieData, {id: args.id})

                //return data for our body 
            }
        },

        // comment query 
        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return _.find(PostData, {id: args.id})
            }
        }
    }
});




module.exports  = new GraphQLSchema({
    query: RootQuery
})