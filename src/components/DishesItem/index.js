import './index.css'

const DishesItem = props => {
  const {dishesData, count, onIncrease, onDecrease} = props
  const {
    addonCat,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
  } = dishesData

  const onClickDecreaseBtn = () => {
    onDecrease()
  }

  const onClickIncreaseBtn = () => {
    onIncrease()
  }

  return (
    <li className="list-dish-item">
      <div className="dishes-container">
        <h1>{dishName}</h1>
        <p>
          {dishCurrency} {dishPrice}
        </p>
        <div className="calory-container">
          <p>{dishDescription}</p>
        </div>

        {dishAvailability ? (
          <div className="button-container">
            <button
              className="negative-btn"
              type="button"
              onClick={onClickDecreaseBtn}
            >
              -
            </button>
            <p className="count-para">{count}</p>
            <button
              className="postive-btn"
              type="button"
              onClick={onClickIncreaseBtn}
            >
              +
            </button>
          </div>
        ) : (
          <p>Not available</p>
        )}

        {addonCat.length > 0 ? <p>Customizations available</p> : ''}
      </div>
      <p>{dishCalories} Calories</p>
      <div>
        <img src={dishImage} alt={dishName} className="image" />
      </div>
    </li>
  )
}

export default DishesItem
