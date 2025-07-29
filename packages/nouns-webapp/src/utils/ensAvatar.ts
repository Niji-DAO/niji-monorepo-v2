import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';

export const useEnsAvatarLookup = (address: string) => {
  const provider = usePublicClient();
  const [ensAvatar, setEnsAvatar] = useState<string>();

  useEffect(() => {
    let mounted = true;
    if (address && provider) {
      provider
        .getEnsName({ address: address as `0x${string}` })
        .then(name => {
          if (!name) return;
          provider.getEnsAvatar({ name })
            .then(avatar => {
              if (mounted) {
                setEnsAvatar(avatar || undefined);
              }
            })
            .catch(error => {
              console.log(`error resolving ens avatar: `, error);
            });
        })
        .catch(error => {
          console.log(`error resolving reverse ens lookup: `, error);
        });
    }

    return () => {
      setEnsAvatar(undefined);
      mounted = false;
    };
  }, [address, provider]);

  return ensAvatar;
};
