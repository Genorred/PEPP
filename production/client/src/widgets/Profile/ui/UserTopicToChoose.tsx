import React from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/shared/ui/label";
import { UserFilterState } from "@/widgets/Profile/model/types";

const UserTopicToChoose = ({ control, name, topic, count }: {
  control: Control<UserFilterState, any>
  name: string;
  topic: string;
  count: number;
}) => {
  return (
    <Controller
      name="topics"
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id={`topic-${topic}`}
            checked={field.value.includes(topic)}
            onCheckedChange={(checked) => {
              if (checked) {
                field.onChange([...field.value, topic]);
              } else {
                field.onChange(field.value.filter((t: string) => t !== topic));
              }
            }}
          />
          <Label htmlFor={`topic-${topic}`}>{topic} ({count})</Label>
        </div>
      )}
    />);
};

export default UserTopicToChoose;