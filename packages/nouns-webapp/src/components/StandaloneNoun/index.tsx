// import { ImageData as data, getNounData } from '@nouns/assets';
import { getNounData } from '../../utils/assets/utils';
import ImageData from '../../utils/assets/image-data.json';
import { buildSVG } from '@nouns/sdk';
import { BigNumber as EthersBN } from 'ethers';
import Image from 'react-bootstrap/Image';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import { INounSeed, useNounSeed } from '../../wrappers/nounToken';
import Noun from '../Noun';
import nounClasses from '../Noun/Noun.module.css';
import classes from './StandaloneNoun.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

interface StandaloneNounProps {
  nounId: EthersBN;
}
interface StandaloneCircularNounProps {
  nounId: EthersBN;
  border?: boolean;
}

interface StandaloneNounWithSeedProps {
  nounId: EthersBN;
  onLoadSeed?: (seed: INounSeed) => void;
  shouldLinkToProfile: boolean;
}

export const getNoun = async (nounId: string | EthersBN, seed: INounSeed) => {
  const id = nounId.toString();
  const name = `NIJI ${id}`;
  const description = `NIJI ${id} is a member of the NIJI`;
  const { parts, background, base64Image } = await getNounData(seed);
  // const image = `data:image/svg+xml;base64,${btoa(buildSVG(parts, data.palette, background))}`;
  const image = `data:image/svg+xml;base64,${btoa(buildSVG(parts, ImageData.palette, background))}`;
  const fullImage = base64Image;
  return {
    name,
    description,
    image,
    fullImage
  };
};

export const StandaloneNounImage: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const [nounData, setNounData] = useState<{ image: string; fullImage: string } | null>(null);
  const [isFullImage, setIsFullImage] = useState(false);

  useEffect(() => {
    const loadNoun = async () => {
      if (seed) {
        const data = await getNoun(nounId, seed);
        setNounData(data);
      }
    };
    loadNoun();
  }, [nounId, seed]);

  return (
    <div style={{ position: "relative" }}>
      {nounData && (
        <button
          onClick={() => setIsFullImage((prev) => !prev)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "white",
            borderRadius: "50%",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease-in-out",
            zIndex: 10, // アイコンが確実に表示されるよう設定
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" color="#ff185a" />
        </button>
      )}

      {/* 画像 */}
      <Image src={isFullImage ? nounData?.fullImage : nounData?.image} alt="CNNoun" fluid />
    </div>
  );
};


const StandaloneNoun: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const [nounData, setNounData] = useState<{ image: string; description: string; fullImage: string } | null>(null);
  const [isFullImage, setIsFullImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadNoun = async () => {
      if (seed) {
        const data = await getNoun(nounId, seed);
        setNounData(data);
      }
    };
    loadNoun();
  }, [nounId, seed]);

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <div style={{ position: "relative" }}>
      {nounData && (
        <button
          onClick={() => setIsFullImage((prev) => !prev)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "white",
            borderRadius: "50%",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease-in-out",
            zIndex: 10, // アイコンが確実に表示されるよう設定
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" color="#ff185a" />
        </button>
      )}

      <Link to={"/noun/" + nounId.toString()} className={classes.clickableNoun} onClick={onClickHandler}>
        <Noun imgPath={isFullImage ? nounData?.fullImage || "" : nounData?.image || ""} alt={nounData?.description || "CNNoun"} />
      </Link>
    </div>
  );
};


