import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from '../css/List.module.css'
import { TbEdit } from 'react-icons/tb'
import { ProgressBar } from 'react-loader-spinner'
import { Link } from 'react-router-dom'


function ListUserComponent() {

    const [statein, setStateIn] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData=()=> {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_USER}/users`)
        .then(response => {
        setStateIn(response.data)
        setLoading(false);
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchData()
    },[])

    return (
        <div className='container p-2 justify-content-center mt-3'>
            {loading === false ?
            <div>
                <h1 className={style.container} >จัดการสมาชิก</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th><h2>#</h2></th>
                    <th><h2>ชื่อเล่น</h2></th>
                    <th><h2>บ้านเลขที่</h2></th>
                    <th><h2>การกำหนด</h2></th>
                </tr>
            </thead>
            {
                statein.map((user, index) => (
                    <tbody>
                        <tr>
                            <td>{index+1}</td>
                            <td>{user.nickName}</td>
                            <td>{user.userStatus}</td>
                            <td className={style.Icons_table}>
                                <Link className={style.Icons_table} to={{pathname: `/user/${user.userId}`}}><TbEdit /></Link>
                            </td>
                        </tr>
                    </tbody>
                ))
            }
            </table>
            </div> :
            <div className={style.Circles}>
                    <h1>กำลังโหลด..</h1>&nbsp;
                    <ProgressBar
                    height="150"
                    width="150"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor = '#000000'
                    barColor = '#3385ff'
                    />
                
            </div>
    }
        </div>
    )
}



export default ListUserComponent