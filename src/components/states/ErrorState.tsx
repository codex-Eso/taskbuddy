import './State.css';
import errorStateImg from '../../assets/themes/notes/error-state.png';

function ErrorState() {
    return (
        <div id='errorState'>
            <img src={errorStateImg} height={200} />
            <h2>Couldn't fetch tasks, please click <span onClick={() => window.location.reload()}>here</span> to refresh</h2>
        </div >
    )
}

export default ErrorState