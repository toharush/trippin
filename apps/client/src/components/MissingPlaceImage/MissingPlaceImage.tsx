import "./MissingPlaceImage.css";

interface MissingPlaceImageProps {
  label: string;
}
const MissingPlaceImage = ({ label }: MissingPlaceImageProps) => {
  return (
    <>
      <span>{label}</span>
    </>
  );
};

export default MissingPlaceImage;
