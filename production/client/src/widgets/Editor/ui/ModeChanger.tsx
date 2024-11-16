import React, { useState } from "react";
import { Pen, PenOff } from "lucide-react";
import dynamic from "next/dynamic";
import { useCreatePostMutation, usePostQuery, useUpdatePostMutation } from "@/shared/api/graphql/generated";
import { graphqlClient } from "@/shared/api/base";
import { z } from "zod";
import { useEditorRef } from "@udecode/plate-common/react";
import { HandleWorkFormT } from "./SaveWork";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { getChangedFields } from "@/shared/utils/getChangedFields";
import useCreatePostSubmit from "@/widgets/Editor/lib/useCreatePostSubmit";

const SaveWork = dynamic(() => import("./SaveWork"));

const ModeChanger = ({ id, isDraft, post }: {
  id?: number
  isDraft?: boolean
  post?: PostQuery["post"]

}) => {
  const [isReadonly, setIsReadonly] = useState(false);
  const ModeChangerIcon = isReadonly ? PenOff : Pen;
  return (
    <>
      <div className="absolute top-4 right-4" onClick={() => {
        setIsReadonly(prev => !prev);
      }}>
        <ModeChangerIcon />
      </div>
      <section
        className={`flex-col overflow-hidden transition-all ${isReadonly ? "basis-0 p-0" : "basis-auto flex-1 shrink-0 p-8"}`}>
        <h4 className={"text-nowrap"}>You should save your work</h4>
        <SaveWork id={id} />
      </section>
    </>
  );
};

export default ModeChanger;