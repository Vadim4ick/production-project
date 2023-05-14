import { useEffect, useState } from 'react';

import { Avatar } from '@/shared/ui/deprecated/Avatar';

export interface ValidateProfileAvatarProps {
  className?: string;
  avatar?: string;
}

function validateProfileAvatar(avatar: string, signal: AbortSignal) {
  const controller = new AbortController();
  signal.addEventListener('abort', () => {
    controller.abort();
  });
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
    img.src = avatar;
  });
}

export const ValidateProfileAvatar: React.FC<ValidateProfileAvatarProps> = (
  props,
) => {
  const { avatar } = props;

  const [isValid, setIsValid] = useState(false);
  const errorAvatar =
    'https://www.omgtb.com/wp-content/uploads/2021/04/620_NC4xNjE-scaled.jpg';

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const checkAvatar = async () => {
      if (avatar) {
        try {
          await validateProfileAvatar(avatar, signal);
          setIsValid(true);
        } catch (error) {
          setIsValid(false);
        }
      }
    };

    checkAvatar();

    return () => {
      controller.abort();
    };
  }, [avatar]);

  return isValid ? <Avatar src={avatar} /> : <Avatar src={errorAvatar} />;
};
