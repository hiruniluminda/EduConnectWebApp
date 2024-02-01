import React, { useState } from 'react'
import './setting.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Notification = () => {
  return(
    <div className='notification'>
      <div>
      <NotificationsIcon className='notification-icon' />
      <p>Notification</p>
      </div>
      <Switch defaultChecked className='notification-switch' />
    </div>
  )
}

const Security = () => {
  return(
    <div>
      <h5>Change Password</h5>

      <div>
        <input type="password" placeholder='Current password' /><br />
        <input type="password" placeholder='New password' /><br />
        <input type="password" placeholder='Confirm password' /><br />
      </div>
    </div>
  )
}

const Appearance = () => {
  return(
    <div className='appearance'>
      <div className="left"><WbSunnyIcon /> Light</div>
      <div className="middle"><Switch /></div>
      <div className="right"><DarkModeIcon /> Dark</div>
    </div>
  )
}

const Help = () => {
  return(
    <div>help</div>
  )
}

const Setting = () => {
  const[active, setActive] = useState('notification')
  return (
    <div>
      <h2>Setting</h2>
      <div className="top-section">
        <button onClick={() => setActive("notification")}>Notification</button>
        <button onClick={() => setActive("security")}>Security</button>
        <button onClick={() => setActive("appearance")}>Appearance</button>
        <button onClick={() => setActive("help")}>Help</button>
      </div>

      <div className="bottom-section">
        {
          active === 'notification' && <Notification />
        }
        {
          active === 'security' && <Security />
        }
        {
          active === 'appearance' && <Appearance />
        }
        {
          active === 'help' && <Help />
        }
      </div>
    </div>
  )
}

export default Setting;