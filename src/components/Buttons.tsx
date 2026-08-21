import { useState } from 'react';
import TaskInput from './inputs/TaskInput.js';
import Settings from './inputs/Settings.js';
import Theme from './inputs/Theme.js';
import ButtonIcons from './ButtonIcons.js';
import { IoMdAddCircleOutline, IoMdColorPalette, IoMdSettings } from 'react-icons/io';

function Buttons() {
    const [activeBtn, setActiveBtn] = useState<"theme" | "settings" | "add" | null>(null);
    const [overlay, setOverlay] = useState<boolean>(false);
    return (
        <>
            <div id='buttons'>
                <div id='leftBtns'>
                    <div className='image' title='Themes'><ButtonIcons icon={<IoMdColorPalette />} action={false} /></div>
                    <div className='image' title='Settings'><ButtonIcons icon={<IoMdSettings />} action={false} /></div>
                </div>
                <div id='rightBtns'>
                    <div className='image' title='Add Task' onClick={() => { setActiveBtn('add'); setOverlay(true); }}><ButtonIcons icon={<IoMdAddCircleOutline />} action={false} /></div>
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