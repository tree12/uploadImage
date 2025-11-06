import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'md' | 'lg' | 'xl'| 'full'| 'xl7';//?จะใส่หรือไม่ก็ได้
}

export default function Modal({
    title,
    isOpen,
    onClose,
    children,
    size = 'md'
}: ModalProps) {
    if (!isOpen) return null;

    const sizeClasses = {
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full:'max-w-full',
        xl7:'max-w-7xl'
    }[size];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
            <div className={`relative z-50 w-full ${sizeClasses} rounded-lg bg-white shadow-lg`}>
                <div className="flex items-center justify-between border-b p-4 borer-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-900 hover:bg-gray-300 hover:text-gray-900">
                        
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </button>
                </div>
                <div className="p-4 text-gray-900">
                    {children}
                </div>
            </div>
        </div>
    );
}