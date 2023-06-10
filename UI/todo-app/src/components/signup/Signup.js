import React, { useState } from 'react'
import "./signup.css"
import {signup} from '../../api' 

const Signup = () => {
    const [input, setInput] = useState({})
    console.log(input);
    const handleChange = (e) => {
        setInput((v) =>({
            ...v,
            [e.target.name]: e.target.value
        }) )
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit', input);
        try{
            await signup(input);

        }
        catch(err){
            console.log('handleSubmitError', err);
        }

    };
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="signup">
            <div className='inputes'>
                <label>NAME</label>
                <input type="" name='name' required= {true} onChange={handleChange} />
            </div>
            <div className='inputes'>
                <label>EMAIL</label>
                <input type="" name='email' required= {true} onChange={handleChange} />
            </div>
            <div className='inputes'>
                <label>PHONE</label>
                <input type="" name='phone' required= {true} onChange={handleChange}/>
            </div>
            <div className='inputes'>
                <label>USERNAME</label>
                <input type="" name='userName' required= {true} onChange={handleChange}/>
            </div>
            <div className='inputes'>
                <label>PASSWORD</label>
                <input type="" name='password' required= {true} onChange={handleChange}/>
            </div>
            
        </div>
        <button type="submit" style={{margin: '20px'}}>Submit</button>
        </form>
    </div>
  )
}

export default Signup