import { userInfoAtom } from "@/store/authAtoms";
import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/store/chatAtoms";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import moment from "moment";
import { apiClient } from "@/lib/api-client";
import { GET_MESSAGES_ROUTE, SERVER } from "@/utils/constants";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

const bubbleMaxW =
  "max-w-[85%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%]";

const MessageContainer = () => {
  const selectedChatType = useRecoilValue(selectedChatTypeAtom);
  const selectedChatData = useRecoilValue(selectedChatDataAtom);
  const setChatMessages = useSetRecoilState(selectedChatMessagesAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const selectedChatMessages = useRecoilValue(selectedChatMessagesAtom);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  useEffect(() => {
    async function getMessages() {
      try {
        const res = await apiClient.post(
          GET_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (res.data.messages) setChatMessages(res.data.messages);
      } catch (e) {
        console.log(e);
      }
    }
    if (selectedChatData._id && selectedChatType === "contact") {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setChatMessages]);

  function isImage(filePath?: string): boolean {
    if (!filePath) return false;
    const imgRegex =
      /\.(jpg|jpeg|png|gif|bmp|tif|svg|ico|heif|webp)$/i;
    return imgRegex.test(filePath);
  }

  async function downloadFile(filePath: string) {
    const res = await apiClient.get(`${SERVER}/${filePath}`, {
      responseType: "blob",
    });
    const fileBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = fileBlob;
    link.setAttribute("download", filePath.split("/").pop() || "file");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(fileBlob);
  }

  const bubbleColors = (own: boolean) =>
    own
      ? "bg-[#474a5e] text-white border-[#9df6f6]"
      : "bg-[#0b65c6]/20 text-[#a4c5ce] border-[#43889b]";

  function directMessageDisplay(message: any) {
    const isOwn = message.sender !== selectedChatData._id;

    return (
      <div className={`${!isOwn ? "text-left" : "text-right"}`}>
        {/* TEXT */}
        {message.messageType === "text" && (
          <div
            className={`border inline-block p-4 rounded my-1 ${bubbleMaxW} break-words whitespace-pre-wrap ${bubbleColors(
              isOwn
            )}`}
          >
            {message.content}
          </div>
        )}

        {/* FILE */}
        {message.messageType === "file" && (
          <div
            className={`border inline-block rounded my-1 ${bubbleMaxW} overflow-hidden ${bubbleColors(
              isOwn
            )}`}
          >
            {isImage(message.fileUrl) ? (
              <div className="p-0">
                <img
                  src={`${SERVER}/${message.fileUrl}`}
                  alt="attachment"
                  className="block max-w-full h-auto object-contain rounded-md"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-2xl p-2 rounded-md bg-black/20">
                    <MdFolderZip />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm break-words break-all line-clamp-2">
                      {message.fileUrl.split("/").pop()}
                    </div>
                    <button
                      className="mt-2 inline-flex items-center gap-2 text-xs bg-black/20 hover:bg-black/40 px-3 py-1 rounded transition"
                      onClick={() => downloadFile(message.fileUrl)}
                      aria-label="Download file"
                    >
                      <IoMdArrowRoundDown />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-1">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  }

  function groupMessageDisplay(message: any) {
    const isOwn = message.sender._id === userInfo?.id;

    return (
      <div
        className={`mt-5 flex flex-col ${
          isOwn ? "items-end" : "items-start"
        }`}
      >
        {/* TEXT */}
        {message.messageType === "text" && (
          <div
            className={`border inline-block p-4 rounded my-1 ${bubbleMaxW} break-words whitespace-pre-wrap ${bubbleColors(
              isOwn
            )}`}
          >
            {message.content}
          </div>
        )}

        {/* FILE */}
        {message.messageType === "file" && (
          <div
            className={`border inline-block rounded my-1 ${bubbleMaxW} overflow-hidden ${bubbleColors(
              isOwn
            )}`}
          >
            {isImage(message.fileUrl) ? (
              <div className="p-0">
                <img
                  src={`${SERVER}/${message.fileUrl}`}
                  alt="attachment"
                  className="block max-w-full h-auto object-contain rounded-md"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="p-3">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-2xl p-2 rounded-md bg-black/20">
                    <MdFolderZip />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm break-words break-all line-clamp-2">
                      {message.fileUrl.split("/").pop()}
                    </div>
                    <button
                      className="mt-2 inline-flex items-center gap-2 text-xs bg-black/20 hover:bg-black/40 px-3 py-1 rounded transition"
                      onClick={() => downloadFile(message.fileUrl)}
                      aria-label="Download file"
                    >
                      <IoMdArrowRoundDown />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* META row UNDER bubble */}
        <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
          {!isOwn && (
            <>
              <Avatar className="h-6 w-6 rounded-full overflow-hidden">
                {message.sender.image ? (
                  <AvatarImage
                    className="object-cover w-full h-full"
                    src={`${SERVER}/${message.sender.image}`}
                    alt="profile"
                  />
                ) : null}
                <AvatarFallback
                  className={`uppercase h-6 w-6 text-sm flex items-center justify-center rounded-full ${getColor(
                    message.sender.color
                  )}`}
                >
                  {message.sender.firstName
                    ? message.sender.firstName.charAt(0)
                    : message.sender.email.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-white/60">
                {`${message.sender.firstName} ${message.sender.lastName}`}
              </span>
            </>
          )}
          <span>{moment(message.timestamp).format("LT")}</span>
        </div>
      </div>
    );
  }

  function chatMessagesDisplay() {
    let lastDate: string | null = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-600 my-1">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && directMessageDisplay(message)}
          {selectedChatType === "channel" && groupMessageDisplay(message)}
        </div>
      );
    });
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full overflow-hidden scrollbar-hidden">
      {chatMessagesDisplay()}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageContainer;
