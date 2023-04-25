import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetProfileRatingArg {
  userId: string;
  profileId: string;
}

interface RateProfileRatingArg {
  userId: string;
  profileId: string;
  rate: number;
}

interface NotificationsProfileArg {
  userId: string;
  title: string;
  description: string;
  date: string;
  profileId: string;
  href?: string;
  isRead?: boolean;
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRating: build.query<Rating[], GetProfileRatingArg>({
      query: ({ profileId, userId }) => ({
        url: 'profile-ratings',
        params: {
          profileId,
          userId,
        },
      }),
    }),

    rateProfile: build.mutation<void, RateProfileRatingArg>({
      query: (args) => ({
        url: 'profile-ratings',
        method: 'POST',
        body: args,
      }),
    }),

    notificationsProfile: build.mutation<void, NotificationsProfileArg>({
      query: (args) => ({
        url: 'notifications',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
export const useNotificationsProfile =
  profileRatingApi.useNotificationsProfileMutation;
