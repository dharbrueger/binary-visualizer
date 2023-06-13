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
import { AiOutlineReload } from "react-icons/ai";

export function SetBits() {
	const binary = useAppSelector(selectBinary);
	const value = useAppSelector(selectValue);

	const dispatch = useAppDispatch();

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
				<div className={styles.refreshIcon} onClick={refreshPage}>
					<AiOutlineReload className={isSpinning ? styles.iconSpin : ''}/>
				</div>
			</div>
			<div className={styles.displayContainer}>
				<p>Binary: {binary}</p>
				<p>Decimal: {value}</p>
			</div>
		</>
	);
}

