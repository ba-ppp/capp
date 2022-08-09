/** @jsxImportSource @emotion/react */
import { toggleShowUploadModal } from "app/slices/toggleSlice";
import { ModalOptions } from "components/enums/enums";
import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { UppyUploader } from "./UppyUploader";

type Props = {};
interface IPromiseParams {
  resolve: (option: ModalOptions) => void;
  reject: (err: any) => void;
}
export const UppyUploadModal = forwardRef(
  (props: Props, ref: React.Ref<unknown>): ReactElement => {
    useImperativeHandle(ref, () => ({ show }));

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const promiseInfo = useRef<IPromiseParams>({
      resolve: () => {},
      reject: () => {},
    });

    const show = async (): Promise<unknown> => {
      return new Promise((resolve, reject) => {
        promiseInfo.current = {
          resolve,
          reject,
        };

        setIsOpen(true);
      });
    };

    const hideModal = () => {
      setIsOpen(false);
      dispatch(toggleShowUploadModal(false))
    };

    const handleCancel = () => {
      hideModal();
      
      promiseInfo.current?.resolve(ModalOptions.CANCEL);
    };

    return (
      <>
        <div
          className={`bg-white px-6 py-4 rounded-lg z-20 ${
            isOpen
              ? "h-[60vh] w-[50rem] absolute top-[20vh] "
              : "hidden invisible"
          }`}
          css={[isOpen ? "left: calc(50% - 25rem);" : ""]}
        >
          <div className={`w-full`}>
            <div className="flex justify-between">
              <div>
                <h1 className="font-medium text-3xl">
                  Upload image files
                </h1>
                <div className="py-4 text-lg">
                  Once uploaded, you'll have full control over your library of
                  content.
                </div>
              </div>
              <span onClick={handleCancel} className="text-3xl cursor-pointer">
                &times;
              </span>
            </div>
            <div>
              <hr />

              <UppyUploader />

              <hr />
            </div>
          </div>
        </div>
      </>
    );
  }
);
