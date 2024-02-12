import React from 'react'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
const Success = () => {
    const {session_id} = useParams()
    const [status , setStatus] = useState(null)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/checkout/success?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
        setStatus(data)
        })
    },[])
  return (
    <div>
      PAyment is  {status?.message}
    </div>
  )
}

export default Success
