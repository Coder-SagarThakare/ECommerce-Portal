import React, { useEffect, useState } from "react";
import { secureDelete, secureGet } from "../HttpService/APIService";
import CreateUser from "../Opearations/CreateUser";
import Select from "react-select";
import UpdateCompanyInfo from "./UpdateCompanyInfo";
import UpdateUserInfo from "../Opearations/UpdateUserInfo";
import {GrEdit} from 'react-icons/gr'
import {IoMdPeople} from 'react-icons/io'
import EditRole from "../Opearations/EditRole";
import {MdDeleteForever} from  'react-icons/md'

export default function CompanyData() {

// All states
  var [compName, setcompName] = useState();
  var [compEmail, setcompEmail] = useState();
  var [currentItems, setCurrentItems] = useState();
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(0);
  const [findByRole, setFindByRole] = useState("user");
  const [dummy, setDummy] = useState(true);
  const [data, setData] = useState({}); // {name,compName}
  const [id ,setId] = useState();

  
  const [operationsState, setOperationsState] = useState({
    show: false,    // update comp info
    createUser: false,
    updateUserInfo: false,
    editRole : false
  });


  // useEffect(() => {
  //   secureGet("/auth/self")
  //     .then((response) => {
  //       console.log(response.data._org);
  //       setcompEmail(response.data._org.email);
  //       setcompName(response.data._org.name);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [dummy]);

  useEffect(() => {
    var url = `/users?page=${page}&limit=${limit}`;

    findByRole === "all"
      ? (url = `/users?page=${page}&limit=${limit}`)
      : (url = `/users?page=${page}&limit=${limit}&role=${findByRole}`);

    secureGet(url).then((response) => {
      setCurrentItems(response.data.results);
      setLimit(response.data.limit);
      setTotalPages(response.data.totalPages);
    });

  }, [page, limit, findByRole,operationsState,id]);

  useEffect(() => {
    secureGet("/auth/self").then((response) => {
      console.log(" myprofile response : ", response);

      setData({
        userName: response.data.name,
        userEmail: response.data.email,
        userCompName: response.data._org.name,
      });
      setcompEmail(response.data._org.email);
        setcompName(response.data._org.name);
    });
  }, [dummy]);


  // console.log(id);
  const pagesArray = Array(totalPages).fill().map((_, index) => index + 1);

    // All buttons that required for pagination  1.....n
  const allButtons = pagesArray.map((index) => {
    return (
      <button
        onClick={() => {
          setPage(index);
        }}
        style={{ border: "none", background: "#e5e5e5", borderRadius: "5px" }}
        key={index}
      >
        {" "}
        {index}{" "}
      </button>
    );
  });

  // function for delete row
 async function deleteRow(id){
    console.log( "delete row id : ",id)
   await secureDelete (`/users/`,id)  
   setId(id)

  }

  // print the rows of compny members 
  var rows =
    currentItems &&
    currentItems.map((user, index) => {
      return (
        <tr key={index} style={{ width: "100%" }}>
          <td> {user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td> 
          <td> <button onClick={()=>{
            setOperationsState((prevData)=>{
              setId(user._id)
                return ({
                  ...prevData, updateUserInfo : true
                })
            })
          }}><GrEdit /></button> </td>

          <td> <button onClick={()=>{ 
            setOperationsState((prevData)=>{
              setId(user._id)
              console.log(user._id);
              return({
                ...prevData,editRole:true
              })
            })
          }}><IoMdPeople /> </button></td>

          <td><button onClick={() => {deleteRow(user._id)} }><MdDeleteForever /> </button> </td>


        </tr>
      );
    });

// array for limit and change role of user
  const limits = [
    { value: "5 ", label: "5" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
  ];

  const role = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "all", label: "All" },
  ];

  return (
    <div>
      {/* card for showing name & email of company */}
      <div className="card shadow">
        <div className="card-header"></div>
        <div className="card-body   ">
          <h5 className="card-title">Company Details</h5>
          <div className="d-flex justify-content-around">
            <div>
              <h3>Company Name</h3>
              <p style={{ color: "#e66465", textAlign: "center" }}>
                {" "}
                <u>{compName}</u>
              </p>
            </div>

            <div>
              <h3>Company Mail-Id</h3>
              <p style={{ color: "#e66465", textAlign: "center" }}>
                {" "}
                <u>{compEmail}</u>
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* All operations button */}
      <div className="border d-flex justify-content-evenly shadow">
        <button
          type="button"
          className="btn btn-secondary border"
          onClick={() => {
            setOperationsState((prev) => {
              return { ...prev, createUser: true };
            });
          }}
        >
          create user
        </button>

        <button
          type="button"
          className="btn btn-secondary border"
          onClick={() => {
            // console.log("show details");
            setOperationsState((prev) => {
              return { ...prev, show: true };
            });
          }}
        >
          Update Company info
        </button>

        <button
          type="button"
          className="btn btn-secondary border"
          
        >
          update User Info
        </button>
      </div>

        {/* set limit, change role */}
      <div className="d-flex justify-content-evenly">
        <div
          className="d-flex justify-content-center border "
          style={{ gap: "5%", width: "50%", alignItems: "center" }}
        >
          <label> Set limit : </label>
          <Select
            options={limits}
            onChange={(newLimit) => {
              setLimit(newLimit.value);
            }}
          />

          <label>Role : </label>
          <Select
            options={role}
            onChange={(role) => {
              setFindByRole(role.value);
              console.log(role.value);
            }}
          />
        </div>
      </div>
            {/* div for print curent user of company  */}
      <div
        className="currentItemsList  "
        style={{ padding: "3%", borderRadius: "10px" }}
      >
        <table style={{ width: "100%" }}>
          <thead className="border border-danger">
            <tr>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>Edit</th>
              <th>role/admin</th>
              <th>Delete</th>

            </tr>
          </thead>

          <tbody
            className="border border-primary "
            style={{
              backgroundColor: "#2e2828",
              color: "white",
              padding: "3%",
            }}
          >
            {/* {currentItems &&
              currentItems.map((index) => (
                <tr>
                  <td>{index.name}</td>
                  <td>{index.email}</td>
                  <td>{index.role}</td>
                </tr>
              ))} */}
            {rows}
          </tbody>
        </table>
      </div>

              {/* pagination buttons prev 1 2 3 next */}
      <div
        className="buttonBar  d-flex justify-content-center "
        style={{ gap: "5%", padding: "3%" }}
      >
        <button
          onClick={() => {
            console.log(page, totalPages);

            if (page > 1) setPage(page - 1);
          }}
        >
          {" "}
          prev{" "}
        </button>

        {allButtons}

        <button
          onClick={() => {
            console.log(page, totalPages);
            if (page < totalPages) setPage(page + 1);
          }}
        >
          {" "}
          next{" "}
        </button>
      </div>

          {/* components runs after rendering page  */}
      <CreateUser
        operationsState={operationsState}
        setOperationsState={setOperationsState}
      />

      <UpdateCompanyInfo
        operationsState={operationsState}
        setOperationsState={setOperationsState}
        setData={setData}
        data={data}
        dummy={dummy}
        setDummy={setDummy}
      />

      <UpdateUserInfo
        operationsState={ operationsState }
        setOperationsState={setOperationsState}
        id={id}
      />

      <EditRole 
        operationsState= {operationsState}
        setOperationsState = {setOperationsState}
        id={id}
      />
    </div>
  );
}
