import { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	// flipRightmostInclusiveBits,
	// unsetRightmostInclusiveBits,
	updateBinary,
	selectBinary,
	selectValue,
	resetState,
} from "./setBitsSlice";
import styles from "./SetBits.module.css";
import { AiOutlineReload, AiOutlineInfoCircle } from "react-icons/ai";
import { useModal } from "@ebay/nice-modal-react";
import InfoModal from "../infoModal/InfoModal";
import { motion, useAnimate } from "framer-motion";
import {
	selectDisplayPlaceValues,
	selectSigned,
} from "../userSettings/userSettingsSlice";

export function SetBits() {
	const binary = useAppSelector(selectBinary);
	const value = useAppSelector(selectValue);
	const signed = useAppSelector(selectSigned);

	const displayPlaceValues = useAppSelector(selectDisplayPlaceValues);

	const dispatch = useAppDispatch();

	const infoModal = useModal(InfoModal);

	const [inputContainerScope, inputContainerAnimate] = useAnimate();
	const [reloadIconScope, reloadIconAnimate] = useAnimate();

	const shakeAnimation = {
		x: [0, -10, 10, -10, 10, 0],
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	};

	const spinAnimation = {
		rotate: [0, 360],
		transition: {
			duration: 2,
			ease: "easeInOut",
		},
	};

	const glowAnimation = {
		initial: {
			textShadow: "0 0 10px #ff7733, 0 0 20px #ff7733, 0 0 30px #ff7733",
		},
		glow: {
			textShadow: [
				"0 0 10px #ff7733, 0 0 20px #ff7733, 0 0 30px #ff7733",
				"0 0 20px #ff7733, 0 0 40px #ff7733, 0 0 60px #ff7733",
			],
		},
	};

	const refreshPage = useCallback(() => {
		reloadIconAnimate(reloadIconScope.current, spinAnimation);

		if (binary.split('').every(bit => bit === '0')) {
			inputContainerAnimate(inputContainerScope.current, shakeAnimation);
		}

		dispatch(resetState());
	}, [dispatch, binary]);

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

		dispatch(updateBinary({ binary: updatedBinary, signed }));
	};

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	useEffect(() => {
		dispatch(updateBinary({ binary, signed }));
	}, [signed]);

	return (
		<>
			<div className={styles.gridContainer}>
				<div className={styles.valueContainer}>{value}</div>
				<div>
					<div ref={inputContainerScope} className={styles.bitInputContainer}>
						{binary.split("").map((bit, index) => (
							<div key={index}>
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
								{displayPlaceValues && bit === "1" && (
									<motion.div
										className={`${styles.placeValue}`}
										initial="initial"
										animate="glow"
										variants={glowAnimation}
										transition={{
											duration: 1,
											repeat: Infinity,
											repeatType: "reverse",
											ease: "easeInOut",
										}}
									>
										<span>
											{index === 0 && signed && "-"}
											{Math.pow(2, (binary.length - 1) - index)}
										</span>
									</motion.div>
								)}
								{displayPlaceValues && bit === "0" && (
									<div className={styles.placeValue}>
										{index === 0 && signed && "-"}
										<span>{Math.pow(2, (binary.length - 1) - index)}</span>
									</div>
								)}
							</div>
						))}
					</div>

					<div className={styles.buttonContainer}>
						<div
							ref={reloadIconScope}
							className={styles.icon}
							onClick={refreshPage}
						>
							<AiOutlineReload />
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
