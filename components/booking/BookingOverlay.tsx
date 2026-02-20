"use client";

import { useEffect, useState } from "react";
import BookingPanel from "./BookingPanel";
import BookingConfirmation from "./BookingConfirmation";
import { Service, Worker } from "../../types";
import { useBookingStore } from "../../store/useBookingStore";

// We can use the store directly if we wrap this component or use it in page.
// Since CityMap is dynamic and isolated, using window event is a quick shortcut,
// but using the store properly is better if we can forward the event.
// However, CityMap is inside MainLayout.

export default function BookingOverlay() {
    const { isOpen, selectedService, selectedWorker, closeBooking, openBooking } = useBookingStore();
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const handleOpen = (e: CustomEvent) => {
            const { service, worker } = e.detail;
            openBooking(service, worker);
        };

        window.addEventListener('open-booking', handleOpen as any);
        return () => window.removeEventListener('open-booking', handleOpen as any);
    }, [openBooking]);

    const handleConfirm = () => {
        setShowConfirmation(true);
        // Hide after some time or wait for user input?
        // The Confirmation component has a button to close.
    };

    const handleClose = () => {
        setShowConfirmation(false);
        closeBooking();
    };

    if (showConfirmation) {
        return <BookingConfirmation onComplete={handleClose} />;
    }

    if (!isOpen || !selectedService) return null;

    return (
        <BookingPanel
            service={selectedService}
            worker={selectedWorker || undefined}
            onClose={closeBooking}
            onConfirm={handleConfirm}
        />
    );
}
