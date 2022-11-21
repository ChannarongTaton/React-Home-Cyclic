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
    const {displayName, pictureUrl} = user
    const fetchData=()=> {
        axios
        .get(`${process.env.REACT_APP_API_USER}/user/${userId}`)
        .then(response => {
            setUser(response.data)
        })
        .catch(err=>alert(err))
    }
    const updateUser=()=> {
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
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    },[])
    return (
        <div className="container d-flex justify-content-center mt-5">
            {loading === false ? <div className={style.card}>
            <Link to="/list-users">ย้อนกลับ</Link>
            <div classNameName={style.topContainer}>
                
                <img alt='โปรไฟล์' src={user.pictureUrl} className={style.profileImage} width="70"/>
                
                <div className="ml-3">
                    <h5 className={style.name}>{user.displayName}</h5>
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
            <button className='btn btn-success' onClick={()=>updateUser()}>อัพเดทโปรไฟล์</button>
            </div> 
            :
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
export default ProfileComponent