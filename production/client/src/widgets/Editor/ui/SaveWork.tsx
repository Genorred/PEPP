import React from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import useCreatePostSubmit from "@/widgets/Editor/lib/useCreatePostSubmit";
import useUpdatePostSubmit from "@/widgets/Editor/lib/useUpdatePostSubmit";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { buttonNames } from "@/widgets/Editor/consts";
import TagsInput from "@/shared/ui/TagsInput";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters."
  }),
  topics: z.array(z.string().min(2, {
    message: "Topic must be at least 2 characters."
  })),
  subTopics: z.array(z.string().min(8, {
    message: "Message must be at least 8 characters."
  }))
});
export type HandleWorkFormT = z.infer<typeof formSchema>
const SaveWork = ({ id, versionPost }: {
  id?: number
  versionPost?: PostQuery["post"]
}) => {
  const form = useForm<HandleWorkFormT>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      topics: [],
      subTopics: []
    }
  });
  const onSubmit = useCreatePostSubmit({referenceId: id, versionPost});
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter the title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagsInput name="tags" control={form.control} placeholder="Enter tags..." />
              </FormControl>
              <FormDescription>Enter tags and press Enter to add them.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subTopics"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagsInput name="tags" control={form.control} placeholder="Enter tags..." />
              </FormControl>
              <FormDescription>Enter tags and press Enter to add them.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" name={buttonNames.save}>Save</Button>
        <Button type="submit" name={buttonNames.publish}>Publish</Button>
      </form>
    </Form>
  );
};

export default SaveWork;