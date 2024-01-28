import { CheckCircledIcon, CircleIcon } from '@radix-ui/react-icons';
import { Tally1Icon, Tally2Icon, Tally3Icon } from 'lucide-react';

export const statuses = [
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: Tally1Icon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: Tally2Icon,
  },
  {
    label: 'High',
    value: 'high',
    icon: Tally3Icon,
  },
];
