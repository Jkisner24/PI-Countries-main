const validate = (input) =>{
    let errors = {}
    let dif = Number(input.difficulty)
    let dur = Number(input.duration)

    if(!input.name) errors.name = "required field"
    else if (/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = "cannot have special characters or tildes"

    if(!input.difficulty) errors.difficulty = "required field"
    else if (dif <= 0 || dif > 5) errors.difficulty = "must be between 1 and 5"

    if(!input.duration) errors.duration = "required field"    
    else if (dur <= 0 || dur > 24) errors.duration = "Must be between 1 and 24"

    if(!input.season || input.season === "empty") errors.season = "required field"

    if(!input.countries || input.countries.length === 0) errors.countries = "required field"

    return errors;
}


export default validate;