export const StandaloneNounCircular: React.FC<StandaloneCircularNounProps> = (props: StandaloneCircularNounProps) => {
  const { nounId, border } = props;
  const seed = useNounSeed(nounId);
  const [nounData, setNounData] = useState<{ image: string; description: string; fullImage: string } | null>(null);
  const [isFullImage, setIsFullImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadNoun = async () => {
      if (seed) {
        const data = await getNoun(nounId, seed);
        setNounData(data);
      }
    };
    loadNoun();
  }, [nounId, seed]);

  if (!seed || !nounId) return <Noun imgPath="" alt="CNNoun" />;

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <div style={{ position: "relative" }}>
      {nounData && (
        <button
          onClick={() => setIsFullImage((prev) => !prev)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "white",
            borderRadius: "50%",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease-in-out",
            zIndex: 10, // アイコンが確実に表示されるよう設定
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" color="#ff185a" />
        </button>
      )}

      <Link to={`/noun/${nounId.toString()}`} className={classes.clickableNoun} onClick={onClickHandler}>
        <Noun
          imgPath={isFullImage ? nounData?.fullImage || "" : nounData?.image || ""}
          alt={nounData?.description || "CNNoun"}
          wrapperClassName={nounClasses.circularNounWrapper}
          className={border ? nounClasses.circleWithBorder : nounClasses.circular}
        />
      </Link>
    </div>
  );
};


export const StandaloneNounRoundedCorners: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const [nounData, setNounData] = useState<{ image: string; description: string; fullImage: string } | null>(null);
  const [isFullImage, setIsFullImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadNoun = async () => {
      if (seed) {
        const data = await getNoun(nounId, seed);
        setNounData(data);
      }
    };
    loadNoun();
  }, [nounId, seed]);

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <div style={{ position: "relative" }}>
      {nounData && (
        <button
          onClick={() => setIsFullImage((prev) => !prev)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "white",
            borderRadius: "50%",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease-in-out",
            zIndex: 10, // アイコンが確実に表示されるよう設定
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" color="#ff185a" />
        </button>
      )}

      <Link to={`/noun/${nounId.toString()}`} className={classes.clickableNoun} onClick={onClickHandler}>
        <Noun
          imgPath={isFullImage ? nounData?.fullImage || "" : nounData?.image || ""}
          alt={nounData?.description || "CNNoun"}
          className={nounClasses.rounded}
        />
      </Link>
    </div>
  );
};


export const StandaloneNounWithSeed: React.FC<StandaloneNounWithSeedProps> = (props: StandaloneNounWithSeedProps) => {
  const { nounId, onLoadSeed } = props;
  const dispatch = useDispatch();
  const seed = useNounSeed(nounId);
  const [nounData, setNounData] = useState<{ image: string; description: string; fullImage: string } | null>(null);
  const [isFullImage, setIsFullImage] = useState(false);
  const [loading, setLoading] = useState(true); // ローディング状態を管理
  const seedIsInvalid = Object.values(seed || {}).every((v) => v === 0);

  useEffect(() => {
    const loadNoun = async () => {
      if (seed && !seedIsInvalid) {
        setLoading(true);
        setNounData(null); // 画像をリセットし、再レンダリングを確実にする
        const data = await getNoun(nounId, seed);
        setNounData(data);
        setLoading(false);
        if (onLoadSeed) onLoadSeed(seed);
      } else {
        setLoading(false);
      }
    };
    loadNoun();
  }, [nounId, seed, seedIsInvalid, onLoadSeed]);

  if (!seed || seedIsInvalid || !nounId) return <Noun imgPath="/placeholder.png" alt="CNNoun" />;

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <div style={{ position: "relative" }}>
      {nounData && (
        <button
          onClick={() => setIsFullImage((prev) => !prev)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "white",
            borderRadius: "50%",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s ease-in-out",
            zIndex: 10, // アイコンが確実に表示されるよう設定
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FontAwesomeIcon icon={faSyncAlt} size="lg" color="#ff185a" />
        </button>
      )}

      <Link
        to={`/noun/${nounId?.toString() || ""}`}
        className={classes.clickableNoun}
        onClick={onClickHandler}
      >
        <Noun imgPath={loading ? "/placeholder.png" : nounData ? (isFullImage ? nounData.fullImage : nounData.image) : "/placeholder.png"} alt={nounData?.description || "CNNoun"} />
      </Link>
    </div>
  );
};


export default StandaloneNoun;
