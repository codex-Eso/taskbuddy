import { ReactElement } from "react"
import { IconContext } from "react-icons"

interface ButtonIconsProps {
    icon: ReactElement
    action: boolean
}

function ButtonIcons({ icon, action }: ButtonIconsProps) {
    return (
        <>
            <IconContext.Provider value={{ color: action ? "#E3E3E3" : 'black', size: action ? "50" : '60' }}>
                {icon}
            </IconContext.Provider>
        </>
    )
}

export default ButtonIcons