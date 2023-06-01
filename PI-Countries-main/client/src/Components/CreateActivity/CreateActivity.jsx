import style from "./CreateActivity.module.css"
import { useState, useEffect } from "react"
import {Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, postActivity } from "../../Redux/actions"
import logo from "../Images/logo.png"
import validate from "./Validation"


const CreateActivity = () =>{

    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state)=> state.countries)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries:[]  //le paso un array para que me permita agregar varios paises 
    })

    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelect = (e) =>{
        setInput((estado)=>{
            if(e.target.name === "countries"){
                return{
                    ...estado,
                    countries: [...estado.countries, 
                                e.target.value]
                }
            }else{
                return{
                    ...estado, 
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    const handleSubmit= (e) =>{
        e.preventDefault()
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
            return alert ('Complete the form correctly before submitting it')
        }
        
        dispatch(postActivity(input))
        alert("Activity created successfully")
        setInput({
            name: "",
            difficulty: "",
            season: "",
            duration: "",
            countries:[]
        })
        history.push("/home")
    }

    const handleDelete = (e) =>{
        setInput({
            ...input, 
            countries: input.countries.filter(con => con !== e)
        })

    }
    
    const handleClick = (e) =>{
        history.push("/home")
    }

     useEffect(() => {
        dispatch(getCountries())
    }, []) 

    return(
        <div className={style.prindiv}>
            <div className={style.bar}>
                <Link to="/home">
                    <img className={style.bothome} onClick={handleClick} src={logo} alt="imgLogo"></img>
                </Link>
            </div>
            <div className={style.contenedorform}>
                <h2 className={style.titulof}>Create your activity</h2>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label className={style.campos}>Name: </label>
                        <input className={style.inputs} type="text" value= {input.name} name= "name" onChange={handleChange}/>
                        {errors.name && (<p className={style.errors}>{errors.name}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Select country: </label>
                        <select className={style.inputs} name="countries" id={"countries"} onChange={handleSelect}>
                                <option> </option>                      
                                    {countries.map((con) => (
                                <option value={con.id} key={con.id}>{con.name}</option>
                            ))}
                        </select>
                        {errors.countries && (<p className={style.errors}>{errors.countries}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Select season: </label>
                        <select className={style.inputs} name="season" id="season" onChange={handleSelect}>
                        <option value="vacio"> </option>
                            <option value={"Summer"}>Summer </option>
                            <option value={"Winter"}>Winter </option>
                            <option value={"Spring"}>Spring </option>
                            <option value={"Autumn"}>Autumn </option>
                        </select>
                        {errors.season && (<p className={style.errors}>{errors.season}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Difficulty: </label>
                        <input className={style.inputs} type="number" value= {input.difficulty} name= "difficulty" onChange={handleChange}/>
                        <label className={style.campos}> (1-5)</label>
                        {errors.difficulty && (<p className={style.errors}>{errors.difficulty}</p>)}
                    </div>
                    <div>
                        <label className={style.campos}>Duration: </label>
                        <input className={style.inputs} type="number" value= {input.duration} name= "duration" onChange={handleChange}/>
                        <label className={style.campos}> (Hours)</label>
                        {errors.duration && (<p className={style.errors}>{errors.duration}</p>)}
                    </div>
                    <div>
                        <button className={style.botsub} type="submit" disabled={Object.keys(errors).length === 0 ? false : true}>Añadir Actividad</button>
                    </div>
                </form>
                                    
                {input.countries.map(e =>
                        <div className={style.conpais}>
                            <p className={style.mpais}> {e} </p>
                            <button className={style.botelim} onClick={()=> handleDelete(e)}>X</button>
                        </div>    
                )}
            
            </div>
        </div>

    )

}


export default CreateActivity




