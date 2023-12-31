'use client'

import React, {useEffect, useState} from 'react';
import AuthModal from "@/app/components/AuthModal";
import UploadModal from "@/app/components/UploadModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <AuthModal/>
            <UploadModal/>
        </>
    );
};

export default ModalProvider;