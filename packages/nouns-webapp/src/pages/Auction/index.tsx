import React, { useEffect } from 'react';
import Auction from '../../components/Auction';
// import Documentation from '../../components/Documentation';
import ProfileActivityFeed from '../../components/ProfileActivityFeed';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import { useParams, useNavigate } from 'react-router-dom';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { nounPath } from '../../utils/history';

const AuctionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const initialAuctionId = id ? Number(id) : undefined;
  const onDisplayAuction = useOnDisplayAuction();
  const lastAuctionNounId = useAppSelector(state => state.onDisplayAuction.lastAuctionNounId);
  const onDisplayAuctionNounId = onDisplayAuction?.nounId.toNumber();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastAuctionNounId) return;

    if (initialAuctionId !== undefined) {
      // handle out of bounds noun path ids
      if (initialAuctionId > lastAuctionNounId || initialAuctionId < 0) {
        dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
        navigate(nounPath(lastAuctionNounId));
      } else {
        if (onDisplayAuction === undefined) {
          // handle regular noun path ids on first load
          dispatch(setOnDisplayAuctionNounId(initialAuctionId));
        }
      }
    } else {
      // no noun path id set
      if (lastAuctionNounId) {
        dispatch(setOnDisplayAuctionNounId(lastAuctionNounId));
      }
    }
  }, [lastAuctionNounId, dispatch, initialAuctionId, onDisplayAuction]);

  // const isCoolBackground = useAppSelector(state => state.application.isCoolBackground);
  // const backgroundColor = isCoolBackground ? 'var(--brand-cool-background)' : 'var(--brand-warm-background)';

  return (
    <>
      <Auction auction={onDisplayAuction} />
      {onDisplayAuctionNounId !== undefined && onDisplayAuctionNounId !== lastAuctionNounId ? (
        <ProfileActivityFeed nounId={onDisplayAuctionNounId} />
      ) : (
        <></>
      )}
      {/* <Documentation
        backgroundColor={
          onDisplayAuctionNounId === undefined || onDisplayAuctionNounId === lastAuctionNounId ? backgroundColor : undefined
        }
      /> */}
    </>
  );
};
export default AuctionPage;
