import React from "react";
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

export function SetBits() {
	const binary = useAppSelector(selectBinary);
	const value = useAppSelector(selectValue);

	const dispatch = useAppDispatch();

	const refreshPage = () => {
		dispatch(resetState());
	};

	const toggleBit = (index: number, e: React.MouseEvent) => {
		dispatch(updateBinary(
			binary.slice(0, index) + (binary[index] === "0" ? "1" : "0") + binary.slice(index + 1)
		));
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
			<div className={styles.displayContainer}>
				<p>Binary: {binary}</p>
				<p>Decimal: {value}</p>
			</div>
			<button className={styles.refreshButton} onClick={refreshPage}>Reset</button>
		</>
	);
}
