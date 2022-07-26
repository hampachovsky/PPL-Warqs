import loader from 'assets/preloader.svg';
import React from 'react';
import style from './Preloader.module.css';

export const Preloader = () => {
  return (
    <div className={style.preLoaderContainer}>
      <img className={style.preLoader} src={loader} alt='' /> :
    </div>
  );
};
