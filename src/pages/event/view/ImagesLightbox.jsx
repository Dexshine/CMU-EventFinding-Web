import { ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

export default function ImagesLightbox({ images }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <>
      <ImageList
        variant="quilted"
        cols={images.length > 3 ? 3 : images.length}
        rowHeight={200}
      >
        {images.map((image, index) => {
          return (
            <ImageListItem
              key={index}
              rows={index === 0 ? 2 : 1}
              cols={index === 0 ? 2 : 1}
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleOpen(index)}
              />
            </ImageListItem>
          );
        })}
      </ImageList>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((image) => ({
          src: image,
        }))}
        index={currentIndex}
      />
    </>
  );
}
