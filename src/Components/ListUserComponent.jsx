import React, { useState, useEffect } from 'react'
import axios from 'axios'
import style from '../css/List.module.css'
import { BiUserCheck, BiUserMinus } from 'react-icons/bi'
import { MdInfo } from 'react-icons/md'
import { Blocks } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
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
        setLoading(true)
        axios
        .put(`${process.env.REACT_APP_API_USER}/userActive/${userId}`,{userStatus})
        .then(response => {
        if (response.status === 200) {
            setTimeout(() => {
            fetchData()
            }, 1000);
        }
        setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const trickBtnOff=(userStatus, userId)=> {
        setLoading(true)
        axios
        .put(`${process.env.REACT_APP_API_USER}/userLoad/${userId}`,{userStatus})
        .then(response => {
        if (response.status === 200) {
            setTimeout(() => {
            fetchData()
            setLoading(false)
            }, 1000);
        }
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchData()
    },[])

    return (
    <div className='container-sm'>
        <div className='justify-conten-center'>
            {loading === false ?
            <div>
                <h2 className={style.container} >จัดการสมาชิก</h2>
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
                                <BiUserCheck onClick={
                                ()=>trickBtnOn("99" , user.userId)}/>
                                <BiUserMinus onClick={
                                    ()=>trickBtnOff("99/1" , user.userId)}/>
                                <div>
                                <Link className={style.Icons_table} to={{pathname: `/user/${user.userId}`}}><MdInfo/></Link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                ))
            }
            </table>
            </div> :
                <div className={style.Circles}>
                <Blocks visible={true} height="150" width="150"
                ariaLabel="blocks-loading" wrapperStyle={{}}
                wrapperClass="blocks-wrapper"/>
                </div> 
    }
        </div>
    </div>
    )
}



export default ListUserComponent