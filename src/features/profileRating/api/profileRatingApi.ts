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
  }),
});

export const useGetProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
