import { MdDelete } from "react-icons/md"
import ButtonIcons from "../../ButtonIcons.js"
import { ActionProps } from "./actionProps.js"
import { deleteTask, undoTask } from "./actions.js"
import { IoIosUndo } from "react-icons/io"

function Completed({ taskId }: ActionProps) {
    return (
        <div id='actionPngs'>
            <div className='png' title='Mark As Incompleted' onClick={() => undoTask(taskId)}>
                <ButtonIcons icon={<IoIosUndo />} action={true} />
            </div>
            <div className='png' title='Delete Task' onClick={() => deleteTask(taskId)}>
                <ButtonIcons icon={<MdDelete />} action={true} />
            </div>
        </div>
    )
}

export default Completed