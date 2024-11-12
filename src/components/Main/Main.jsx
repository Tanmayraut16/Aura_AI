import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'


const Main = () => {
  return (
    <div className='main'>
        <div className="nav">
            <p>Aura</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            <div className="greet">
                <p><span>Hello Tanmay.</span></p>
                <p>How can I help you?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quasi.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quasi.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quasi.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, quasi.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
            </div>

            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter Prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        <img src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className="bottom-info">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit commodi, nostrum libero iste fuga voluptate!
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main