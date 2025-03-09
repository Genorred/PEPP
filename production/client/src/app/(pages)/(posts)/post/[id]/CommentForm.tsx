import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import Link from "next/link";

const CommentForm = ({ isReplyingState, onCreate, placeholder = "comment" }: {
  isReplyingState?: [boolean, Dispatch<SetStateAction<boolean>>];
  onCreate: (message: string, onError?: () => void) => void;
  placeholder?: string
}) => {
  const [isWriting, setIsWriting] = isReplyingState ?? useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [sentReplyMessage, setSentReplyMessage] = useState("");
  const user = useSelector(userSlice.selectors.user);
  useEffect(() => {
    if (!user)
      setIsWriting(false);
  }, [user]);


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (replyMessage.length > 0) {
      setSentReplyMessage(replyMessage);
      onCreate(replyMessage.trim(), () => {
        setReplyMessage(sentReplyMessage)
      });
      setReplyMessage('')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMessage(e.target.value);
  };

  return (
    <>
      <form className="mt-4" onSubmit={onSubmit}>
        <Textarea
          disabled={!user}
          onFocus={() => setIsWriting(true)}
          onChange={onChange}
          value={replyMessage}
          placeholder={`Write your ${placeholder}...`}
          className="min-h-[100px] mb-2"
        />
        {isWriting && (
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" type={"button"} size="sm" onClick={() => setIsWriting(false)}>
              Cancel
            </Button>
            <Button size="sm" disabled={replyMessage.length < 0}>
              Submit Message
            </Button>
          </div>
        )}
        {!user ?
          <Link href={"/sign-in"}>Authorize</Link>
          : null
        }
      </form>

    </>
  );
};

export default CommentForm;