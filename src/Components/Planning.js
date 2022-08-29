import React, { useState, useRef } from "react";
import data from "./data/profile.json"
import Form from "./Form";

const Planning = () => {

    const [expenses, setExpenses] = useState(data);
    const [income,setIncome] = useState(100);
    const [expense,setExpense] = useState(200);
    const [price,setPrice] = useState(500);
    const radiosWrapper = useRef();
    const [checked, setChecked] = useState(null)
    const [addData, setAddData] = useState({
        text : '',
        amount : '', 
    })

    // handles addition of data
    const handleAddition = (e) => {
        e.preventDefault()
        const inputs = e.target.getAttribute("name")
        const inputValue = e.target.value
        const newData = { ...addData }
        newData[inputs] = inputValue;

        setAddData(newData);
    }

    // handles output of data after submitting
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
                const priceAdd = inputAmount + price
                setPrice(priceAdd)
                setIncome(inc) 
            }
            else if(checkedInput.name === "expense"){
                const exp = expense + inputAmount  
                const nowtotal = price - inputAmount  
                setExpense(exp)
                setPrice(nowtotal)
            }
        e.target.reset();   
    }

    // handles allowing of one checked radio at a time
    const changeHandler = (item) => {   
        item === checked ? setChecked(null) : setChecked(item)   
    }

    // handles deleting of data
    const handleDelete = (id) =>{
        const deleteit = [...expenses]
        const index = expenses.findIndex((i)=> i.id === id)
        deleteit.splice(index,1)
        setExpenses(deleteit)
    }

    return ( 
        <div>
            <p>YOUR BALANCE</p>
            <h2> ${price} </h2>
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
                      return <li key={id}>{expense.title} 
                    <span className="amount"> ${expense.amount}</span>
                    <span className="delete" onClick={()=>handleDelete(expense.id)}>❌</span> 
                    </li>
                    })}
                </ul>
           </div>

           <Form handleSubmit={handleSubmit} 
                handleAddition={handleAddition}
                changeHandler={changeHandler}
                checked={checked}
                radiosWrapper={radiosWrapper}
            ></Form>

        </div>
    );
}

export default Planning ;