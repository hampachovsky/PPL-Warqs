import { BadgeProps, TagProps } from 'antd';
import { eventType } from 'models/Event';

export const eventTypeBadgeColor = (evType: eventType): BadgeProps['status'] => {
  return evType === eventType.important ? 'error' : evType === eventType.minor ? 'processing' : eventType.warning;
};

export const eventTypeTagColor = (evType: eventType): TagProps['color'] => {
  return evType === eventType.important ? 'error' : evType === eventType.minor ? 'processing' : eventType.warning;
};
