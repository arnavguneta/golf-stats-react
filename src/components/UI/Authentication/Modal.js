import styles from './Authentication.module.css'

const Modal = props => {
    return (
        <div className={`${styles.modalContainer}`}>
            {props.children}
        </div>
    )
}

export default Modal