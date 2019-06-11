import React from 'react';
import PropTypes from 'prop-types';

import calculator from '../../images/calculator.svg';
import weather from '../../images/weather.svg';
import smallTalk from '../../images/small-talk.svg';
import music from '../../images/music.svg';
import currency from '../../images/currency.svg';

const logosDir = {
  calculator,
  'small-talk': smallTalk,
  weather,
  music,
  currency,
};

function CategoriesLogos(props) {
  const { logo, ...rest } = props;

  return logo ? <img {...rest} src={logosDir[logo]} /> : null;
}

CategoriesLogos.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default CategoriesLogos;
