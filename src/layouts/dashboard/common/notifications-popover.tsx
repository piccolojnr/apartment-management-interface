import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

import { fToNow } from "../../../utils/format-time";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import { NotificationProps } from "../../../types/user";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [totalUnRead, setTotalUnRead] = useState(0);

  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = async () => {
    try {
      const updated = await Promise.all(
        notifications.map(async (x) => {
          if (x.is_unread) return x;
          return { ...x, is_unread: false };
        })
      );

      setNotifications(updated);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const updateUnreadCount = () => {
      const unRead: number = notifications.filter((x) => x.is_unread).length;
      setTotalUnRead(unRead);
    };
    updateUnreadCount();
  }, [notifications]);

  return (
    <>
      <IconButton color={open ? "primary" : "default"} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({
  notification,
}: {
  notification: NotificationProps;
}) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.is_unread && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.created_at)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: any) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === "INFO") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_info.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "WARNING") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_warning.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "MESSAGE") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "MAIL") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }

  return {
    avatar: notification.avatar ? (
      <img alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  };
}
