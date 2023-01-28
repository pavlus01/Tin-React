import React from 'react'
import { deleteWypozyczalniaApiCall } from '../../apiCalls/wypozyczalniaApiCalls'
import {Navigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";

function WypozyczalniaDelete() {

    const [error, setError] = useState(null)
    const [deleted, setDeleted] = useState(false)
    const [message, setMessage] = useState(null)

    let { wypozyczalniaId } = useParams()
    wypozyczalniaId = parseInt(wypozyczalniaId)

    useEffect(() => {
        deleteWypozyczalnia()
    }, [])

    function deleteWypozyczalnia() {
            let promise, response;
                promise = deleteWypozyczalniaApiCall(wypozyczalniaId)
    
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                setError(null)
                            } else {
                                setDeleted(true)
                            }
                        },
                        (error) => {
                            setError(error)
                            console.log(error)
                        }
                    )
            }
        }

        if (deleted) {
            return (
                <Navigate to={{
                    pathname: "/Wypozyczalnia/",
                    }} replace={true} />
            )
        }
    
}

export default WypozyczalniaDelete