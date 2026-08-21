import { MdDelete, MdEdit } from "react-icons/md"
import ButtonIcons from "../../ButtonIcons.js"
import { ActionProps } from "./actionProps.js"
import { deleteTask, undoTask, updateTask } from "./actions.js"
import { IoIosUndo, IoMdCheckmark } from "react-icons/io"

function InProgress({ taskId, setActivateEle }: ActionProps) {
    return (
        <div id='actionPngs'>
            <div className='png' title='Mark As Incompleted' onClick={() => undoTask(taskId)}>
                <ButtonIcons icon={<IoIosUndo />} action={true} />
            </div>
            <div className='png' title='Delete Task' onClick={() => deleteTask(taskId)}>
                <ButtonIcons icon={<MdDelete />} action={true} />
            </div>
            <div className='png' title='Mark As Completed' onClick={() => updateTask(taskId, "completed")}>
                <ButtonIcons icon={<IoMdCheckmark />} action={true} />
            </div>
            <div className='png' title='Update Task' onClick={() => setActivateEle!('update')}>
                <ButtonIcons icon={<MdEdit />} action={true} />
            </div>
        </div>
    )
}

export default InProgress