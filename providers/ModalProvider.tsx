'use client'

import React, {useEffect, useState} from 'react';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <div>
            Modals!
        </div>
    );
};

export default ModalProvider;