"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { downloadImage, getImagesByUsername } from "@/services/civitService";
import Image from "next/image";

export default function Home() {
  const [civitImages, setCivitImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchImagesFromCivit = () => {
    if (currentPage === 0) {
      setCurrentPage(1);
    }

    // here we put the name of the user for wich we want to fetch the images
    getImagesByUsername("JustMaier", currentPage).then((images) => {
      if (images) {
        setCivitImages(images);
      }
    });
  };

  const handleDownload = async (imageId, imageUrl) => {
    await downloadImage(imageId, imageUrl);
  };

  useEffect(() => {
    if (currentPage >= 1) fetchImagesFromCivit();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <main className={styles.main}>
      {civitImages.data &&
        civitImages.data.map((image, index) => {
          return (
            <div key={index} className={styles.grid}>
              <Image
                src={image.url}
                width={200}
                height={300}
                alt="civit ai image"
                onClick={() => console.log(image.meta)}
              />
              <button onClick={() => handleDownload(image.id, image.url)}>
                Download Image
              </button>
            </div>
          );
        })}
      <button onClick={() => fetchImagesFromCivit()}>show images</button>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={nextPage}>Next Page</button>
    </main>
  );
}
