// component swal alert
import Swal from "sweetalert2";

const SweetAlert = (props) => {

    const {
        title,
        text,
        icon,
        confirmButtonText,
        showCancelButton,
        cancelButtonText,
        showConfirmButton,
        showCloseButton,
        onConfirm,
        onCancel,
        onClose,
        ...rest
    } = props;
    
  return (
   <>
    <Swal
        title={title}
        text={text && text}
        icon={icon}
        showCancelButton
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        confirmButtonColor="#3085d6"
        cancelButtonColor="#d33"
        showLoaderOnConfirm={true}
        onConfirm={() => {
            props.onConfirm();
        }
        }
        onCancel={() => {
            props.onCancel();
        }
        }
    />

   
   </>
  )
}

export default SweetAlert