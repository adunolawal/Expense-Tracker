import React from "react";

const Form = (props) => {
    return ( 
        <div className="form"> 
            <h2>Add new transaction</h2>
            <div className="form2">
                <form onSubmit={props.handleSubmit} >
                    <label> Title </label> <br></br>
                    <input type="text"  name="title" className="forum" required
                    onChange={props.handleAddition}
                    placeholder="Enter the title"></input> <br></br>
                    <label> Amount </label> <br></br>
                    <input type="text" className="forum" required
                    name="amount"
                    onChange={props.handleAddition}
                    placeholder="Enter the amount" ></input>
                    <div ref={props.radiosWrapper} >
                    <label className="radi" > 
                            <input type="radio" className="hey" key={1} checked={props.checked === "Income"} onChange={()=> props.changeHandler("Income") } name="income" /> Income 
                        </label>
                        <label className="radi" > 
                            <input type="radio" className="hey"key={2} checked={props.checked === "expense"} onChange={()=> props.changeHandler("expense") } name="expense" />Expenses
                        </label>
                    </div>
                    <button onSubmit={props.handleSubmit}>Add transaction</button>
                </form>
            </div>
        </div>
     );
}
 
export default Form;