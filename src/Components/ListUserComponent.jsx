import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from '../css/List.module.css'
import { BiUserCheck, BiUserMinus } from 'react-icons/bi'
import { MdInfo } from 'react-icons/md'
import { Blocks } from 'react-loader-spinner'
function ListUserComponent() {

    const [statein, setStateIn] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData=()=> {
        axios.get(`${process.env.REACT_APP_API_USER}/users`)
        .then(response => {
        setStateIn(response.data)
        setLoading(false);
        })
        .catch(err => console.log(err))
    }

    const trickBtnOn=(userStatus, userId)=> {
        setLoading(false)
        axios
        .put(`${process.env.REACT_APP_API_USER}/userActive/${userId}`,{userStatus})
        .then(response => {
        if (response.status === 200) {
            setTimeout(() => {
            fetchData()
            setLoading(true)
            }, 500);
        }
        })
        .catch(err => console.log(err))
    }

    const trickBtnOff=(userStatus, userId)=> {
        setLoading(false)
        axios
        .put(`${process.env.REACT_APP_API_USER}/userLoad/${userId}`,{userStatus})
        .then(response => {
        if (response.status === 200) {
            setTimeout(() => {
            fetchData()
            setLoading(true)
            }, 500);
        }
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchData()
    },[])

    return (
    <div className='container-sm'>
        {loading === false ?  statein.map((user, index) => (
            <div className='justify-conten-center'>
            <h2 className={style.container} >จัดการสมาชิก</h2>    
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th><h2>#</h2></th>
                        <th><h2>ชื่อเล่น</h2></th>
                        <th><h2>สถานะ</h2></th>
                        <th><h2>การกำหนด</h2></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{index+1}</td>
                        <td>{user.nickName}</td>
                        <td>{user.userStatus}</td>
                        <td className={style.Icons_table}>
                            {user.userStatus === 'wait' ? <BiUserCheck onClick={
                            ()=>trickBtnOn(user.userStatus , user.userId)}/> : <BiUserMinus onClick={
                                ()=>trickBtnOff(user.userStatus , user.userId)}/>}
                            <MdInfo/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>{user.userStatus}</p>
            <p>{user.userId}</p>
        </div>
        )) :
        <div className={style.Circles}>
            <Blocks visible={true} height="150" width="150"
            ariaLabel="blocks-loading" wrapperStyle={{}}
            wrapperClass="blocks-wrapper"/>
        </div>}
    </div>
    )
}

export default ListUserComponent