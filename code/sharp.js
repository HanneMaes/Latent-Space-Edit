// GM documentation: https://aheckmann.github.io/gm/docs.html

// SETTINGS
const borderSizePercentage = 0.5; 

const imagePath = 'images/img.png';
const outputImagePath = 'output/output-GM.jpg';

//***********************************************************************************************************************************

const gm = require('gm').subClass({ imageMagick: true });
const Vibrant = require('node-vibrant');

// get dominant color
Vibrant.from(imagePath).getPalette((err, palette) => {
  if (err) {
    console.error(err);
    return;
  }
  const colorMuted = palette.Muted.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
  const colorDarkMuted = palette.DarkMuted.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
  const colorLightMuted = palette.LightMuted.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
  const colorVibrant = palette.Vibrant.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
  const colorDarkVibrant = palette.DarkVibrant.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
  const colorLightVibrant = palette.LightVibrant.getHex(); // COLOR OPTIONS: Muted, DarkMuted, LightMuted, Vibrant, DarkVibrant, and LightVibrant
  console.log('  - color Muted:', colorMuted);
  console.log('  - color DarkMuted:', colorDarkMuted);
  console.log('  - color LightMuted:', colorLightMuted);
  console.log('  - color VibrantColor:', colorVibrant);
  console.log('  - color DarkVibrant:', colorDarkVibrant);
  console.log('  - color LightVibrant:', colorLightVibrant);

  const chosenColor = colorMuted;
  console.log('Dominant color:', colorDarkMuted);

  gm(imagePath)
    
    // calculate border width as a percentage of the smaller of the width of height
    .size((err, size) => {
      if (err) {
        console.error(err);
        return;
      }
      const smallerDimension = Math.min(size.width, size.height);
      const borderWidth = Math.round((borderSizePercentage / 100) * smallerDimension);

      // create border
      gm(imagePath)
        .borderColor(chosenColor)
        .border(borderWidth, borderWidth)

        // write out image
        .write(outputImagePath, (err) => {
          if (err) console.error(err);
          else console.log('Finished');
        }); // .write
    }); // .size
  }); // Vibrant

  // ROUNDED CORNER, NOT WORKING
  // gm(imagePath)
//   .out('-background', 'none')
//   .out('-virtual-pixel', 'transparent')
//   .out('-distort', 'Arc', cornerRadius)
//   .write(outputImagePath, function(err) {
//     if (err) console.error(err);
//     else console.log('Image with rounded corners created successfully.');
//   });