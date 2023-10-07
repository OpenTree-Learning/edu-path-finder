import { preloadQuestions } from './form/[...slug]/page';



export default async function Home() {

  preloadQuestions()

  return (
    <div>
      <div>
        <span className='p'>Whoever you are, whatever your goals or your level</span>
        <span className='p'>We can find your unique path in the tree of knowledges</span>
        <span className='p'>And you know what? You can at any time change your way in the tree.</span>
        <span className='p'>Who knows maybe your more intersted in a different career?</span>
      </div>
      <div>
        <button className='btn-default'>
          <a href='/form/experience'>Start your journey!</a>
        </button>
      </div>
    </div>
  );
}
