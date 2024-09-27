import Image from "next/image";
import { imageFileExtensions } from "@/shared/utils/asset";

type AttachmentEmbedProps = {
  children: React.ReactNode,
}

const AttachmentEmbed = (props: AttachmentEmbedProps) => {
  const { attributes, children, element } = props

  // const attachmentQuery = trpc.attachments.getAttachmentById.useQuery(
  //   { id: element.attachmentId },
  //   { enabled: !!element.attachmentId },
  // )
  //
  // const { data: attachment } = attachmentQuery
  //
  // const isImage = imageFileExtensions.includes(attachment?.fileExtension || '')

  // const { imageUrl } = useImageUrl({
  //   enabled: !!attachment?.id && isImage,
  //   path: attachment?.fileKey,
  //   transformation: [{
  //     focus: 'auto',
  //     height: attachment?.height,
  //     width: attachment?.width,
  //   }],
  // })
  //
  // if (!element.attachmentId) return null

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        {/*{isImage && (*/}
          <Image
            // alt={attachment?.title}
            alt='xd'
            objectFit="cover"
            // src={imageUrl}
            src={''}
          />
        {/*)}*/}
      </div>
      {children}
    </div>
  )
}

export default AttachmentEmbed
