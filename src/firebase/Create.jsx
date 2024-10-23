import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import firebase from './firebase'

const Create = ({ numeros }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")


    const datos = collection(firebase, "ventas")

    const CreateData = async (e) => {
        e.preventDefault()
        await addDoc(datos, { name: name, email: email, phone: phone, address: address, numbers: numeros })
    }

    return (
        <div>

            
            {/* <button type='submit'>Comprar</button> */}

        </div>
    )
}

export default Create