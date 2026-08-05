import { useState } from 'react';
import AddPng from '../assets/icons/add.png';
import SettingsPng from '../assets/icons/settings.png';
import ThemePng from '../assets/icons/theme.png';
import TaskInput from './inputs/TaskInput.js';
import Settings from './inputs/Settings.js';
import Theme from './inputs/Theme.js';

function Buttons() {
    const [activeBtn, setActiveBtn] = useState<"theme" | "settings" | "add" | null>(null);
    const [overlay, setOverlay] = useState<boolean>(false);
    return (
        <>
            <div id='buttons'>
                <div id='leftBtns'>
                    <div className='image' title='Themes'><img src={ThemePng} width={50} /></div>
                    <div className='image' title='Settings'><img src={SettingsPng} width={50} /></div>
                </div>
                <div id='rightBtns'>
                    <div className='image' title='Add Task' onClick={() => { setActiveBtn('add'); setOverlay(true); }}><img src={AddPng} width={50} /></div>
                </div>
            </div>
            {
                overlay &&
                <>
                    {activeBtn === 'add' && <TaskInput setOverlay={setOverlay} setActivateBtn={setActiveBtn} mode="Add" />}
                    {activeBtn === 'settings' && <Settings />}
                    {activeBtn === 'theme' && <Theme />}
                </>
            }
        </>
    )
}

export default Buttons