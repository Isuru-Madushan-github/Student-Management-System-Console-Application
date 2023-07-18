const operations=require('./operations');
const yargs=require('yargs');


//register command
yargs.command({
    command: 'register',
    describe: 'Used to register a student',
    builder: {
        name:{
            describe: 'Student name',
            demandOption: true,
            type: 'string'
        },
        address: {
            describe: 'Student address',
            demandOption: true,
            type: 'string'
        },
        age: {
            describe: 'Student age',
            demandOption: true,
            type: 'number'
        },
        gender: {
            describe: 'Male or Female',
            demandOption: true,
            type: 'string'
        },
        contactNo: {
            describe: 'Student contact No.',
            demandOption: true,
            type: 'number'
        },
        courseFee:{
            describe: 'Student course fee',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv)=>{
        operations.registerStudent(argv);
    }
});


//update command
yargs.command({
    command: 'update',
    describe: 'Used to update a student',
    builder: {
        id: {
            describe: 'Student ID No.',
            demandOption: true,
            type: 'number'
        },
        name: {
            describe: 'Student name',
            type: 'string'
        },
        address: {
            describe: 'Student address',
            type: 'string'
        },
        age: {
            describe: 'Student age',
            type: 'number'
        },
        gender: {
            describe: 'Male or Female',
            type: 'string'
        },
        contactNo: {
            describe: 'Student contact No.',
            type: 'number'
        },
        courseFee: {
            describe: 'Course fee',
            type: 'number'
        },
        paidFees: {
            describe: 'Paid fees',
            type: 'number'
        }
    },
    handler: (argv)=>{
        operations.updateStudent(argv);
    }
});


//delete command
yargs.command({
    command: 'delete',
    describe: 'Used to delete a student',
    builder: {
        id: {
            describe: 'Student ID No.',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv)=>{
        operations.deleteStudent(argv);
    }
});


//select student
yargs.command({
    command: 'select',
    describe: 'Used to select a student',
    builder: {
        id: {
            describe: 'Student ID No.',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv)=>{
        operations.selectStudent(argv);
    }
});


//list student
yargs.command({
    command: 'list',
    describe: 'Used to get a list of students',
    handler: ()=>{
        operations.listStudent();
    }
});


//payments
yargs.command({
    command: 'pay',
    describe: 'Used to pay student class fees',
    builder: {
        id: {
            describe: 'Student ID No.',
            demandOption: true,
            type: 'number'
        },
        amount: {
            describe: 'Paid amount',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv)=>{
        operations.payFees(argv);
    }
});


yargs.parse();