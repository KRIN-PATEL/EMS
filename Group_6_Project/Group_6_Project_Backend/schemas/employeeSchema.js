const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require("graphql");

// date scaler
const dateScalar = require("../scalars/date");
const Employee = require("../models/Employee");

//  employeeType for graphql
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    FirstName: { type: GraphQLString },
    LastName: { type: GraphQLString },
    Age: { type: GraphQLInt },
    DateOfJoining: { type: dateScalar },
    Title: { type: GraphQLString },
    Department: { type: GraphQLString },
    EmployeeType: { type: GraphQLString },
    CurrentStatus: { type: GraphQLBoolean },

    RetirementDetails: {
      type: new GraphQLObjectType({
        name: "RetirementDetails",
        fields: {
          Years: { type: GraphQLInt },
          Months: { type: GraphQLInt },
          Days: { type: GraphQLInt },
          RetirementDate: { type: GraphQLString },
        },
      }),
      resolve: (parent) => {
        const retirementAge = 65;
        const today = new Date();
        const joiningDate = new Date(parent.DateOfJoining);

        // employee's current age
        const currentAge =
          parent.Age + (today.getFullYear() - joiningDate.getFullYear());

        //  retirement date
        const retirementDate = new Date(joiningDate);
        retirementDate.setFullYear(
          retirementDate.getFullYear() + (retirementAge - currentAge)
        );

        if (retirementDate <= today) {
          return {
            Years: 0,
            Months: 0,
            Days: 0,
            RetirementDate: "Retired",
          };
        }

        let years = retirementDate.getFullYear() - today.getFullYear();
        let months = retirementDate.getMonth() - today.getMonth();
        let days = retirementDate.getDate() - today.getDate();

        if (days < 0) {
          const daysInPreviousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          ).getDate();
          days += daysInPreviousMonth;
          months -= 1;
        }

        if (months < 0) {
          months += 12;
          years -= 1;
        }

        return {
          Years: years,
          Months: months,
          Days: days,
          RetirementDate: retirementDate.toISOString().split("T")[0],
        };
      },
    },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Employee.findById(args.id);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve: () => {
        return Employee.find();
      },
    },
    upcomingRetirements: {
      type: new GraphQLList(EmployeeType),
      args: {
        EmployeeType: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const retirementAge = 65;

        const query = {
          Age: { $gte: retirementAge - 1, $lte: retirementAge },
        };

        if (args.EmployeeType) {
          query.EmployeeType = args.EmployeeType;
        }

        return Employee.find(query);
      },
    },
  },
});

//  mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEmployee: {
      type: EmployeeType,
      args: {
        FirstName: { type: new GraphQLNonNull(GraphQLString) },
        LastName: { type: new GraphQLNonNull(GraphQLString) },
        Age: { type: new GraphQLNonNull(GraphQLInt) },
        DateOfJoining: { type: new GraphQLNonNull(dateScalar) },
        Title: { type: new GraphQLNonNull(GraphQLString) },
        Department: { type: new GraphQLNonNull(GraphQLString) },
        EmployeeType: { type: new GraphQLNonNull(GraphQLString) },
        CurrentStatus: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: (parent, args) => {
        const employee = new Employee({
          FirstName: args.FirstName,
          LastName: args.LastName,
          Age: args.Age,
          DateOfJoining: args.DateOfJoining,
          Title: args.Title,
          Department: args.Department,
          EmployeeType: args.EmployeeType,
          CurrentStatus: args.CurrentStatus,
        });
        return employee.save();
      },
    },
    filterEmployees: {
      type: new GraphQLList(EmployeeType),
      args: {
        FirstName: { type: GraphQLString },
        Department: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        if (args.FirstName === "" && args.Department !== "") {
          return Employee.find({
            Department: args.Department,
          });
        } else if (args.FirstName !== "" && args.Department === "") {
          return Employee.find({ FirstName: args.FirstName });
        } else if (args.Department !== "" && args.FirstName !== "") {
          return Employee.find({
            Department: args.Department,
            FirstName: args.FirstName,
          });
        } else {
          return Employee.find();
        }
      },
    },

    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        FirstName: { type: GraphQLNonNull(GraphQLString) },
        LastName: { type: GraphQLNonNull(GraphQLString) },
        Age: { type: GraphQLNonNull(GraphQLInt) },
        DateOfJoining: { type: GraphQLNonNull(dateScalar) },
        Title: { type: GraphQLNonNull(GraphQLString) },
        Department: { type: GraphQLNonNull(GraphQLString) },
        EmployeeType: { type: GraphQLNonNull(GraphQLString) },
        CurrentStatus: { type: GraphQLBoolean },
      },
      resolve: (parent, args) => {
        return Employee.findByIdAndUpdate(
          args.id,
          {
            $set: {
              FirstName: args.FirstName,
              LastName: args.LastName,
              Age: args.Age,
              DateOfJoining: args.DateOfJoining,
              Title: args.Title,
              Department: args.Department,
              EmployeeType: args.EmployeeType,
              ...(args.CurrentStatus !== undefined && {
                CurrentStatus: args.CurrentStatus,
              }),
            },
          },
          {
            new: true,
          }
        );
      },
    },

    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const employee = await Employee.findById(args.id);

        if (employee.CurrentStatus) {
          throw new Error("CAN'T DELETE EMPLOYEE - STATUS ACTIVE");
        }

        return Employee.findByIdAndDelete(args.id); 
      },
    },
  },
});

// export the graphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
