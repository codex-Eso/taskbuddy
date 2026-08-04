import './State.css';
import emptyStateImg from '../../assets/themes/notes/empty-state.png';

function EmptyState() {
    return (
        <div id='emptyState'>
            <img src={emptyStateImg} height={200} />
            <h2>No Tasks!</h2>
        </div>
    )
}

export default EmptyState