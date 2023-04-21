import { Notification } from '../model/types/notification';

import { rtkApi } from '@/shared/api/rtkApi';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], { profileId: string }>({
      query: (props) => ({
        url: '/notifications',

        params: {
          profileId: props.profileId,
          _sort: 'date',
          _order: 'desc',
        },
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
