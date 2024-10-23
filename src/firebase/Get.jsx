import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import { collection, getDoc, getDocs } from 'firebase/firestore'

const Get = () => {
    const [datos, setDatos] = useState([])
    const coleccion = collection(firebase, "ventas")

    const getData = async () => {
        const data = await getDocs(coleccion)
        setDatos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))

        console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            {datos.map(d => (
                <>
                    <p>{d.name}</p>
                    <p>{d.email}</p>
                    <p>{d.phone}</p>
                    <p>numeros: {d.numbers?.map(n => (<>
                        <p key={n+1}>{n}</p>
                    </>))}</p>
                </>
            ))}
        </div>
    )
}

export default Get