import React, { useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/shared/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import useSavePost from "@/features/Editor/lib/useSavePost";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { buttonNames } from "@/features/Editor/consts/buttonNames";
import TagsInput from "@/shared/ui/TagsInput";
import { useSelector } from "react-redux";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";
import { useFetchPostQuery } from "@/features/Editor/lib/useFetchPostQuery";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters."
  }),
  topics: z.array(z.string().min(2, {
    message: "Topic must be at least 2 characters."
  })).max(5, {
    message: 'No more than 5 topics.'
  }),
  subTopics: z.array(z.string().min(2, {
    message: "Topic must be at least 2 characters."
  })).max(5, {
    message: 'No more than 5 subTopics.'
  })
});
export type HandleWorkFormT = z.infer<typeof formSchema>
const SaveWork = () => {
  const form = useForm<HandleWorkFormT>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      topics: [],
      subTopics: []
    }
  });
  const onSubmit = useSavePost();
  const data = useSelector(focusedPostSlice.selectors.all);
  const initialData = useFetchPostQuery(data.initialDataQueryKey);
  useEffect(() => {
    if(initialData) {
      form.setValue('title', initialData.title)
      form.setValue('topics', initialData.topics?.map(topic => topic.title) ?? [])
      form.setValue('subTopics', initialData.subTopics?.map(topic => topic.title) ?? [])
    }
  }, []);
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
                <TagsInput name="topics" control={form.control} placeholder="Enter tags..." />
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
                <TagsInput name="subTopics" control={form.control} placeholder="Enter tags..." />
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