import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	flipRightmostInclusiveBits,
	unsetRightmostInclusiveBits,
	updateBinary,
	selectBinary,
	selectValue,
	resetState,
} from "./setBitsSlice";
import styles from "./SetBits.module.css";
import { AiOutlineReload, AiOutlineInfoCircle } from "react-icons/ai";
import { useModal } from "@ebay/nice-modal-react";
import InfoModal from "./InfoModal";

export function SetBits() {
	const binary = useAppSelector(selectBinary);
	const value = useAppSelector(selectValue);

	const dispatch = useAppDispatch();

	const infoModal = useModal(InfoModal);

	const [isSpinning, setIsSpinning] = useState(false);

	const refreshPage = () => {
		if (!isSpinning) {
			setIsSpinning(true);
			dispatch(resetState());

			// Simulating a delay before resetting the spinning state
			setTimeout(() => {
				setIsSpinning(false);
			}, 300);
		}
	};

	const handleInfoClick = () => {
		infoModal.show();
	};

	const toggleBit = (index: number, e: React.MouseEvent) => {
		dispatch(
			updateBinary(
				binary.slice(0, index) +
					(binary[index] === "0" ? "1" : "0") +
					binary.slice(index + 1)
			)
		);
	};

	return (
		<>
			<div className={styles.inputContainer}>
				{binary.split("").map((bit, index) => (
					<div key={index} className={styles.bitContainer}>
						<div
							className={styles.bitInput}
							data-bit={bit}
							onClick={(e: React.MouseEvent) => toggleBit(index, e)}
						>
							{bit}
						</div>
					</div>
				))}
			</div>
			<div className={styles.buttonContainer}>
				<div className={styles.icon} onClick={refreshPage}>
					<AiOutlineReload className={isSpinning ? styles.iconSpin : ""} />
				</div>
				<div className={styles.icon} onClick={handleInfoClick}>
					<AiOutlineInfoCircle />
				</div>
			</div>
			<div className={styles.displayContainer}>
				<p>Binary: {binary}</p>
				<p>Decimal: {value}</p>
			</div>
		</>
	);
}
