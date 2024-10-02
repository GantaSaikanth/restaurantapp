import './index.css'

const CategoryTabs = props => {
  const {menuData, onClickTabBtn} = props
  const {menuCategory, menuCategoryId} = menuData

  const onClickTabButton = () => {
    onClickTabBtn(menuCategoryId)
    console.log(menuCategoryId)
  }

  return (
    <li className="list-tab-items">
      <button className="menu-tab-btn" type="button" onClick={onClickTabButton}>
        <p className="tab-para">{menuCategory}</p>
      </button>
    </li>
  )
}

export default CategoryTabs
