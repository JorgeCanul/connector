import { useDispatch } from "react-redux";
 import React from 'react'
 
 export default function dispatch(d) {
   const dis = useDispatch();
   return (
     <div>{dis(d)}</div>
    
   )
 }
 



 