import style from "./NavBar.module.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries, getCountriesByName } from "../../Redux/actions";
import logo from "../Images/logo.png"


const NavBar = ({setCurrentPage}) =>{

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    const handleClick = (e) =>{
        dispatch(getCountries())
    }
    const handleInputChange = (e) =>{
        dispatch(getCountriesByName(e))
        setCurrentPage(1)
    }

    return(
        <div className={style.navbar}>
            <div>
                <Link to= "/home"><img className={style.bothome} onClick={(e) => handleClick(e)} src={logo} alt="logo"></img></Link>
            </div>
            <div className={style.search}>
                <div className={style.searchtitle}>Find out your new adventure</div>    
                <input className={style.searchinp} value={name} type = "text" placeholder = "Search the country..." 
                onChange = {(e)=> {setName(e.target.value); handleInputChange(e.target.value)}} />
                </div>
                <Link to= "/activities"><button className={style.botact}>Create Activity</button></Link>       
        </div>
    )
}

export default NavBar