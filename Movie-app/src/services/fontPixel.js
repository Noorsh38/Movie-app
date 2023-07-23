import { Dimensions, PixelRatio } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const storageKey = {}

export const loaderStyles = {
    CircleFlip: 'CircleFlip',
    Bounce: 'Bounce',
    Wave: 'Wave',
    WanderingCubes: 'WanderingCubes',
    Pulse: 'Pulse',
    ChasingDots: 'ChasingDots',
    ThreeBounce: 'ThreeBounce',
    Circle: 'Circle',
    CubeGrid: '9CubeGrid',
    WordPress: 'WordPress',
    FadingCircle: 'FadingCircle',
    FadingCircleAlt: 'FadingCircleAlt',
    Arc: 'Arc',
}

export { WINDOW_HEIGHT, WINDOW_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH }

const widthBaseScale = SCREEN_WIDTH / SCREEN_WIDTH
const heightBaseScale = SCREEN_HEIGHT / 812

function normalize(size, based = 'width') {
    const newSize = size * widthBaseScale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}
const widthPixel = (size) => {
    return normalize(size, 'width')
}

const fontPixel = (size)  => {
    return widthPixel(size)
};

export default fontPixel



