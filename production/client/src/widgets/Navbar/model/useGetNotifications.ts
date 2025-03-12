import { useGetUserFriendRequestsCountQuery, useGetUserFriendsCountQuery } from "@/shared/api/graphql/generated";
import { userSlice } from "@/entities/User/model/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { notificationsSlice } from "@/widgets/Navbar/model/notifications.slice";

export const useGetUserNotifications = () => {
  const user = useSelector(userSlice.selectors.user)
  const dispatch = useDispatch();

  useGetUserFriendRequestsCountQuery({
    userId: user?.id ?? 0
  }, {
    enabled: !!user?.id,
    onSuccess: (data) => {
      dispatch(notificationsSlice.actions.setUserRequests(data.userFriendRequestsQuantity))
    }
  });
}