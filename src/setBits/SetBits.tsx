import React, { useState, useCallback } from "react";
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
import {
	AiOutlineReload,
	AiOutlineInfoCircle
} from "react-icons/ai";
import { useModal } from "@ebay/nice-modal-react";
import InfoModal from "./InfoModal";
import { useAnimate } from "framer-motion";

export function SetBits() {
	const binary = useAppSelector(selectBinary);
	const value = useAppSelector(selectValue);

	const dispatch = useAppDispatch();

	const infoModal = useModal(InfoModal);

	const [scope, animate] = useAnimate();

	const [isSpinning, setIsSpinning] = useState(false);

	const shakeAnimation = {
		x: [0, -10, 10, -10, 10, 0],
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	};

	const refreshPage = useCallback(() => {
		if (!isSpinning) {
			setIsSpinning(true);

			if (binary === "00000000") {
				animate("div", shakeAnimation);
			}

			dispatch(resetState());
			// Simulating a delay before resetting the spinning state
			setTimeout(() => {
				setIsSpinning(false);
			}, 300);
		}
	}, [dispatch, isSpinning, binary]);

	const handleInfoClick = () => {
		infoModal.show();
	};

	const toggleBit = (index: number) => {
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
			<div className={styles.gridContainer}>
				<div ref={scope} className={styles.valueContainer}>
					{value}
				</div>
				<div>
					<div ref={scope} className={styles.bitInputContainer}>
						{binary.split("").map((bit, index) => (
							<div ref={scope} key={index}>
								<div
									className={styles.bitInput}
									onMouseDown={() => toggleBit(index)}
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
				</div>
			</div>
		</>
	);
}

