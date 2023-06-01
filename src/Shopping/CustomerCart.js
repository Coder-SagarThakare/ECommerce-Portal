// import { render, screen } from "@testing-library/react";
// import react from "react";
// import { ReactDOM } from "react-dom";
// import Shopping from "./Shopping";
// import axios from "axios";
import CustomerCart from "../Customer/CustomerCart";
import { render,screen } from "@testing-library/react"
// import Shopping from "./Shopping"

test ("checks headers online shopping", ()=>{
    // render(<Shopping />)
    render(<CustomerCart />)

    // const linkEle = screen.getByText(/online shopping/i)
    // expect(linkEle).toBeInTheDocument()
})