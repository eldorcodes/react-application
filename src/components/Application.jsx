import React, { useEffect, useState } from 'react';
import '../App.css';
import AppSlice from '../redux/AppSlice';
import { useSelector,useDispatch } from 'react-redux';
import { input,submit } from '../redux/AppSlice';
import { getDatabase,onValue,push,ref,set } from 'firebase/database';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import { IoCallOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { LuChrome } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';


export default function Application() {
    const[dateOfApplication,setDateOfApplication] = useState("")
    const[position ,setPosition] = useState("")
    const[employmentType,setEmaploymentType] = useState("");
    const[fullName,setFullName] = useState("");
    const[nationality,setNationality] = useState("");
    const[address,setAddress] = useState("")
    const[phone,setPhone] = useState("");
    const[email,setEmail] = useState('');
    const[doB,setDoB] = useState("");
    const[drivingLicence,setDrivingLicence] = useState("");
    const[yearsOfWork,setYearsOfWork] = useState("");
    const[marital,setMarital] = useState("");
    const[degree,setDegree] = useState("");
    const[university,setUniversity] = useState("");
    const[yearsOfGraduate,setYearsOfGraduate] = useState("");
    const[grade,setGrade] = useState("");
    const[city,setCity] = useState("");
    const[company,setCompany] = useState("");
    const[positions,setPositions] = useState("");
    const[year,setYear] = useState("");
    const[reasonForLeaving,setReasonForLeaving] = useState("");
    const[skill,setSkill] = useState("");
    const[level,setLevel] = useState("");
    const[years,setYears] = useState("");
    const[institute,setInstitute] = useState("")


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth();
    const stateData = useSelector((state) => {
        return state.appSlice.data
    })



    function handleSubmit(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth,dateOfApplication,
            position,
            employmentType,
            fullName,nationality,
            address, phone,
            email,doB,drivingLicence,
            yearsOfWork,marital,degree,
            university,yearsOfGraduate,
            grade,city,company,positions,
            year,reasonForLeaving,skill,
            level,years,institute )
            .then(() => {
                writeUsersData(auth.currentUser.uid,dateOfApplication,
                    position,
                    employmentType,
                    fullName,nationality,
                    address, phone,
                    email,doB,drivingLicence,
                    yearsOfWork,marital,degree,
                    university,yearsOfGraduate,
                    grade,city,company,positions,
                    year,reasonForLeaving,skill,
                    level,years,institute )
                    console.log(`user submitted succsesfully`)
            })
            .catch(e => {
                console.log(e)
            })
        dispatch(submit()) 
    }
        function writeUsersData(e) {
            e.preventDefault()
                const db = getDatabase();
                // write user data to firebase
                push(ref(db,'users/'), {
                    dateOfApplication: dateOfApplication,
                    position1: position,
                    employmentType: employmentType,
                    fullname :fullName,
                    nationality: nationality,
                    address: address,
                    phone: phone,
                    email:email,
                    DoB: doB,
                    drivingLicence: drivingLicence,
                    yearsOfWork:yearsOfWork,
                    marital:marital,
                    degree:degree,
                    university:university,
                    yearsOfGraduate: yearsOfGraduate,
                    grade:grade,
                    city:city,
                    company:company,
                    position2:positions,
                    year1:year,
                    reasonForLeaving:reasonForLeaving,
                    skill:skill,
                    level:level,
                    year2:years,
                    institute:institute
                })

                // store user data to mongoDB
                fetch(`http://localhost:4000/applications`,{
                    headers:{
                        'Content-type':'Application/json'
                    },
                    method:'POST',
                    body:JSON.stringify({ fullName, nationality, address, phone, email })
                })

                // navigate to applicants
                navigate('/applicants')

            }

            useEffect(() => {
                onValue(ref(getDatabase(),`users`),(usersSnapshot) => {
                    usersSnapshot.forEach(user => {
                        console.log(user.val())
                    })
                })
            },[])

  return (
    <div id='main'>
     <form onSubmit={writeUsersData}>
     <h1>Job Application Form</h1>
        <div id='container'>

        <div>
       <section style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>

      <div style={{width:'33%'}}>
      <p style={{display:'inline-block'}}> Date of Application</p> 
      </div>

      <div style={{width:'33%'}}>
      <p style={{display:'inline-block'}}>Position</p>
      </div>

       <div style={{width:'33%'}}>
       <p style={{display:'inline-block'}}>Employment Type</p>
       </div>

       </section>
            <table>
                <thead >
                    <tr>
                        <td>
    
                            <input type="text" />
                        </td>
                        <td>
                            <input type="text" />
                        </td>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
        </div>
        <div id='container-2'>
           <h3>Personal Information</h3>
             <table border="1">
               <thead>
               <tr id='box1'>
                    <td id='table-td'>
                        Full Name
                        <input onChange={(e) => setFullName(e.target.value)}
                        type="text" id='inp' />
                    </td> 
                    <td id='table-td1'>
                        Nationality
                        <input onChange={(e) => setNationality(e.target.value)}
                        type="text" id='inp' />
                    </td>
                </tr>
                <tr id='box2' >
                    <td id='table-td2' >
                        Address
                        <input onChange={(e) => setAddress(e.target.value)}
                        type="text" id='inp' />
                        
                    </td>
                </tr>
                <tr id='box3'>
                    <td id='table-td3' style={{width:'250px'}}>
                        Phone
                        <input onChange={(e) => setPhone(e.target.value)}
                        type="text" id='inp'/>
                    </td>
                    <td id='table-td4'>
                        Email
                        <input onChange={(e) => setEmail(e.target.value)}
                         type="text" id='inp'/>
                    </td>
                    <td id='table-td5'>
                        DoB
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inp'/>
                    </td>
                </tr>
                <tr id='box4'>
                    <td>
                        <p style={{display:'inline-block'}}>Driving License</p>
                       
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="checkbox" />
                        No
                        
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="checkbox" />
                        Yes
                     
                    </td>
                    <td>
                       <p style={{display:'inline-block'}}> Years of Work</p>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inp'/>
                    </td>
                </tr>
                <tr id='box5'>
                    <td>
                        <p id='pp' >Marital Status</p>
                       
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="checkbox" />
                       <p id='pp'>Single</p>
                    
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="checkbox" />
                       <p id='pp'> Married,number of dependent(s)</p>
                    </td>
                </tr>
               </thead>
             </table>
        </div>
        <div>
                <h3>Educational Background</h3>
                <table  border="1">
                <thead>
                <tr id='box6'>
                    <th id='thh'>Degree/Course</th>
                    <th id='thh'>University/Institute</th>
                    <th id='thh'>Years of Graduate</th>
                    <th id='thh'>Grade</th>
                    <th id='thh'>City</th>
                </tr>
                <tr id='box7'>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                         type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu' style={{width:'70px'}}/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu' style={{width:'60px'}}/>
                    </td>
                </tr>
                <tr id='box7'>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                         type="text" id='inpu' style={{width:'70px'}}/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu' style={{width:'60px'}}/>
                    </td>
                </tr>
                <tr id='box7'>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                         type="text" id='inpu'/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu'/>
                    </td>
                    <td>
                        <input  onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu' style={{width:'70px'}}/>
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" id='inpu' style={{width:'60px'}}/>
                    </td>
                </tr>
                </thead>
             </table>
             </div>
             <div>
                <h3>Employment History</h3>
                <table border="1">
                    <thead>
                    <tr id='box8'>
                        <td id='tdd'><div style={{textAlign:'center'}}>Company</div></td>
                        <td id='tdd'><div style={{textAlign:'center'}}>Position</div></td>
                        <td id='tdd'><div style={{textAlign:'center'}}>Year</div></td>
                        <td id='tdd'><div style={{textAlign:'center'}}>Reason for Leaving</div></td>
                    </tr>
                    <tr id='box9'>
                        <td  id='td1'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input1'/>
                        </td>
                        <td id='td2'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input2'/>
                        </td>
                        <td id='td3'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input3'/>
                        </td>
                        <td id='td4'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input4'/>
                        </td>
                    </tr>
                    <tr id='box9'>
                        <td id='td1'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input1'/>
                        </td>
                        <td id='td2'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input2'/>
                        </td>
                        <td id='td3'>
                            <input onChange={(e) => dispatch(input(e.target.value))} 
                            type="text" id='input3'/>
                        </td>
                        <td id='td4'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input4'/>
                        </td>
                    </tr>
                    <tr id='box9'>
                        <td id='td1'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input1'/>
                        </td>
                        <td id='td2'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                             type="text" id='input2'/>
                        </td>
                        <td id='td3'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                             type="text" id='input3'/>
                        </td>
                        <td id='td4'>
                            <input onChange={(e) => dispatch(input(e.target.value))}
                            type="text" id='input4'/>
                        </td>
                    </tr>
                    </thead>
                </table>
             </div>
             <div>
                <h3>Skills & Training</h3>
                <table border="1">
                <thead>
                <tr id="box10">
                    <td id='tdd1'><div>Skills & Training Acheivement(s)</div></td>
                    <td id='tdd1'><div>Level</div></td>
                    <td id='tdd1'><div>Year</div></td>
                    <td id='tdd1'><div>Institute</div></td>
                </tr>
                
               <tr id='box11'>
                <td id='t1'>
                    <input onChange={(e) => dispatch(input(e.target.value))}
                    type="text" id='inp1'/>
                </td>
                <td id='t2'>
                    <input onChange={(e) => dispatch(input(e.target.value))}
                     type="text" id='inp2'/>
                </td>
                <td id='t3'>
                    <input onChange={(e) => dispatch(input(e.target.value))}
                    type="text" id='inp3' />
                </td>
                <td id='t4'>
                    <input onChange={(e) => dispatch(input(e.target.value))}
                    type="text" id='inp4'/>
                </td>
               </tr>
                <tr>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    
                </tr>
                <tr>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    <td>
                        <input onChange={(e) => dispatch(input(e.target.value))}
                        type="text" />
                    </td>
                    
                </tr>
                </thead>
                </table>
                <button 
                type='submit'>submit</button>
             </div>


             <div>
                <p>Attach your resume and portfolio to this job application form. <br />
                    Send it via email or hand it over to the Human Resource Office at 123Anywhere St,Any City 
                </p>
               <div style={{display:'inline-block'}}> <IoCallOutline /> <p  style={{display:'inline-block'}}>+123-456-7890</p>
               <div style={{display:'inline-block',width:'80px'}}></div>
               <MdEmail />
               <p style={{display:'inline-block'}}>hello@reallygreatsite.com</p>
               <div style={{display:'inline-block',width:'80px'}}></div>
               <LuChrome />
               <p style={{display:'inline-block'}}>www.reallygreatsite.com</p>
               </div>
              
             </div>
     </form>
    </div>

  )
}
