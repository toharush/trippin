import { useRef } from "react";

interface ImageProps {
  src: string;
  alt: string;
  editable: boolean;
  onChange: () => void;
}
const Image = (props: ImageProps) => {
  const ref = useRef();
  const { src, alt, editable, onChange } = props;
  const onImageClick = () => {
    //@ts-ignore
    ref.current!.click();
  };
  return (
    <>
      <img
        // @ts-ignore
        src={ref.current?.value ? ref.current?.value : src}
        alt={alt}
        className="h-full w-full object-cover rounded-lg"
        onClick={onImageClick}
      />
      {editable ? (
        <input
          type="file"
          placeholder="trip image"
          accept="image/*"
          style={{ visibility: "hidden" }}
          //@ts-ignore
          ref={ref}
        />
      ) : null}
    </>
  );
};

export default Image;
