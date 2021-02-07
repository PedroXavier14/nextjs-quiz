import React from 'react';
import Lottie from 'react-lottie';
import Widget from '../Widget';
import animationData from './loading-data.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={defaultOptions} />;
};

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Loading...
    </Widget.Header>
    <Widget.Content>
      <Loading />
    </Widget.Content>
  </Widget>
);

export default LoadingWidget;
