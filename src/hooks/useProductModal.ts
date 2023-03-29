import { useEffect, useState } from 'react';
import { LoadingStatus } from '../types/enums/LoadingStatus';

export const useProductModal = (status: LoadingStatus) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === LoadingStatus.SUCCEEDED) {
      setShowModal(false);
    }
  }, [status]);

  return [showModal, setShowModal] as [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};
