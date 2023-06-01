import { useState, useEffect } from "react" 
import { useDispatch, useSelector } from "react-redux"
import { getCountries, getActivities, filterByAct, filterByContinents, orderByName, orderByPop} from "../../Redux/actions"
import Card from "../Card/Card"
import NavBar from "../NavBar/NavBar"
import Paginado from "../Paginado/Paginado"
import style from "./Home.module.css"


const Home = () =>{

    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.allActivities)

    const [orden, setOrden] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)

    const indexOfLastCountrie = currentPage * countriesPerPage 
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    const handleSort = (e) =>{
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    const handleSortPop = (e) =>{
        dispatch(orderByPop(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    const handleFilteredCountrie = (e) =>{
        dispatch(filterByContinents(e.target.value))
        console.log(e.target.value)
        setCurrentPage(1)
    }

    const handleFilterByAct = (e) =>{
        e.target.value === "none" ? dispatch(getCountries()) :
        dispatch(filterByAct(e.target.value))
        setCurrentPage(1)
    }

    return(
        <div className={style.prindiv}>
            <div>
                <NavBar setCurrentPage={setCurrentPage}/>
            </div>
            <div className={style.filtros}>
                <div>
                    Sort by: Alphabetical 
                    <select className={style.select} onChange={handleSort}>
                      <option>Alphabetical</option>
                      <option value="asc">Ascendant</option>
                      <option value="desc">Descendiente</option>  
                    </select>
                </div>
                <div>
                    Sort by: Population
                    <select className={style.select} onChange={handleSortPop}>
                      <option>Population</option>
                      <option value="mayp">Lower population</option>
                      <option value="menp">Higher population</option>
                    </select>
                </div>
                <div>
                    Source by: Continents
                    <select className={style.select} onChange={handleFilteredCountrie}>
                      <option value={"All"}>All</option>
                      <option value={"South America"}>South America</option>
                      <option value={"North America"}>North America</option>
                      <option value={"Africa"}>Africa</option>
                      <option value={"Asia"}>Asia</option>
                      <option value={"Europe"}>Europe</option>
                      <option value={"Oceania"}>Oceania</option>
                      <option value={"Antarctica"}>Antarctica</option>
                    </select>
                </div>
                <div>
                    Source by Activity
                    {(activities.length === 0) ? <p>No activities found</p> :
                    <select className={style.select} onChange={handleFilterByAct}>
                        <option value="none"></option>
                    {activities.map(e => (
                        <option value={e.name} key={e.id}>{e.name}</option>))          
                    }
                    </select>
                    }
                </div>
            </div>

                {currentCountries?.map((e) => {
                    return (
                        <div className={style.contenedorCards}>
                            <Card key={e.id} id={e.id} imgFlag={e.imgFlag} name={e.name} continent={e.continent}/>
                        </div>
                    )}
                )}
                <div className={style.paginado}>
                    <Paginado
                       countriesPerPage = {countriesPerPage}
                       allCountries = {allCountries.length}
                       paginado = {paginado}/> 
                </div>

        </div>
    )
}

export default Home
