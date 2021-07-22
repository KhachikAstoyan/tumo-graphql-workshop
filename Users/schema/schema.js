// @ts-check

const axios = require('axios').default;
const graphql = require('graphql');
const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLInt,
   GraphQLSchema,
   GraphQLList,
   GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
   name: "Company",
   fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      users: {
         type: new GraphQLList(UserType),
         resolve: async (parentValue, args) => {
            const { data: users } = await axios.get(`http://localhost:3000/companies/${parentValue.id}/users`);
            return users;
         }
      }
   })
})

const UserType = new GraphQLObjectType({
   name: "User",
   fields: () => ({
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      age: { type: GraphQLInt },
      company: {
         type: CompanyType,
         resolve: async (parentValue, args) => {
            const { data: company } = await axios.get(`http://localhost:3000/companies/${parentValue.companyId}`);
            return company
         }
      }
   })
})

const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: {
      user: {
         type: UserType,
         args: { id: { type: GraphQLString } },
         resolve: async (parentValue, args) => {
            const { data: user } = await axios.get(`http://localhost:3000/users/${args.id}`);
            return user;
         }
      },
      company: {
         type: CompanyType,
         args: { id: { type: GraphQLString } },
         resolve: async (parentValue, args) => {
            const { data: company } = await axios.get(`http://localhost:3000/companies/${args.id}`);
            return company
         }
      }
   }
});

const mutation = new GraphQLObjectType({
   name: "mutation",
   fields: {
      addUser: {
         type: UserType,
         args: {
            firstName: { type: new GraphQLNonNull(GraphQLString) },
            age: { type: new GraphQLNonNull(GraphQLInt) },
            companyId: { type: GraphQLString }
         },
         resolve: async (parentValue, args) => {
            const { firstName, age, companyId } = args;
            const { data } = await axios.post(`http://localhost:3000/users`, { firstName, age, companyId });
            return data
         }
      },
      deleteUser: {
         type: UserType,
         args: { id: { type: new GraphQLNonNull(GraphQLString) } },
         resolve: async (parentValue, args) => {
            const { data } = await axios.get(`http://localhost:3000/users/${args.id}`);
            await axios.delete(`http://localhost:3000/users/${args.id}`);
            console.log(data);
            return data
         }
      },
      editUser: {
         type: UserType,
         args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            firstName: { type: GraphQLString },
            age: { type: GraphQLInt },
            companyId: { type: GraphQLString }
         },
         resolve: async (parentValue, { id, firstName, age, companyId }) => {
            const { data } = await axios.patch(`http://localhost:3000/users/${id}`, { firstName, age, companyId });
            return data
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation
})