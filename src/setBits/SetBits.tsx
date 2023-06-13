import { useState, useCallback } from "react";
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
import InfoModal from "../infoModal/InfoModal";
import { useAnimate } from "framer-motion";
import { selectDisplayPlaceValues } from "../userSettings/userSettingsSlice";

export function SetBits() {
	const binary = useAppSelector(selectBinary);
	const value = useAppSelector(selectValue);
	const displayPlaceValues = useAppSelector(selectDisplayPlaceValues);

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
		const charCode = binary.charCodeAt(index);
		const toggledCharCode = charCode ^ 1;

		const updatedBinary =
			binary.substring(0, index) +
			String.fromCharCode(toggledCharCode) +
			binary.substring(index + 1);

		dispatch(updateBinary(updatedBinary));
	};

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
								{isMobile ? (
									<div
										className={styles.bitInput}
										onTouchStart={() => toggleBit(index)}
									>
										{bit}
									</div>
								) : (
									<div
										className={styles.bitInput}
										onMouseDown={() => toggleBit(index)}
									>
										{bit}
									</div>
								)}
								{displayPlaceValues && (
									<div className={styles.placeValue}>
										{Math.pow(2, 7 - index)}
									</div>
								)}
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
