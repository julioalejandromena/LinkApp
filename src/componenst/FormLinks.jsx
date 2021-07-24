import React, {useState, useEffect} from "react"
import { db } from "./firebase"

const FormLinks = (props) =>
{
    const inicialState = 
    {
        url : '',
        name : '',
        description : ''
    }
    const [values, setValues] = useState(inicialState)

    const handleChangeSubmit = (e) =>
    {
        const {name, value} = e.target;
        setValues({...values, [name] : value})
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault(); 
        props.addOrEditLink(values)  
        setValues({...inicialState})   
    }

    const getLinkById = async (id) =>
    {
        const doc = await db.collection('links').doc(id).get()
        setValues({...doc.data()})
    }

    useEffect(()=>{
        if(props.currentId === "")
        {
            setValues({...inicialState})
        }
        else
        {
            getLinkById(props.currentId);
        }

    },[props.currentId])

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_links</i>
                </div>
               <input
                    onChange={handleChangeSubmit}
                    type="text" 
                    className="form-control" 
                    placeholder="https://something.com" 
                    name="url" 
                    value={values.url}
               />

            </div>   

                <div className="form-group input-group mt-2">
                    <div className="input-group-text bg-light">
                        <i className="material-icons">create</i>
                    </div>
                    <input 
                        onChange={handleChangeSubmit}
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="WebSite Name" 
                        value={values.name}
                        />

                </div>

                <div className="from-group mt-2">
                    <textarea 
                        onChange={handleChangeSubmit}
                        name="description" 
                        rows="3" 
                        className="form-control"
                        placeholder="Write a Description"
                        value={values.description}>
                        </textarea>
                </div>

                <button className="btn btn-primary btn-block mt-2">
                    {props.currentId === "" ? 'Guardar' : 'Editar'}
                </button>

        </form>
    )
}

export default FormLinks