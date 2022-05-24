import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import styles from './SquareNFTCard.module.scss';
import ArrowGrey from './ArrowGrey.svg';
import ArrowPrimary from './ArrowPrimary.svg';

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: false,
  arrows: false,
  centerMode: false,
  appendDots: (dots) => (
    <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />
  ),
};
