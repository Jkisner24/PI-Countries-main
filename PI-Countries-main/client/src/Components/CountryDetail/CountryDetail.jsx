import style from "./CountryDetail.module.css";
import {useDispatch, useSelector} from "react-redux"
import { getCountriesDetail } from "../../Redux/actions";
import { Link, useHistory} from "react-router-dom";
import { useEffect } from "react";
import logo from "../Images/logo.png"



const CountryDetail = (props) =>{
    
    const dispatch = useDispatch()
    const id = props.match.params.id //accedo al id de ese para
    const country = useSelector((state)=> state.detail)
    const history = useHistory()
 
    useEffect(() => {
        dispatch(getCountriesDetail(id))
    },[dispatch, id])

    const handleClick = () =>{
        history.push("/home")        
    }

    return(
        <div className={style.prindiv}>
            <div className={style.bar}>
                <Link to ="/home">
                    <img className={style.bothome} onClick={handleClick} src={logo} alt="logo"></img>
                </Link>
            </div>

            <div className={style.cardd}>
                <div className={style.conpais}>
                <h2 className={style.titulod}>Detail</h2>
            {
                country ?
                <div>
                    <h2 className={style.nombred}>{country.name}</h2>
                    <img className={style.banderad} src={country.imgFlag} alt="Imagen not found" />
                    <h4 className={style.continented}>{country.continent}</h4>
                    <h4 className={style.codigo}>{country.id}</h4>
                    <h4 className={style.detalle}>Capital: {country.capital}</h4>
                    <h4 className={style.detalle}>Region: {country.subregion}</h4>
                    <h4 className={style.detalle}>Area: {country.area} km²</h4>
                    <h4 className={style.detalle}>Population: {country.population} Hab.</h4>
                </div> : <p>Loading...</p>
            }  
            </div>

            <div className={style.conact}>
            <h3 className={style.titulod}>Country activities</h3>

            {
                country.Activities&&country.Activities.length ? 
                country.Activities.map(e =>{
                    return(
                        <div>
                            <h4 className={style.nombreact}>{e.name}</h4>
                            <p className={style.detalle}>Difficulty: {e.difficulty}</p>
                            <p className={style.detalle}>Duration: {e.duration} hours</p>
                            <p className={style.detalle}>Season: {e.season}</p>
                        </div>
                    )
                })
                : <p>There are no activities in the country yet</p>
            }

            <Link to="/activities">
                <button className={style.botactd}>Create Activity</button>
            </Link>

            </div>
            </div>
        </div>
        )
}


export default CountryDetail;