import { preloadQuestions } from './form/[...slug]/page';

import styles from './page.module.scss';
import Particles from '../lib/components/particles/particles';



export default async function Home() {

  preloadQuestions()

  return (
    <>
      <div className={styles.header}>
        {/*<div className={styles.background}></div>*/}
        <Particles />
        <div className={styles.logo}>
          <img src='static/images/logo.svg'/>
        </div>
        <div className={styles.text}>
          <span className='h3'>
            I want to <span id={styles.learnProgramming}>learn programming</span>, 
            but <span id={styles.whereToStart}>where to start?</span>
          </span>
          <span className='h4'>
            We find your <span id={styles.learningPath}>unique learning path </span>
            to IT career.
          </span>
          <div>
            <button className='btn-default'>
              <img src='static/images/search_icon.svg'/>
              <a href='/form/experience'>Find my training path</a>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.steps}>
      </div>
    </>
  );
}
