import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import style from '../css/Profile.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-loader-spinner'
function ProfileComponent() {
    let { userId } = useParams()
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const {displayName, pictureUrl} = user
    const fetchData=()=> {
        axios
        .get(`${process.env.REACT_APP_API_USER}/user/${userId}`)
        .then(response => {
            setUser(response.data)
        })
        .catch(err=>alert(err))
    }
    const UpdateUser=()=> {
        setLoading(true)
        axios.put(`${process.env.REACT_APP_API_USER}/userUpdate/${userId}`,{displayName, pictureUrl})
        .then(response => {
            if (response.status === 200) {
                setTimeout(() => {
                    fetchData()
                    setLoading(false)
                }, 1000)
            } else {
                setLoading(true)
            }
        })
        .catch(err => {
            alert(err)
        })
    }
    const UpdateAdmin=(userStatus, userId)=> {
        setLoading(true)
        axios.put(`${process.env.REACT_APP_API_USER}/RichMenuHome/0/${userId}`, {userStatus})
        .then(response => {
            if (response.status === 200) {
                setTimeout(() => {
                    fetchData()
                }, 1000);
            }
            setLoading(true)
        })
        .catch(err => console.log(err))
    }

    const UpdateMainHome=(userStatus, userId)=> {
        setLoading(true)
        axios
        .put(`${process.env.REACT_APP_API_USER}/RichMenuHome/1/${userId}`,{userStatus})
        .then(response => {
        if (response.status === 200) {
            setTimeout(() => {
            fetchData()
            }, 1000);
        }
        setLoading(false)
        })
        .catch(err => {
            setError(err.response.data.error)
            setLoading(false)
            console.log(err)
        })
    }

    const UpdateSubHome=(userStatus, userId)=> {
        setLoading(true)
        axios
        .put(`${process.env.REACT_APP_API_USER}/RichMenuHome/2/${userId}`,{userStatus})
        .then(response => {
        if (response.status === 200) {
            setTimeout(() => {
            fetchData()
            setLoading(false)
            }, 1000);
        }
        
        })
        .catch(err => {
            setLoading(false)
            setError(err.response.data.error)
        })
    }

    const setUserToWait=(userStatus, userId) => {
        setLoading(true)
        axios.put(`${process.env.REACT_APP_API_USER}/userUnlink/${userId}`,{userStatus})
        .then(response => {
            if (response.status === 200) {
                setLoading(false)
                fetchData()
            }
        })
        .catch(err => {
            setLoading(false)
            setError(err.response.data.error)
        })
    }
    const DeleteUser=(userId) => {
        setLoading(true)
        axios.delete(`${process.env.REACT_APP_API_USER}/user/${userId}`)
        .then(response => {
            if (response.status === 200) {
                setLoading(false)
                fetchData()
            }
        })
        .catch(err => {
            setLoading(false)
            setError(err.response.data.error)
        })
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    },[])
    return (
        <div className="container d-flex justify-content-center mt-5">
            {loading === false ?
            <div className={style.card}>
            <Link to="/list-users">ย้อนกลับ</Link>
            <div classNameName={style.topContainer}>
                <img alt='โปรไฟล์' src={user.pictureUrl} className={style.profileImage} width="70"/>
                
                <div className="ml-3">
                    <h5 className={style.name}>{user.displayName}</h5>
                    <span className={style.mail}>{user.nickName}</span>
                    <p className={style.mail}>{user.userId}</p>
                </div>
            </div>

            <div className='mt-4'>
                <div className={style.recenBorder}>
                    <span className={style.recentOrders}>ข้อมูล</span>
                </div>
            </div>
            <div className='pt-2'>
                <div className={style.wishlistBorder}>
                    <span className={style.wishlist}>ชื่อเล่น : {user.nickName}</span>
                </div>
            </div>
            <div className='pt-2'>
                <div className={style.fashionStudioBorder}>
                    <span className={style.fashionStudio}>บ้านเลขที่ : {user.userStatus}</span>
                </div>
            </div>
            <h3>{error}</h3>
                <div className='row g-2 justify-content-md-center'>
                    <div className='col-sm-5'>
                            <button className='btn btn-outline-primary' onClick={()=>UpdateAdmin("Admin", user.userId)}>ตั้งเป็น Admin</button>
                    </div>
                    <div className='col-sm-5'>
                            <button className='btn btn-outline-warning' onClick={()=>UpdateMainHome("99" , user.userId)}>ตั้งเป็นบ้าน 99</button>
                    </div>
                    <div className='col-sm-5'>
                            <button className='btn btn-outline-info' onClick={()=>UpdateSubHome("99/1" , user.userId)}>ตั้งเป็นบ้าน 99/1</button>
                    </div>
                    <div className='col-sm-5'>
                            <button className='btn btn-outline-secondary' onClick={()=>setUserToWait("รอ" , user.userId)}>ตั้งเป็น รอ</button>
                    </div>
                    <div className='col-sm-5'>
                        <button className='btn btn-outline-success' onClick={()=>UpdateUser()}>อัพเดทโปรไฟล์</button>
                    </div>
                    <div className='col-sm-5'>
                        <button className='btn btn-outline-dark' onClick={()=>DeleteUser()}>ลบโปรไฟล์</button>
                    </div>
                </div>
            </div> 
            :
            <div className={style.Circles}>
            {loading === false ? <h1>กำลังโหลด..</h1> : error}
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
export default ProfileComponent