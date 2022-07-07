import styles from './Authentication.module.css'

const ModalContent = props => {
    return (
        <div className={`${styles.root}`}>
            {props.children}
        </div>
    )
}

export default ModalContent