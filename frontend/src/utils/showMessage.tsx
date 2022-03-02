import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toast_options: ToastOptions<{}> = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  toastId: 'alert_id'
};

const showMessage = (
  type: 'warning' | 'error' | 'success',
  message: string,
  option?: ToastOptions<{}>
) => {
  if (Array.isArray(message)) message = message.join('\n');
  switch (type) {
    case 'warning':
      toast.warning(message, { ...toast_options, ...option });
      break;
    case 'error':
      toast.error(message, { ...toast_options, ...option });
      break;
    case 'success':
      toast.success(message, { ...toast_options, ...option });
      break;
    default:
      toast(message, { ...toast_options, ...option });
  }
};

export default showMessage;
