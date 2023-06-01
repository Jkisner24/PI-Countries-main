import style from "./LandingPage.module.css"
import {Link} from "react-router-dom";

const LandingPage = () =>{
    return(
        <div className={style.landing}>
            <div>
            <div className={style.presentation}><p>PI sobre Countries para el bootcamp "Soy Henry"</p></div>
                <Link to ="/home">
                    <button className={style.buttonLanding}>Ingresar</button>
                </Link>
            <div className={style.autor}><h4>Julian Kisner</h4></div>
            </div> 
        </div>
    )

}

export default LandingPage