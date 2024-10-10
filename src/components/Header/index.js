import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {count, cartDataName} = props

  return (
    <div className="header-container">
      <h1>{cartDataName}</h1>
      <div className="order-container">
        <p className="order-para">My Orders</p>
        <div className="cart-container">
          <IoCartOutline className="cart-icon" />
          <span className="counts">{count}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
