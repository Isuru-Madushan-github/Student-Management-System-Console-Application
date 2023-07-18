const chalk=require('chalk');
const fs=require('fs');

const file="data.json";

//register student
const registerStudent=(argv)=>{
    
    const student=loadStudentData();

    //make an ID
    const length=student.length;
    let id=1;
    if(length>0){
        id=student[length-1].id+1;
    }

    student.push({
        id,
        name: argv.name,
        address: argv.address,
        age: argv.age,
        gender: argv.gender,
        contactNo: argv.contactNo,
        courseFee: argv.courseFee,
        paidFees: 0
    });
    saveStudentData(student);
    console.log(chalk.blue.bold('Student added successfully...!'));
};


//update student
const updateStudent=(argv)=>{
    const students=loadStudentData();
    const index=students.findIndex((student)=>{
        return student.id==argv.id;
    });
    if(index==-1){
        console.log(chalk.red.bold.inverse('No record found...!'));
    }else{
        const student=students[index];
        student.name= argv.name ? argv.name : student.name;
        student.address= argv.address ? argv.address : student.address;
        student.age= argv.age ? argv.age : student.age;
        student.gender= argv.gender ? argv.gender : student.gender;
        student.contactNo= argv.contactNo ? argv.contactNo : student.contactNo;
        student.courseFee= argv.courseFee ? argv.courseFee : student.courseFee;
        saveStudentData(students);
        console.log(chalk.green.bold('Record updated successfully...!'));
    }   
};


//delete student
const deleteStudent=(argv)=>{
    const students=loadStudentData();
    const student=students.find((student)=>{
        return student.id==argv.id;
    });
    if(student==undefined){
        console.log(chalk.red.bold.inverse('No record found...!'));
    }else{
        const newStudentList=students.filter((student)=>{
            return student.id!=argv.id;
        });
        saveStudentData(newStudentList);
        console.log(chalk.red.bold('Record deleted successfully...!'));
    }
    
};


//select student
const selectStudent=(argv)=>{
    console.log(chalk.cyan.bold('Selecting student...'));
    const students=loadStudentData();
    const student=students.find((student)=>{
        return student.id==argv.id
    });
    if(student==undefined){
        console.log(chalk.red.bold.inverse('No record found...!'));
    }else{
        console.table([student]);
    }   
};


//list students
const listStudent=()=>{
    console.log(chalk.magenta.bold('Listing...'));
    const students=loadStudentData();
    console.table(students);
};


//student fees payment
const payFees=(argv)=>{
    const students=loadStudentData();
    const index=students.findIndex((student)=>{
        return student.id==argv.id;
    });
    if(index==-1){
        console.log(chalk.red.bold.inverse('No record found...!'));
    }else{
        const student=students[index];
        
        const paid=student.paidFees+argv.amount;
        const balancePayment=student.courseFee-paid;
        if(balancePayment==0){
            student.paidFees='setteled';
            saveStudentData(students);
        }else{
            student.paidFees+=argv.amount;
            saveStudentData(students);
        }
        console.log(chalk.green.bold('Payment Recieved...!'));
    }
};


const saveStudentData=(data)=>{
    const dataJSON=JSON.stringify(data);
    fs.writeFileSync(file,dataJSON);
};

const loadStudentData=()=>{
    try{
        const data=fs.readFileSync(file,'utf-8');
        const dataJSON=JSON.parse(data);
        return dataJSON; 
    }catch{
        return [];
    }
};

module.exports={
    registerStudent,
    updateStudent,
    deleteStudent,
    selectStudent,
    listStudent,
    payFees    
};