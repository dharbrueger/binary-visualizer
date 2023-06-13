import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

export default NiceModal.create(() => {
  const modal = useModal();
  return (
    <div>
      <Modal
        title="About this project"
        open={modal.visible}
        footer={null}
        onCancel={() => modal.hide()}
        afterClose={() => modal.remove()}
      >
        This project aims to help people explore binary numbers and one cool way that we can count the amount of set bits in an 8-bit unsigned integer.
      </Modal>
    </div>
  );
});
