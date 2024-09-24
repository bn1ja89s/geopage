import { Image } from '@profabric/react-components';

export const Loading = () => {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <Image
        className="animation__shake"
        src="/img/acroming.png"
        alt="Acroming"
        height={80}
        width={80}
      />
      <h4 className="animation__shake">Acroming Ecuador</h4>
    </div>
  );
};
