import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditorState } from "@udecode/plate-common/react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

import { useCreatePostMutation, useRegisterMutation } from "@/shared/api/graphql/generated";
import { editor } from "@/features/PostEditor/consts/editor";
import { graphqlClient } from "@/shared/api/base";
import { userSlice } from "@/entities/User/model/user.slice";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  subtopic: z.string().min(8, {
    message: "Message must be at least 8 characters.",
  }),
})
const SaveWork = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      subtopic: "",
    },
  })
  const { mutate: createPost } = useCreatePostMutation(graphqlClient, {
    onSuccess: (data) => {
      console.log(data)
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, editor.value)
    createPost({
      // ...values,
      body: editor.value as any,
      userId: 423423
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtopic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SaveWork;