// 马赛克处理

function toMosaic(imageData, width) {
  const rows = imageData.height;
  const cols = imageData.width;
  const data = imageData.data;

  const afterRowsCount = Math.ceil(rows / width);
  const afterColsCount = Math.ceil(cols / width);

  for (let row = 0; row < afterRowsCount; row++) {
    for (let col = 0; col < afterColsCount; col++) {

      let RSum = 0,
        GSum = 0,
        BSum = 0,
        ASum = 0,
        pxCount = 0;
      for(let i = 0; i < width; i++) {
        for(let j = 0; j < width; j++) {
          // 处理溢出
          if ( (row * width + i) > rows ||  (col * width + j) > cols ) return;
          // 实际第几个像素点
          const realIndex = (row * width + i) * cols + (col * width + j);
          RSum += data[4 * realIndex];
          GSum += data[4 * realIndex + 1];
          BSum += data[4 * realIndex + 2];
          ASum += data[4 * realIndex + 3];

          ++pxCount;
        }
      }

      for(let i = 0; i < width; i++) {
        for(let j = 0; j < width; j++) {
          // 处理溢出
          if ( (row * width + i) > rows ||  (col * width + j) > cols ) return;
          // 实际第几个像素点
          const realIndex = (row * width + i) * cols + (col * width + j);
          data[4 * realIndex] = RSum / pxCount;
          data[4 * realIndex + 1] = GSum / pxCount;
          data[4 * realIndex + 2] = BSum / pxCount;
          data[4 * realIndex + 3] = ASum / pxCount;
        }
      }
    }
  }
}

export default toMosaic;