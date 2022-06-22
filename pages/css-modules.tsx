import type { NextPage } from 'next';
import { useState } from 'react';
import css from '../styles/Component.module.css'

const Home: NextPage = () => {
    return <div className={css.hello}>Hello World! This has been styled using a CSS module</div>;
};

export default Home;
