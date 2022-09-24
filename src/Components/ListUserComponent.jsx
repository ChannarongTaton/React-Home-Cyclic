import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/List.module.css'
function ListUserComponent() {

    const [statein, setStateIn] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData=()=> {
        axios.get(`${process.env.REACT_APP_API_USER}/users`)
        .then(response => {
            console.log(response.data)  
        setStateIn(response.data)
        })
        .catch(err => console.log(err))
        
    }

    const trickBtn=(id, active, lineName)=> {
        setLoading(true)
        axios
        .put(`${process.env.REACT_APP_API}/Change-state/${id}`,{active, lineName})
        .then(response => {
          console.log(response.data.isActive);
          if (response.status === 200) {
            setTimeout(() => {
              fetchData()
              setLoading(false)
            }, 500);
          } else {
            setLoading(true)
          }
        })
        .catch(err => console.log(err))
      }
    useEffect(() => {
        // fetchData()
    },[])

    return (
    <div className='container-md'>
        <h2>จัดการสมาชิก</h2>
        <div className='justify-conten-center'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th><h3>#</h3></th>
                        <th><h3>ชื่อเล่น</h3></th>
                        <th><h3>สถานะ</h3></th>
                        <th><h3>การกำหนด</h3></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{1}</td>
                        <td>ต้น</td>
                        <td>wait</td>
                        <td>
                            <button>Active</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        {/* { statein.map((user, index) => (
            <div key={index} className="table">
                <table className="border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th className='border border-slate-600'><h3>ลำดับ</h3></th>
                            <th className='border border-slate-600'><h3>ชื่อเล่น</h3></th>
                            <th className='border border-slate-600'><h3>สถานะ</h3></th>
                            <th className='border border-slate-600'><h3>จัดการ</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-slate-700'>{index+1}</td>
                            <td className='border border-slate-700'>{user.nickName}</td>
                            <td className='border border-slate-700'>{user.userStatus}</td>
                            <td className='border border-slate-700'>ปุ่มนะ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        ))

        } */}
    </div>
    )
}

export default ListUserComponent