import React, { useEffect, useState } from "react"
import FormLinks from './FormLinks';

import { toast } from 'react-toastify';

import { db } from "./firebase"

const Links = () => {
    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState("");

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === "" || linkObject === "") {
                await db.collection('links').doc().set(linkObject)
                toast("new link added", {
                    type: 'success',
                    autoClose: 2000
                })
            }
            else
            {
               await db.collection('links').doc(currentId).update(linkObject)
               toast("link updated successfully",{
                   type:"info",
                   autoClose: 2000
               })
               setCurrentId('')
            }
            
        } catch (error) {
            alert(error)
        }

    }

    const onDeleteLink = async (id) => {
        if (window.confirm("are you sure, you want delete this link!")) {
            await db.collection('links').doc(id).delete();
            toast("link delete correctly", {
                type: 'error',
                autoClose: 2000
            })
        }

    }

    const getLinks = () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            setLinks(docs)
        });
    }

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div>
            <div className="col-md-8 p-2">
                <FormLinks {...{ addOrEditLink, currentId, Links }} />
            </div>
            <div className="col-md-8 p-2">
                {
                    links.map(link => (
                        <div className="card md-1"
                            key={link.id}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h4>{link.name}</h4>
                                    <div>
                                        <i className="material-icons text-danger"
                                            onClick={() => onDeleteLink(link.id)}>close</i>

                                        <i className="material-icons "
                                            onClick={() => setCurrentId(link.id)}>create</i>
                                    </div>
                                </div>
                                <p> {link.description} </p>
                                <a href={link.url} target="_blank" rel="noreferrer">Go to website</a>
                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    )

}

export default Links;