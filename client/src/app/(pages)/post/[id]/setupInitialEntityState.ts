import { defaultEditorValue, RelatedEntity } from "@/app/(pages)/post/[id]/usePostForm";

type SetupInitialEntityStateOptions = {
  additionalSetupFn?: (state: object, entity: object) => object,
}
type DefaultState = {
  body: string,
  bodyData?: typeof defaultEditorValue,
  categoryKeys: string[],
  isRichText: boolean,
  postTypeKey: 'forum' | 'question',
  relatedEntities?: RelatedEntity[],
  title: string,
}
const defaultState: DefaultState = {
  body: '',
  bodyData: undefined,
  categoryKeys: ['general'],
  isRichText: true,
  postTypeKey: 'forum',
  relatedEntities: [],
  title: '',
}
function setupInitialEntityState(
  entity: Record<any, any>,
  options: SetupInitialEntityStateOptions = {},
) {
  const { additionalSetupFn } = options

  const initialState = { ...defaultState, ...entity }

  if (additionalSetupFn) {
    return additionalSetupFn(initialState, entity)
  }

  return initialState
}

export default setupInitialEntityState