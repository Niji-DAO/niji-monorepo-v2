import { useNounSeed } from '../../wrappers/nounToken';
import { BigNumber } from 'ethers';
import { getNoun } from '../StandaloneNoun';
import { LoadingNoun } from '../Noun';
import { useState, useEffect } from 'react';

interface TightStackedCircleNounProps {
  nounId: number;
  index: number;
  square: number;
  shift: number;
}

const TightStackedCircleNoun: React.FC<TightStackedCircleNounProps> = props => {
  const { nounId, index, square, shift } = props;
  const seed = useNounSeed(BigNumber.from(nounId));
  const [nounData, setNounData] = useState<{ image: string } | null>(null);

  useEffect(() => {
    const loadNoun = async () => {
      if (seed) {
        const data = await getNoun(BigNumber.from(nounId), seed);
        setNounData(data);
      }
    };
    loadNoun();
  }, [nounId, seed]);

  if (!seed || !nounData) {
    return <LoadingNoun />;
  }

  return (
    <g key={index}>
      <clipPath id={`clipCircleNoun${nounId}`}>
        <circle
          id={`${nounId}`}
          r="20"
          cx={28 + index * shift}
          cy={square - 21 - index * shift}
          style={{
            fill: 'none',
            stroke: 'white',
            strokeWidth: '2',
          }}
        />
      </clipPath>

      <use xlinkHref={`#${nounId}`} />
      <image
        clipPath={`url(#clipCircleNoun${nounId})`}
        x={8 + index * shift}
        y={14 - index * shift}
        width="40"
        height="40"
        href={nounData.image}
      ></image>
    </g>
  );
};

export default TightStackedCircleNoun;
