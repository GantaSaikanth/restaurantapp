import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CategoryTabs from '../CategoryTabs'
import DishesItem from '../DishesItem'
import './index.css'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    count: 0,
    status: diffStates.initial,
    cartData: [],
    activeTabId: '11',
    showErrorMsg: false,
  }

  componentDidMount() {
    this.getCartItems()
  }

  onClickTabBtn = id => {
    this.setState({activeTabId: id})
  }

  onIncrease = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  onDecrease = () => {
    const {count} = this.state
    if (count === 0) {
      this.setState({count: 0})
    } else {
      this.setState(prev => ({count: prev.count - 1}))
    }
  }

  getCartItems = async () => {
    this.setState({status: diffStates.inProgress})

    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const response = await fetch(url)

    const data = await response.json()

    if (response.ok === true) {
      this.setState({status: diffStates.success, cartData: data})
    } else {
      this.setState({status: diffStates.fail, showErrorMsg: true})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  successPage = () => {
    const {cartData, activeTabId, count} = this.state
    const tableMenuFirst = cartData[0].table_menu_list
    const filteredData = tableMenuFirst.filter(
      each => each.menu_category_id === activeTabId,
    )

    const categoryItems = tableMenuFirst.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
    }))

    const updatedActiveTabDishes = {
      categoryDishes: filteredData[0].category_dishes,
    }

    const updatedDishesItems = updatedActiveTabDishes.categoryDishes.map(
      each => ({
        addonCat: each.addonCat,
        dishId: each.dish_id,
        dishName: each.dish_name,
        dishPrice: each.dish_price,
        dishImage: each.dish_image,
        dishCurrency: each.dish_currency,
        dishCalories: each.dish_calories,
        dishDescription: each.dish_description,
        dishAvailability: each.dish_Availability,
        dishType: each.dish_Type,
      }),
    )

    return (
      <div className="dish-item-container">
        <ul className="category-tabs">
          {categoryItems.map(each => (
            <CategoryTabs
              key={each.menuCategoryId}
              menuData={each}
              onClickTabBtn={this.onClickTabBtn}
            />
          ))}
        </ul>

        <ul className="dishes-tab">
          {updatedDishesItems.map(each => (
            <DishesItem
              key={each.dishId}
              dishesData={each}
              count={count}
              onIncrease={this.onIncrease}
              onDecrease={this.onDecrease}
            />
          ))}
        </ul>
      </div>
    )
  }

  failurePage = () => {
    const {showErrorMsg} = this.state

    return <>{showErrorMsg ? <p>Failed To Load...</p> : ''}</>
  }

  renderPages = () => {
    const {status} = this.state

    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.successPage()
      case diffStates.fail:
        return this.failurePage()
      default:
        return null
    }
  }

  render() {
    const {count} = this.state

    return (
      <>
        <div className="main-container">
          <Header count={count} />
          {this.renderPages()}
        </div>
      </>
    )
  }
}

export default Home
