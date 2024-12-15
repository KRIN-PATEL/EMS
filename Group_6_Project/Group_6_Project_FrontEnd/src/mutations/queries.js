  import { gql } from "@apollo/client";

  export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $FirstName: String!
    $LastName: String!
    $Age: Int!
    $DateOfJoining: Date!
    $Title: String!
    $Department: String!
    $EmployeeType: String!
    $CurrentStatus: Boolean!
  ) {
    createEmployee(
      FirstName: $FirstName
      LastName: $LastName
      Age: $Age
      DateOfJoining: $DateOfJoining
      Title: $Title
      Department: $Department
      EmployeeType: $EmployeeType
      CurrentStatus: $CurrentStatus
    ) {
      id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    }
  }
`;

  export const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee(
      $id: ID!
      $FirstName: String!
      $LastName: String!
      $Age: Int!
      $DateOfJoining: Date!
      $Title: String!
      $Department: String!
      $EmployeeType: String!
      $CurrentStatus: Boolean
    ) {
      updateEmployee(
        id: $id
        FirstName: $FirstName
        LastName: $LastName
        Age: $Age
        DateOfJoining: $DateOfJoining
        Title: $Title
        Department: $Department
        EmployeeType: $EmployeeType
        CurrentStatus: $CurrentStatus
      ) {
        id
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;

  export const FILTER_EMPLOYEES = gql`
    mutation filterEmployees($FirstName: String, $Department: String) {
      filterEmployees(FirstName: $FirstName, Department: $Department) {
        id
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;

  export const GET_EMPLOYEES = gql`
    query GetEmployees {
      employees {
        id
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;

  export const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($id: ID!) {
      deleteEmployee(id: $id) {
        id
      }
    }
  `;
  export const GET_EMPLOYEE = gql`
    query getEmployee($id: ID!) {
      employee(id: $id) {
        id
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
        RetirementDetails {
          Years
          Months
          Days
          RetirementDate
        }
      }
    }
  `;


  export const UPCOMING_RETIREMENTS = gql`
    query UpcomingRetirements($EmployeeType: String) {
      upcomingRetirements(EmployeeType: $EmployeeType) {
        id
        FirstName
        LastName
        Age
        DateOfJoining
        Title
        Department
        EmployeeType
        CurrentStatus
      }
    }
  `;
