import React, { useCallback, useEffect, useState } from 'react'

export default function Applicants() {
    const [data,setData] = useState([]);

    const fetchApplicantsCB = useCallback(() => {
        fetch(`http://localhost:4000/apps`)
        .then(res => res.json())
        .then(dataSnapshot => {
            console.log('dataSnapshot',dataSnapshot)
            setData(dataSnapshot)
        })
    },[data])

    useEffect(() => {
        fetchApplicantsCB()
    },[data])

    function deleteItem(id){
        fetch(`http://localhost:4000/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

  return (
    <div>
        <h1>Applicants</h1>
        {
            data?.map((item,index) => (
                <div style={{padding:20,backgroundClip:'gray'}}
                key={index}>
                    <p>{item?.fullname}</p>
                    <p>{item?.email}</p>
                    <p>{item?.phone}</p>
                    <p>{item?.address}</p>
                    <p>{item?.date}</p>
                    <button onClick={() => deleteItem(item._id)}>delete</button>
                    <hr />
                </div>
            ))
        }
    </div>
  )
}
