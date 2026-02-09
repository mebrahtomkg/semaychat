import Logo from '@/components/Logo';
import { Dot, DotsContainer, SplashScreenStyled } from './styles';

const SplashScreen = () => {
  const delays = [0, 150, 300];

  return (
    <SplashScreenStyled
      role="status"
      aria-live="polite"
      aria-label="Loading application"
    >
      <div>
        <Logo />

        <DotsContainer>
          {delays.map((delay) => (
            <Dot key={delay} $delay={delay} />
          ))}
        </DotsContainer>
      </div>
    </SplashScreenStyled>
  );
};

export default SplashScreen;
