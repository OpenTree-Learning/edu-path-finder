import Link from 'next/link';
import { preloadQuestions } from './form/[...slug]/page';


export default async function Home() {

  preloadQuestions()

  return (
    <div>
      <div>
        <p>Whoever you are, whatever your goals or your level</p>
        <p>We can find your unique path in the tree of knowledges</p>
        <p>And you know what? You can at any time change your way in the tree.</p>
        <p>Who knows maybe your more intersted in a different career?</p>
      </div>
      <div>
        <Link href='/form/experience'>Start your journey!</Link>
      </div>
    </div>
  );
}
