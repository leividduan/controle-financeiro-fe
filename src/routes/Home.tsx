import Title from '../components/Title';
import getCurrentUser from '../utils/getUser';

function Home() {
  const user = getCurrentUser();

  return (
    <>
      <Title>
        Boas vindas, {user?.name}.
      </Title>
    </>
  );
}
 
export default Home;