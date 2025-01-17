const graphql = require("graphql");

// Mongoose Models
const Mentor = require("../models/mentor");
const Mentee = require("../models/mentee");
const Prefect = require("../models/prefect");

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

const FacultyType = new GraphQLObjectType({
  name: "Faculty",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    designation: { type: GraphQLString },
    year: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
  }),
});

const CoordinatorType = new GraphQLObjectType({
  name: "Coordinator",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    year: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
  }),
});

const PrefectType = new GraphQLObjectType({
  name: "Prefect",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    year: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    mentors: {
      type: new GraphQLList(MentorType),
      resolve(parent, args) {
        return Mentor.find({ prefect: parent.id });
      },
    },
  }),
});

const MentorType = new GraphQLObjectType({
  name: "Mentor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    prefect: {
      type: PrefectType,
      resolve(parent, args) {
        return Prefect.findById(parent.prefect);
      },
    },
    mentees: {
      type: new GraphQLList(MenteeType),
      resolve(parent, args) {
        return Mentee.find({ mentor: parent.id });
      },
    },
  }),
});

const MenteeType = new GraphQLObjectType({
  name: "Mentee",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rollNumber: { type: GraphQLString },
    contact: { type: GraphQLString },
    email: { type: GraphQLString },
    emoji: { type: GraphQLInt },
    mentor: {
      type: MentorType,
      resolve(parent, args) {
        return Mentor.findById(parent.mentor);
      },
    },
  }),
});

module.exports = {
  CoordinatorType,
  PrefectType,
  MentorType,
  MenteeType,
  FacultyType,
};
