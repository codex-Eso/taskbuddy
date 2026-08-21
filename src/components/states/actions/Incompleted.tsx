import { RiProgress5Line } from "react-icons/ri";
import ButtonIcons from "../../ButtonIcons.js";
import { ActionProps } from "./actionProps.js";
import { deleteTask, updateTask } from "./actions.js";
import { MdDelete, MdEdit } from "react-icons/md";

function Incompleted({ taskId, setActivateEle }: ActionProps) {
    return (
        <div id='actionPngs'>
            <div className='png' title='Delete Task' onClick={() => deleteTask(taskId)}>
                <ButtonIcons icon={<MdDelete />} action={true} />
            </div>
            <div className='png' title='Mark As In Progress' onClick={() => updateTask(taskId, "in_progress")}>
                <ButtonIcons icon={<RiProgress5Line />} action={true} />
            </div>
            <div className='png' title='Update Task' onClick={() => setActivateEle!('update')}>
                <ButtonIcons icon={<MdEdit />} action={true} />
            </div>
        </div>
    )
}

export default Incompleted