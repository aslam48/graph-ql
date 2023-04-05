const graphql = require('graphql')
var _ = require('lodash');
//dummy data 

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema, 
    GraphQLList
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
    {id:"1", title: "programming", age: 36, hobby: "using computer to make money", userId:"150"},
    {id:"2", title: "coding", age: 36, hobby: "doing what he loves", userId:"211"},
    {id:"3", title: "sleeping", age: 36,hobby: "sleeping all day", userId:"211"},
    {id:"4", title: "cuddeling", age: 36,hobby: "having sex", userId:"13"},
    {id:"5", title: "driving", age: 36, hobby: "loves cars driving cars", userId:"150"},
];

let PostData = [
    {id:"1", comment:"using computer to make money", userId:"1"},
    {id:"2", comment:"doing what he loves", userId:"1"},
    {id:"3", comment: "sleeping all day", userId:"19"},
    {id:"4", comment:"having sex", userId:"211"},
    {id:"5", comment:"loves cars driving cars", userId:"150"},
];

const UserType = new GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        professtion : {type: GraphQLString},

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(PostData, {userId: parent.id})
            },
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(HobbieData, {userId: parent.id})
            }
        },
    })
})

const HobbyType = new GraphQLObjectType({

    name: "Hobby",
    description: "Hobby description",
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        age: {type: GraphQLInt},
        hobby: {type: GraphQLString},

        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: "Post",
    description: "Users post",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},

        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(userData, {id:parent.userId})
            }
        }
       
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



//Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession : {type: GraphQLString}
            },
            resolve(parent, args) {
              let user = {
                name: args.name,
                age: args.age,
                profession: args.profession
              }  
              return user
            }
    },


    // create post mutation

    createPost : {
        type: PostType,
        args: {
            comment: {type: GraphQLString},
            userId: {type: GraphQLID},
           
        },
        resolve(parent, args) {
          let post = {
            comment: args.comment,
            userId: args.userId
          }  
          return post 
        }
    }

    //create hobbie mutation
    
}
});




module.exports  = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})