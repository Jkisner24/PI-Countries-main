import style from "./Paginado.module.css"


const Paginado = ({countriesPerPage, allCountries, paginado}) =>{
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <nav className={style.contpag}>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <button className={style.botpag} key={number} onClick={() => paginado(number)}>
                            {number}
                        </button>
                    ))
                }
            </ul>
        </nav>
    )

}

export default Paginado 