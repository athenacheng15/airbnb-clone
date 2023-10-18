import { create } from 'zustand';

interface RegisterModalStoreType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStoreType>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
