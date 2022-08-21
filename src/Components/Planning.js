import React, { useState, useRef } from "react";
import data from "./data/profile.json"

const Planning = () => {
    const [expenses, setExpenses] = useState(data);
    const [income,setIncome] = useState(100);
    const [expense,setExpense] = useState(200);
    const [price,setPrice] = useState(500);
    // const [error, setError] = useState("");
    const radiosWrapper = useRef();

    const [addData, setAddData] = useState({
        text : '',
        amount : '', 
    })

    const handleAddition = (e) => {
        e.preventDefault()
        const inputs = e.target.getAttribute("name")
        const inputValue = e.target.value
        const newData = { ...addData }
        newData[inputs] = inputValue;

        setAddData(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newInputs = {
            id : Math.floor(Math.random()* 1000) + 1,
            title : addData.title,
            amount : addData.amount,
        };
        const newInputData = [...expenses, newInputs];
        setExpenses(newInputData);
        const inputAmount = Number(`${addData.amount}`)
        
        const checkedInput = radiosWrapper.current.querySelector('input:checked');
      
        if(checkedInput.name === "income"){
            const inc = income + inputAmount
            setIncome(inc)
        }
        else if(checkedInput.name === "expense"){
            const exp = expense + inputAmount
            setExpense(exp)
        }
        //  else if(checkedInput.name === "income" && checkedInput.name === "expense" ){
        //     setError("You checked in two things")
        // }
        const priceAdd = inputAmount + price
        setPrice(priceAdd)
    }

    return ( 
        <div>
            <p>YOUR BALANCE</p>
            <h2>$ {price} </h2>
            <div className="inexp">
                <div className="income" >
                    <span>INCOME</span>
                    <span>${income} </span>
                </div>
                <div className="expense" >
                    <span>EXPENSE</span>
                    <span>${expense}</span>
                </div>
            </div>

           <div className="history">
                <p>History</p> <hr></hr>
                <ul>
                    {expenses.map((expense, id) => {
                      return <li key={id}>{expense.title} <span> ${expense.amount}</span> </li>
                    })}
                </ul>
           </div>

           <div className="form">
                <h2>Add new transaction</h2>
               {/* <h5> {error}</h5> */}
                <div className="form2">
                    <form onSubmit={handleSubmit} >
                        <label> Title </label> <br></br>
                        <input type="text"   name="title" className="forum"
                        onChange={handleAddition}
                         placeholder="Enter the title"></input> <br></br>
                        <label> Amount </label> <br></br>
                        <input type="text" className="forum"
                          name="amount"
                          onChange={handleAddition}
                        placeholder="Enter the amount" ></input>
                        <div ref={radiosWrapper}>
                           <label className="radi" > 
                                <input type="radio" className="hey" key={1} name="income" /> Income 
                            </label>
                            <label className="radi" > 
                                <input type="radio"  className="hey"key={2}  name="expense" />Expenses
                            </label>
                        </div>
                        <button onSubmit={handleSubmit}>Add transaction</button>
                    </form>
                </div>
           </div>
        </div>
    );
}


export default Planning ;