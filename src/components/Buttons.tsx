import { useState } from 'react';
import AddPng from '../assets/icons/add.png';
import SettingsPng from '../assets/icons/settings.png';
import ThemePng from '../assets/icons/theme.png';
import TaskInput from './inputs/TaskInput';
import Settings from './inputs/Settings';
import Theme from './inputs/Theme';

function Buttons() {
    const [active, setActive] = useState<"theme" | "settings" | "add" | false>(false);
    return (
        <>
            <div id='buttons'>
                <div id='leftBtns'>
                    <div className='image' title='Themes'><img src={ThemePng} width={50} /></div>
                    <div className='image' title='Settings'><img src={SettingsPng} width={50} /></div>
                </div>
                <div id='rightBtns'>
                    <div className='image' title='Add Task' onClick={() => setActive('add')}><img src={AddPng} width={50} /></div>
                </div>
            </div>
            {active === 'add' && <TaskInput setActive={setActive} mode="Add" />}
            {active === 'settings' && <Settings />}
            {active === 'theme' && <Theme />}
        </>
    )
}

export default Buttons