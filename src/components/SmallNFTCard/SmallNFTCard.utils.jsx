import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';

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
    <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={20} />
  ),
};
