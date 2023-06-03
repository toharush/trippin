import "./MissingPlaceImage.css";

interface MissingPlaceImageProps {
  label: string;
}
const MissingPlaceImage = ({ label }: MissingPlaceImageProps) => {
  return (
    <>
      <span>{label}</span>
      {/* <img src="https://th.bing.com/th/id/R.834f3d6c79ed25ec29f2ec604d38f783?rik=Ar1WBnkIUL7bEQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-rHcF0BCMcjk%2fTyVG7Lx1PII%2fAAAAAAAAK8I%2frLY36CEAeWk%2fs1600%2fPARIS_PLACE_VENDOME_NAPOLEON_COLUMN.JPG&ehk=h8oWvyfiTMGD%2fVimrQ9crc0i7zfx%2fBe8FA%2bFV8fIlFw%3d&risl=&pid=ImgRaw&r=0" /> */}
    </>
  );
};

export default MissingPlaceImage;
