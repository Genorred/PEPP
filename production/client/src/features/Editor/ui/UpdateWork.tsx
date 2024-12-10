import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditorRef } from "@udecode/plate-common/react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

import { useUpdatePostMutation } from "@/shared/api/graphql/generated";
import { apiClient } from "@/shared/api/base";
import { userSlice } from "@/entities/User/model/user.slice";
import { useSelector } from "react-redux";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters."
  }),
  subtopic: z.string().min(8, {
    message: "Message must be at least 8 characters."
  })
});
const UpdateWork = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      subtopic: ""
    }
  });
  const { mutate: createPost } = useUpdatePostMutation(apiClient, {
    onSuccess: (data) => {
      console.log(data);
    }
  });
  const user = useSelector(userSlice.selectors.user);
  const plateState = useEditorRef();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, plateState.children);
    createPost({
      // ...values,
      id,
      title: ""
    });
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