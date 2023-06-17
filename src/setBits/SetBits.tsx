import {
	useEffect,
	useCallback,
	createContext,
	useContext,
	ChangeEvent,
} from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	// flipRightmostInclusiveBits,
	// unsetRightmostInclusiveBits,
	updateBinary,
	updateDecimal,
	selectBinary,
	selectValue,
	resetState,
} from "./setBitsSlice";
import styles from "./SetBits.module.css";
import { AiOutlineReload, AiOutlineInfoCircle } from "react-icons/ai";
import { useModal } from "@ebay/nice-modal-react";
import { Input } from "antd";
import InfoModal from "../infoModal/InfoModal";
import { motion, useAnimate, AnimatePresence } from "framer-motion";
import {
	selectDisplayPlaceValues,
	selectSigned,
} from "../userSettings/userSettingsSlice";

interface AnimationHookData {
	dispatch: any;
	reloadIconScope: any;
	reloadIconAnimate: any;
	decimalValueScope: any;
	decimalValueAnimate: any;
	bitInputScope: any;
	bitInputAnimate: any;
	controlsScope: any;
	controlsAnimate: any;
}

const AnimationHookContext = createContext<AnimationHookData | undefined>(
	undefined
);

export const AnimationHookProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const dispatch = useAppDispatch();
	const [reloadIconScope, reloadIconAnimate] = useAnimate();
	const [decimalValueScope, decimalValueAnimate] = useAnimate();
	const [bitInputScope, bitInputAnimate] = useAnimate();
	const [controlsScope, controlsAnimate] = useAnimate();

	const animate: AnimationHookData = {
		dispatch,
		reloadIconScope,
		reloadIconAnimate,
		decimalValueScope,
		decimalValueAnimate,
		bitInputScope,
		bitInputAnimate,
		controlsScope,
		controlsAnimate,
	};

	return (
		<AnimationHookContext.Provider value={animate}>
			{children}
		</AnimationHookContext.Provider>
	);
};

const DecimalValue = () => {
	const signed = useAppSelector(selectSigned);
	const value = useAppSelector(selectValue);
	const { dispatch, decimalValueScope } = useContext(AnimationHookContext)!;

	const handleDecimalChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;

			if (value === "") {
				dispatch(updateDecimal({ decimal: "", signed }));
				return;
			}

			const regexSigned = /^-?[0-9]*$/;
			const regexUnsigned = /^[0-9]*$/;

			if (signed && value === "-") {
				dispatch(updateDecimal({ decimal: "-", signed }));
				return;
			}

			if (signed && !regexSigned.test(value)) {
				return;
			}

			if (!signed && !regexUnsigned.test(value)) {
				return;
			}

			const decimal = parseInt(value);

			let clampedDecimal;
			if (signed) {
				clampedDecimal = Math.max(-128, Math.min(decimal, 127));
			} else {
				clampedDecimal = Math.max(0, Math.min(decimal, 255));
			}

			dispatch(updateDecimal({ decimal: clampedDecimal.toString(), signed }));
		},
		[dispatch, signed]
	);

	const handleDecimalBlur = useCallback(() => {
		if (value === "" || value === "-") {
			dispatch(updateDecimal({ decimal: "0", signed }));
		}
	}, [dispatch, value, signed]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				ref={decimalValueScope}
				className={styles.valueContainer}
			>
				<Input
					autoFocus
					value={value}
					type="number"
					className={styles.decimalInput}
					onChange={handleDecimalChange}
					onBlur={handleDecimalBlur}
					bordered={false}
				/>
			</motion.div>
		</AnimatePresence>
	);
};

const BitInput = () => {
	const binary = useAppSelector(selectBinary);
	const signed = useAppSelector(selectSigned);
	const displayPlaceValues = useAppSelector(selectDisplayPlaceValues);
	const { dispatch, bitInputScope } = useContext(AnimationHookContext)!;

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	const toggleBit = (index: number) => {
		const charCode = binary.charCodeAt(index);
		const toggledCharCode = charCode ^ 1;

		const updatedBinary =
			binary.substring(0, index) +
			String.fromCharCode(toggledCharCode) +
			binary.substring(index + 1);

		dispatch(updateBinary({ binary: updatedBinary, signed }));
	};

	const MobileBitInput = ({ bit, index }: { bit: string; index: number }) => (
		<div className={styles.bitInput} onTouchStart={() => toggleBit(index)}>
			{bit}
		</div>
	);

	const DesktopBitInput = ({ bit, index }: { bit: string; index: number }) => (
		<div className={styles.bitInput} onMouseDown={() => toggleBit(index)}>
			{bit}
		</div>
	);

	const PlaceValue = ({ bit, index }: { bit: string; index: number }) => {
		return (
			<AnimatePresence>
				{displayPlaceValues && bit === "1" && (
					<motion.div
						className={`${styles.placeValue}`}
						initial="initial"
						animate="glow"
						variants={orangeGlowAnimation}
						transition={{
							duration: 1,
							repeat: Infinity,
							repeatType: "reverse",
							ease: "easeInOut",
						}}
					>
						<span>
							{index === 0 && signed && "-"}
							{Math.pow(2, binary.length - 1 - index)}
						</span>
					</motion.div>
				)}
				{displayPlaceValues && bit === "0" && (
					<div className={styles.placeValue}>
						{index === 0 && signed && "-"}
						<span>{Math.pow(2, binary.length - 1 - index)}</span>
					</div>
				)}
			</AnimatePresence>
		);
	};

	//this doesn't necessarily belong here
	useEffect(() => {
		dispatch(updateBinary({ binary, signed }));
	}, [signed]);

	const orangeGlowAnimation = {
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

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				ref={bitInputScope}
				className={styles.bitInputContainer}
			>
				{binary.split("").map((bit, index) => (
					<div key={index}>
						{isMobile ? (
							<MobileBitInput bit={bit} index={index} />
						) : (
							<DesktopBitInput bit={bit} index={index} />
						)}
						<PlaceValue bit={bit} index={index} />
					</div>
				))}
			</motion.div>
		</AnimatePresence>
	);
};

const Controls = () => {
	const binary = useAppSelector(selectBinary);

	const {
		dispatch,
		controlsScope,
		bitInputScope,
		bitInputAnimate,
		reloadIconScope,
		reloadIconAnimate,
	} = useContext(AnimationHookContext)!;

	const infoModal = useModal(InfoModal);

	const handleInfoClick = () => {
		infoModal.show();
	};

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

	const refreshPage = useCallback(() => {
		reloadIconAnimate(reloadIconScope.current, spinAnimation);

		if (binary.split("").every((bit) => bit === "0")) {
			bitInputAnimate(bitInputScope.current, shakeAnimation);
		}

		dispatch(resetState());
	}, [dispatch, binary]);

	return (
		<div ref={controlsScope} className={styles.controlsContainer}>
			<div ref={reloadIconScope} className={styles.icon} onClick={refreshPage}>
				<AiOutlineReload />
			</div>
			<div className={styles.icon} onClick={handleInfoClick}>
				<AiOutlineInfoCircle />
			</div>
		</div>
	);
};

export function SetBits() {
	return (
		<AnimationHookProvider>
			<div className={styles.gridContainer}>
				<DecimalValue />
				<BitInput />
				<Controls />
			</div>
		</AnimationHookProvider>
	);
}
