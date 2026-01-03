import axios from 'axios';
import React, { useState, useEffect } from 'react'

const App = () => {
  let [inputName, setInputName] = useState();
  let [inputEmail, setInputEmail] = useState();
  let [inputNumber, setInputNumber] = useState();
  let [inputPassword, setInputPassword] = useState();
  let [fetchData, setfetchData] = useState([]);
  let [displayedData, setDisplayedData] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    axios.get("https://69390a87c8d59937aa063eab.mockapi.io/Example").then((res)=> {
      setfetchData(res.data);
      setDisplayedData(res.data);
    })
  }, []);

  let onSubmit=(e)=>{
    e.preventDefault();
    // if(!inputName ){
    //   alert("error in input field")
    // }else if(!inputEmail || !inputEmail.includes("@")){
    //   alert("Email is required")
    // }else if(!inputNumber || inputNumber.length !=10){
    //   alert("enter valid number")
    // }else if(!inputPassword ){
    //   alert("Check your password")
    // }else{
    //   alert("Form submitted successfully")
    // }
    let data = {
      name: inputName,
      email: inputEmail,
      number: inputNumber,
      password: inputPassword
    }
    axios.post("https://69390a87c8d59937aa063eab.mockapi.io/Example",data).then((res)=> {
      console.log(res.data);
      setfetchData(prev => [...prev, res.data]);
      setDisplayedData(prev => [...prev, res.data]);
    })
  }

  let handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setDisplayedData(fetchData);
      return;
    }
    const filtered = fetchData.filter(item => {
      return (
        (item.name && item.name.toLowerCase().includes(term)) ||
        (item.email && item.email.toLowerCase().includes(term)) ||
        (item.number && String(item.number).toLowerCase().includes(term)) ||
        (item.id && String(item.id).toLowerCase().includes(term))
      )
    })
    setDisplayedData(filtered);
  }

  // added use memo 

  const renderedList=useMemo((()=>{
    return fetchData.map((item)=>
      <div key={item.id} className='flex justify-evenly items-center p-2'>
        <p>{item.name}</p>
        <p>{item.email}</p>
        <p>{item.number}</p>
        <p>{item.password}</p>
        <div className='space-x-6'>
          <button className="bg-green-900 text-white p-2 border rounded-full">Edit</button>
          <button onCLick={()=>{handleDelet(a.id)}} className="bg-green-900 text-white p-2 border rounded-full">Delete</button>
          <button></button>
        </div>
      </div>
  }))

  return (
    <div>
      <form onSubmit={(e)=>{onSubmit(e)}} className='bg-gray-300 p-10 flex justify-center m-3 gap-10 text-black' action="">
        <input required type="text" onChange={(e)=>{setInputName(e.target.value)}} value={inputName} placeholder='enter your name' className='border p-2 m-2 rounded-xl' />
        <input required type="email" onChange={(e)=>{setInputEmail(e.target.value)}} value={inputEmail} placeholder='enter your email' className='border p-2 m-2 rounded-xl' />
        <input required type="tel" onChange={(e)=>{setInputNumber(e.target.value)}} value={inputNumber} placeholder='enter your number' className='border p-2 m-2 rounded-xl' />
        <input required type="password" onChange={(e)=>{setInputPassword(e.target.value)}} value={inputPassword} placeholder='enter your password' className='border p-2 m-2 rounded-xl' />
        <button className='border p-2 m-2 rounded-xl'>submit</button>
      </form>
      <div>
        {inputName}<br/>
        {inputEmail}<br/>
        {inputNumber}<br/>
        {inputPassword}<br/>
      </div>

      <div className='flex items-center gap-3 p-4'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } }}
          placeholder='Search by name, email, number or id'
          className='border p-2 rounded-xl w-80'
        />
        <button type='button' onClick={handleSearch} className='border p-2 rounded-xl'>Search</button>
        <button type='button' onClick={() => { setSearchTerm(''); setDisplayedData(fetchData); }} className='border p-2 rounded-xl'>Clear</button>
      </div>

      <div className='p-10'>
        {displayedData.map((item) => (
          <div key={item.id} className='border p-2 m-2'>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Number:</strong> {item.number}</p>
            <p><strong>Password:</strong> {item.password}</p>
            <p><strong>ID:</strong> {item.id}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App