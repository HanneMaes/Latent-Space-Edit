// GM documentation: https://aheckmann.github.io/gm/docs.html

// SETTINGS
const borderSizePercentage = 0.7; 

const inputFolderPath = 'images/';
const outputFolderPath = 'output/';

//***********************************************************************************************************************************

const gm = require('gm').subClass({ imageMagick: true });
const Vibrant = require('node-vibrant');
const fs = require('fs');
const path = require('path');

//***********************************
// Get the list of image files in the input folder

fs.readdir(inputFolderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // Loop through each image file
  files.forEach((file) => {
    if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg')) {

      // Get dominant color
      Vibrant.from(path.join(inputFolderPath, file)).getPalette((err, palette) => {
        if (err) {
          console.error(err);
          return;
        }

        // Loop through the palettes
        const palettes = ['DarkMuted', 'LightMuted', 'Vibrant', 'DarkVibrant', 'LightVibrant'];
        palettes.forEach((paletteName) => {

          // image edit settings
          const outputImageName = file.replace(/\.[^/.]+$/, "") + '-' + paletteName + '.jpg';
          const chosenColor = palette[paletteName].getHex();

          // edit image
          processImage(file, outputImageName, chosenColor);

        });
      });
    };
  });
});

//***********************************
// Function to process each image

const processImage = (inputFileName, outputFileName, chosenColor) => {
  console.log('-', outputFileName);

  const imagePath = path.join(inputFolderPath, inputFileName);
  const outputImagePath = path.join(outputFolderPath, outputFileName);

  gm(imagePath)
    .size((err, size) => {
      if (err) {
        console.error(err);
        return;
      }
      const smallerDimension = Math.min(size.width, size.height);
      const borderWidth = Math.round((borderSizePercentage / 100) * smallerDimension);

      gm(imagePath)
        .borderColor(chosenColor)
        .border(borderWidth, borderWidth)
        .write(outputImagePath, (err) => {
          if (err) console.error(err);
        });
    });
};




// const processImage = (imageFileName, chosenColor) => {

//   // get images in folder
//   const imagePath = path.join(inputFolderPath, imageFileName);
//   const outputImageName = imageFileName.replace(/\.[^/.]+$/, "") + '-X.jpg';
//   const outputImagePath = path.join(outputFolderPath, outputImageName);

//   // get dominant color
//   Vibrant.from(imagePath).getPalette((err, palette) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     const colorMuted = palette.Muted.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
//     const colorDarkMuted = palette.DarkMuted.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
//     const colorLightMuted = palette.LightMuted.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
//     const colorVibrant = palette.Vibrant.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
//     const colorDarkVibrant = palette.DarkVibrant.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
//     const colorLightVibrant = palette.LightVibrant.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
//     console.log('  - color Muted:', colorMuted);
//     console.log('  - color DarkMuted:', colorDarkMuted);
//     console.log('  - color LightMuted:', colorLightMuted);
//     console.log('  - color VibrantColor:', colorVibrant);
//     console.log('  - color DarkVibrant:', colorDarkVibrant);
//     console.log('  - color LightVibrant:', colorLightVibrant);

//     const chosenColor = colorMuted;
//     console.log('Dominant color:', colorDarkMuted);

//     gm(imagePath)
      
//       // calculate border width as a percentage of the smaller of the width of height
//       .size((err, size) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         const smallerDimension = Math.min(size.width, size.height);
//         const borderWidth = Math.round((borderSizePercentage / 100) * smallerDimension);

//         // create border
//         gm(imagePath)
//           .borderColor(chosenColor)
//           .border(borderWidth, borderWidth)

//           // write out image
//           .write(outputImagePath, (err) => {
//             if (err) console.error(err);
//             else console.log('Finished');
//           }); // .write
//       }); // .size
//   }); // Vibrant
// } // processIMage