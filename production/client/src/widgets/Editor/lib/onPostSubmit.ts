import { HandleWorkFormT } from "@/widgets/Editor/ui/SaveWork";
import { BaseSyntheticEvent } from "react";
import { buttonNames } from "@/widgets/Editor/consts";

type submitFun = (args: HandleWorkFormT) => void
export default (onSave: (isPublished: boolean) => submitFun, onUpdate: submitFun) => {
  return function onSubmit(values: HandleWorkFormT, event?: BaseSyntheticEvent<object, any, any>) {
    if (event)
      // @ts-ignore
      const name = event.nativeEvent!.submitter.name; // Кнопка, вызвавшая сабмит
    console.log("Кнопка вызвавшая сабмит:", name);
    if (name === buttonNames.save) {
      onUpdate(values)
      onSave(false)(values);
    } else {
      onSave(true)(values);
    }
  };

}
