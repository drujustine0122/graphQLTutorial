const db = require('./db')
const Query = {
    greeting: () => {
        return 'Test Success, GraphQL server is up & running !!'
    },
    sayHello: (root, args, context, info) => `Hi ${args.name} GraphQl server says hello to you!!`,
    students: () =>  db.students.list(),
    studentById: (root, args, context, info) => {
        return db.students.get(args.id);
    },
    setFavouriteColor:(root, args) => `Your Fav Color is : ${args.color}`
}

const Student = {
    fullName: (root, args, context, info) => {
        return root.firstName+":"+root.lastName
    },
    college:(root) => {
        return db.college.get(root.collegeId);
    }
}

const Mutation = {
    createStudent:(root, args, context, info) => {
        return db.students.create({
            collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName
        })
    },
    signUp:(root, args, context,info) => {
        const {email, firstName, password} = args.input;

        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const  isValidEmail = emailExpression.test(String(email).toLowerCase())

        if(!isValidEmail) throw new Error("email not in proper format")

        if(!firstName.length > 15) throw new Error("firstname should be less than 15 characters")

        if(password.length < 8) throw new Error("password should be minimum 8 characters")

        return "success"

    }
}
module.exports = {Query, Student, Mutation}