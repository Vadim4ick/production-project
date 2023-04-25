import { Notification } from '../../../entities/Notification/model/types/notification';

import { rtkApi } from '@/shared/api/rtkApi';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], { profileId: string }>({
      query: (props) => ({
        url: '/notifications',

        params: {
          profileId: props.profileId,
          isRead: false,
          _sort: 'date',
          _order: 'desc',
        },
      }),
    }),

    updateNotification: build.mutation<void, Notification>({
      query: ({ id, ...rest }) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
        body: { ...rest, isRead: true },
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
export const useUpdateNotification =
  notificationApi.useUpdateNotificationMutation;
