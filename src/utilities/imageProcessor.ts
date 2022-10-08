import sharp from "sharp";

const imageResizer = async (data: {
  filename: string,
  width: number,
  height: number
}): Promise<string> => {
  const newPath = `assets/thumb/${data.filename}_thumb.jpg`;
  await sharp(`assets/full/${data.filename}.jpg`)
    .resize(data.width, data.height,{
      fit: "contain",
    })
    .toFile(newPath);
  return newPath;
}

export default imageResizer;