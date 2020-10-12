import React from 'react'
import { connect} from "react-redux"


const submenus = [
    { name: 'Account Overview' },
    { name: 'Manage Utilities'},
    { name: 'View Usage'},
    { name: 'Ways to conserve'},
    { name: 'Assistance Programms'},
]

const SubMenu = ({selectedSubMenu, updateSubMenu}) => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <ul className="m3">
               {
                   submenus.map(menu => <li className={selectedSubMenu === menu.name ? 'active-menu': ''} onClick={() => updateSubMenu(menu.name)}> <a>{menu.name } </a> </li>)
               }
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    selectedSubMenu : state.stats.selectedSubMenu
})

const mapDispatchToProps = (dispatch) => ({
    updateSubMenu: (newMenu) => dispatch({type: 'UPDATE_SUBMENU', payload: newMenu })
})

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu)