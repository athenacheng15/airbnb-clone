"use client";

import React, { useCallback, useEffect, useState } from "react";

interface ModalsProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body: React.ReactElement;
	footer: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
	secondaryAction?: () => void;
	secondaryLabel?: string;
}

export default ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryLabel,
}: ModalsProps) => {
	const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	const handleClose = useCallback(() => {
		if (disabled) return;

		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handelSubmit = useCallback(() => {
		if (disabled) return;

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;
		secondaryAction();
	}, [disabled, secondaryAction]);

	return <div></div>;
};
