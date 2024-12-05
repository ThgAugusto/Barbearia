import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useSetModalInUrl = (modalName: string) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const setModalInUrl = (isOpen: boolean) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (isOpen) {
            newSearchParams.set(`modalOpen${modalName}`, "true"); // Corrigido o nome do parâmetro
        } else {
            newSearchParams.delete(`modalOpen${modalName}`);
        }
        setSearchParams(newSearchParams, { replace: true });
    };

    useEffect(() => {
        const modalOpen = searchParams.get(`modalOpen${modalName}`);
        if (modalOpen === "true") {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false); 
        }
    }, [searchParams, modalName]);

    const openModal = () => {
        setModalInUrl(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalInUrl(false);
        setIsModalOpen(false);
    };

    return { isModalOpen, openModal, closeModal, searchParams, setModalInUrl, setSearchParams };
};
