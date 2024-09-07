import React, {useState} from 'react';
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import {ToggleGroup, ToggleGroupItem} from "@/shared/ui/toggle-group";
import {Bold, Italic, Underline} from "lucide-react";

const Page = () => {
    const topics = ["yuve", "akine", "nuke73", "gl1n"]
    const [selected, setSelected] = useState<string[]>([])
    const onSelect = (value: string) => () => {
        setSelected(prevState => {
            const selected = [...prevState]
            const duplicate = selected.findIndex(v=>v===value)
            if(duplicate){
                selected.splice(duplicate, 1)
            } else {
                selected.push(value)
            }
            return selected
        })
    }
    return (
        <>
            <MaxWidthWrapper className="my-4" role={"navigation"} variant={"section"}>
                <ToggleGroup type="multiple">
                    {topics.map(topic =>
                        <ToggleGroupItem value={topic} aria-label="Toggle bold" key={topic} onClick={onSelect(topic)}>
                            {topic}
                        </ToggleGroupItem>
                    )}
                </ToggleGroup>
            </MaxWidthWrapper>
            <MaxWidthWrapper className="my-4" role={"navigation"} variant={"section"}>
                <ToggleGroup type="multiple">
                    {topics.map(topic =>
                        <ToggleGroupItem value={topic} aria-label="Toggle bold" key={topic} onClick={onSelect(topic)}>
                            {topic}
                        </ToggleGroupItem>
                    )}
                </ToggleGroup>
            </MaxWidthWrapper>

        </>
    );
};

export default Page;