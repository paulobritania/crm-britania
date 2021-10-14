import firaCodeBold from './assets/fonts/FiraCode/FiraCode-Bold.ttf'
import firaCodeLight from './assets/fonts/FiraCode/FiraCode-Light.ttf'
import firaCodeMedium from './assets/fonts/FiraCode/FiraCode-Medium.ttf'
import firaCodeRegular from './assets/fonts/FiraCode/FiraCode-Regular.ttf'
import mavenProBlack from './assets/fonts/MavenPro/MavenPro-Black.ttf'
import mavenProBold from './assets/fonts/MavenPro/MavenPro-Bold.ttf'
import mavenProMedium from './assets/fonts/MavenPro/MavenPro-Medium.ttf'
import mavenProRegular from './assets/fonts/MavenPro/MavenPro-Regular.ttf'
import mavenProSemiBold from './assets/fonts/MavenPro/MavenPro-SemiBold.ttf'
import openSansBold from './assets/fonts/OpenSans/OpenSans-Bold.ttf'
import openSansExtraBold from './assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'
import openSansLight from './assets/fonts/OpenSans/OpenSans-Light.ttf'
import openSansMedium from './assets/fonts/OpenSans/OpenSans-Medium.ttf'
import openSansRegular from './assets/fonts/OpenSans/OpenSans-Regular.ttf'
import openSansSemiBold from './assets/fonts/OpenSans/OpenSans-SemiBold.ttf'
import poppinsBold from './assets/fonts/Poppins/Poppins-Bold.ttf'
import poppinsLight from './assets/fonts/Poppins/Poppins-Light.ttf'
import poppinsMedium from './assets/fonts/Poppins/Poppins-Medium.ttf'
import poppinsRegular from './assets/fonts/Poppins/Poppins-Regular.ttf'
import poppinsSemiBold from './assets/fonts/Poppins/Poppins-SemiBold.ttf'
import poppinsThin from './assets/fonts/Poppins/Poppins-Thin.ttf'

const fontWeight = {
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  black: '900'
}

const fontSize = {
  SSS: 10,
  SS: 13,
  SSB: 12,
  S: 14,
  M: 16,
  L: 18,
  XL: 20,
  XLS: 22,
  XXL: 24,
  XXXL: 30,
  XXXXL: 36,
  XXXXXL: 50,
  IconXXL: 64
}

const fontFaceMavenPro = [
  {
    fontFamily: 'Maven Pro',
    src: `url("${mavenProMedium}") format("truetype")`,
    fontWeight: fontWeight.medium
  },
  {
    fontFamily: 'Maven Pro',
    src: `url("${mavenProRegular}") format("truetype")`,
    fontWeight: fontWeight.regular
  },
  {
    fontFamily: 'Maven Pro',
    src: `url("${mavenProSemiBold}") format("truetype")`,
    fontWeight: fontWeight.semiBold
  },
  {
    fontFamily: 'Maven Pro',
    src: `url("${mavenProBold}") format("truetype")`,
    fontWeight: fontWeight.bold
  },
  {
    fontFamily: 'Maven Pro',
    src: `url("${mavenProBlack}") format("truetype")`,
    fontWeight: fontWeight.black
  }
]

const fontFacePoppins = [
  {
    fontFamily: 'Poppins',
    src: `url("${poppinsThin}") format("truetype")`,
    fontWeight: fontWeight.thin
  },
  {
    fontFamily: 'Poppins',
    src: `url("${poppinsLight}") format("truetype")`,
    fontWeight: fontWeight.light
  },
  {
    fontFamily: 'Poppins',
    src: `url("${poppinsMedium}") format("truetype")`,
    fontWeight: fontWeight.medium
  },
  {
    fontFamily: 'Poppins',
    src: `url("${poppinsRegular}") format("truetype")`,
    fontWeight: fontWeight.regular
  },
  {
    fontFamily: 'Poppins',
    src: `url("${poppinsSemiBold}") format("truetype")`,
    fontWeight: fontWeight.semiBold
  },
  {
    fontFamily: 'Poppins',
    src: `url("${poppinsBold}") format("truetype")`,
    fontWeight: fontWeight.bold
  }
]

const fontFaceOpen = [
  {
    fontFamily: 'Open Sans',
    src: `url("${openSansBold}") format("truetype")`,
    fontWeight: fontWeight.bold
  },
  {
    fontFamily: 'Open Sans',
    src: `url("${openSansExtraBold}") format("truetype")`,
    fontWeight: fontWeight.extraBold
  },
  {
    fontFamily: 'Open Sans',
    src: `url("${openSansLight}") format("truetype")`,
    fontWeight: fontWeight.light
  },
  {
    fontFamily: 'Open Sans',
    src: `url("${openSansMedium}") format("truetype")`,
    fontWeight: fontWeight.medium
  },
  {
    fontFamily: 'Open Sans',
    src: `url("${openSansRegular}") format("truetype")`,
    fontWeight: fontWeight.regular
  },
  {
    fontFamily: 'Open Sans',
    src: `url("${openSansSemiBold}") format("truetype")`,
    fontWeight: fontWeight.semiBold
  }
]

const fontFaceMonospace = [
  {
    fontFamily: 'Fira Code',
    src: `url("${firaCodeLight}") format("truetype")`,
    fontWeight: fontWeight.light
  },
  {
    fontFamily: 'Fira Code',
    src: `url("${firaCodeRegular}") format("truetype")`,
    fontWeight: fontWeight.regular
  },
  {
    fontFamily: 'Fira Code',
    src: `url("${firaCodeMedium}") format("truetype")`,
    fontWeight: fontWeight.medium
  },
  {
    fontFamily: 'Fira Code',
    src: `url("${firaCodeBold}") format("truetype")`,
    fontWeight: fontWeight.bold
  }
]

const fontFamily = [
  "'Maven Pro'",
  "'Poppins'",
  'sans-serif',
  'Arial',
  'Open Sans'
].join(',')

const fontFamilyMonospace = ["'Fira Code'"].join(',')

export default {
  fontFaceMavenPro,
  fontFacePoppins,
  fontFaceMonospace,
  fontFamily,
  fontFamilyMonospace,
  fontFaceOpen,
  fontWeight,
  fontSize
}
