import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

function ShareModal({ onClose, title, description }) {
  const currentUrl = window.location.href;
  const [copied, setCopied] = useState(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-[20px] shadow-xl p-6 w-full max-w-[648px] h-[369px] font-sans relative flex flex-col mx-[19px]">
        <div className="flex items-center justify-center relative mb-6">
          <h2 className="text-[24px] max-[743px]:text-[18px] font-extrabold text-center flex-1">
            공유하기
          </h2>
          <div className="hidden min-[744px]:block absolute right-0  mt-4 text-[#578246] hover:text-green-700 ">
            <button onClick={onClose} isCancel>
              나가기
            </button>
          </div>
        </div>

        <div className="mt-14 flex justify-center gap-6">
          <EmailShareButton url={currentUrl} subject={title} body={description}>
            <EmailIcon size={72} round={true} />
          </EmailShareButton>
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon size={72} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton url={currentUrl}>
            <LinkedinIcon size={72} round={true} />
          </LinkedinShareButton>
          <LineShareButton url={currentUrl}>
            <LineIcon size={72} round={true} />
          </LineShareButton>
        </div>

        <div className="flex justify-center text-14pt mt-14 gap-6">
          <CopyToClipboard text={currentUrl} onCopy={() => setCopied(true)}>
          {
            copied? (
              <div  className="flex justify-center w-60 border p-2 rounded-3xl">
                 복사 완료되었습니다! ✅
              </div>
            ):(
              <div className="flex justify-center w-60 border p-2 rounded-3xl cursor-pointer hover:bg-stone-100">
            공유 링크 복사하기 🔗
          </div>
            )
          }
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
