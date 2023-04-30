import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAuthUserData } from '@/entities/User';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { ProfileRating } from '@/features/profileRating';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
  const { className } = props;

  const { id } = useParams<{ id: string }>();

  const userData = useSelector(getAuthUserData);

  if (!id) {
    return null;
  }

  return (
    <Page data-testid={'ProfilePage'} className={className}>
      <VStack max gap="16">
        {userData?.id !== id ? <ProfileRating profileId={id} /> : null}
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
