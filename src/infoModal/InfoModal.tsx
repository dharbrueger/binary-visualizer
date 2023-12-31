import { Modal, Switch, Divider } from "antd";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	setDisplayPlaceValues,
	setSigned,
	selectDisplayPlaceValues,
	selectSigned,
} from "../userSettings/userSettingsSlice";
import styles from "./InfoModal.module.css";

export default NiceModal.create(() => {
	const modal = useModal();
	const dispatch = useAppDispatch();
	const displayPlaceValues = useAppSelector(selectDisplayPlaceValues);
	const displaySigned = useAppSelector(selectSigned);

	const handleDisplayPlaceValuesToggle = (checked: boolean) => {
		dispatch(setDisplayPlaceValues(checked));
	};

	const handleSignedToggle = (checked: boolean) => {
		dispatch(setSigned(checked));
	};

	return (
		<div>
			<Modal
				title="About this project"
				open={modal.visible}
				footer={null}
				onCancel={() => modal.hide()}
				afterClose={() => modal.remove()}
			>
				This project aims to help people explore binary numbers and one cool way
				that we can count the amount of set bits in an 8-bit unsigned integer.
				<Divider />
				<div className={styles.userSettingsContainer}>
					<div className={styles.setting}>
						<span>Display Place Values</span>
						<Switch
							checked={displayPlaceValues}
							onChange={handleDisplayPlaceValuesToggle}
						/>
					</div>

					<div className={styles.setting}>
						<span>Signed</span>
						<Switch checked={displaySigned} onChange={handleSignedToggle} />
					</div>
				</div>
			</Modal>
		</div>
	);
});
